
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a7843bdd1954c2bc3de46d2bcbfd5bed&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'The forecast for the day is ' + body.current.weather_descriptions[0] + '. current temp is ' + body.current.temperature + ' but feels like '
            + body.current.feelslike + ' chance of rain is ' + body.current.precip + '%. ' + 'Humidity is ' + body.current.humidity + ' %. ')
        }
    })
}

module.exports = forecast