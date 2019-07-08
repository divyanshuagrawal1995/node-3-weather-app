const path=require('path')
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Divyanshu Agrawal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Divyanshu Agrawal'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is a help Section',
        name:'Divyanshu Agrawal'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
           error:'Please Provide an address'
       })
    }else{
        geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            forecast(latitude,longtitude,(error,forecastData)=>{
                if(error)
                {
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    forecast:forecastData,
                    address:req.query.address,
                    location:location
            
                })
            })

        })
    }
    
   
      
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
         return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
      products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Help article not found',
        name:'Divyanshu Agrawal'

    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Page not found',
        name:'Divyanshu Agrawal'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
