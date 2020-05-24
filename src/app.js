const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//serve handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//static page load from public
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tanmoy Sen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tanmoy Sen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'contact tanmoysen03@gmail.com for help',
        name: 'Tanmoy Sen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })

        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Tanmoy Sen',
        errorMesssage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Tanmoy Sen',
        errorMesssage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
