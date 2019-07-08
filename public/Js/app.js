const loader=document.querySelector('.loader')
const weatherForm =document.querySelector('form')
const search=document.querySelector('input')
const forecast=document.querySelector('.message-1')
const error=document.querySelector('.message-2')
const spinner=document.querySelector('.lds-dual-ring')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
      forecast.textContent='loading!!!'
      error.textContent=''
      spinner.style.visibility='visible'
     fetch(`http://localhost:3000/weather?address=${location}`)
.then((response)=>{
    response.json()
    .then((data)=>{
        if(data.error)
        {
          error.textContent=data.error
          spinner.style.visibility='hidden'

        }else{
            
            forecast.textContent=data.location
            error.textContent=data.forecast
            spinner.style.visibility='hidden'

           
        }
    
    })
})

})