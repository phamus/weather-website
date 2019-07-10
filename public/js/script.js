console.log('Server is loading the js successfully')



const weatherForm = document.querySelector('form');
const inputValue = document.querySelector('input');
const headLocation = document.querySelector('.location')
const searchError = document.querySelector('.search-error');
const weatherFocast = document.querySelector('.news')
weatherForm.addEventListener('submit',(e)=>{
   headLocation.textContent='Loading...';
   weatherFocast.textContent = '';
    e.preventDefault();
    const location=inputValue.value
    fetch('/weather?address=' +location).then((response)=>{
    response.json().then((data)=>{
        if(data.err){
            searchError.textContent=data.err;
            headLocation.textContent='';
        }else{
            headLocation.textContent= data.location;
            weatherFocast.textContent = data.forcast;
        };
    });
});
})