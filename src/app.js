const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()
//nodemon src/app.js -e js,hbs ------- para q nodemon reinicie servidor con esas extensiones y los hbs sean cargados

const port = process.env.PORT || 3000

//seteamos hbs como motor de vista
app.set('view engine', 'hbs')
//hace que /public sea el directorio raiz de la app
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
//seteamos a express para que use templates como direccion en vez de views
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
//seteamos a hanlebars para que sepa la ubicacion de los templates partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Onnig Panossian"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must add address property'
    })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})        
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send( {
                temperature: forecastData.temperature,
                weather: forecastData.weather,
                feels_like: forecastData.feels_like,
                location: forecastData.location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Onnig Panossian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!',
        name: 'Onnig Panossian',
        message: 'Example of help message.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Onnig Panossian',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Onnig Panossian',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log("Servidor en marcha desde el puerto" + port)
})