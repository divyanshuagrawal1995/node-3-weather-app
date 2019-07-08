const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGl2eWFuc2h1MTIzIiwiYSI6ImNqeG5hd3YxdDAwcXAzY3BnNG81OHEwZHEifQ.etYp6kWEcI0Zg0CJnAM5Nw&limit=1';
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
        callback('unable to connect location service',undefined)
        }else if(body.features.length===0){
            callback('unable to find location Try another Search',undefined)
    
        }else{
          callback(undefined,{
              latitude:body.features[0].center[1],
              longtitude:body.features[0].center[0],
              location:body.features[0].place_name
          })
        }
    })
    }
    module.exports=geocode
       
    