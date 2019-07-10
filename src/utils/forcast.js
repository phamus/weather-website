const request = require('request')

const forcast=(latitude,logtitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/76028391bafa973421ed98035b2c4568/'+ latitude+','+logtitude;

    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to web services', undefined)
        }else if(body.error){
            callback('invalid location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forcast;
