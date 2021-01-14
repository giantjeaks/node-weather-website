const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setuo handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Alang Sri'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Alang Sri'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Example message',
        name:'Alang Sri'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide an address!'
        })
    }

    var address = req.query.address;

    geocode(address,(error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude,longtitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
    
        })
    })

    
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        errMessage: "Help article not found",
        name:'Alang Sri'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:"404",
        errMessage: "Page not found",
        name:'Alang Sri'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
