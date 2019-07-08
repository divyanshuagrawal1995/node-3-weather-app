const request =require('request')
const forecast=(latitude,longtitude,callback)=>{
    const url='https://api.darksky.net/forecast/d2fef13739f5334743b657bdb8bcf3a9/'+latitude+','+longtitude+'?units=si';
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect weather services',undefined)

        }else if(body.error)
        {
            callback('unable to find location',undefined)
        }else{
            callback(undefined,`${body.daily.data[0].summary}It is currently ${body.currently.temperature} degree out. There is a ${body.currently.precipProbability}% chance of rain.`)
            
        }
    })

}
module.exports=forecast
