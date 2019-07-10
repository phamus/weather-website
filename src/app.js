const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const request = require('request');
const geo = require('./utils/geo');
const forcast = require('./utils/forcast');


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Phamus Jose"
    })
})

//get about page

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Phamus Jose"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            err:"Address was not provided"
        })
    }
    geo(req.query.address,(err,{latitude,longtitude, location} = {})=>{
        if(err){
            return res.send({
                err
            })
        }
    
        forcast(latitude,longtitude,(err,data)=>{
            if(err){
               return res.send({
                   err
               });
            }
            res.send({
                forcast:data,
                location,
                address:req.query.address
            })
        })
    })

   
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:"404 error",
        name:"Phamus jose",
        error:"Page not found"
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title:"404 error",
        name:"Phamus Jose",
        error:"Page not found"
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running')
})