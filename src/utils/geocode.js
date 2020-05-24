const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFubW95MTQzIiwiYSI6ImNrYTZldGlvYjA2N3YycnFwdno5ZHc3Z28ifQ.Ry2rs2hyuubRu-gf49Ortg&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('cannot conncet to Location service', undefined)
        } else if (body.features.length === 0) {

            callback('No places found, change your search term and search again', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode