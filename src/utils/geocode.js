const request = require('request');


const geocode = (address, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib25uaWciLCJhIjoiY2s5bmg3NmN4MDJjaTNnbzcyeXVndGRtZyJ9.cVJXg9O-rvrbVr0Blfj80Q`

    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback("Error de conexión.", undefined)
        } else if (response.body.features.length === 0) {
            callback("Error. No se ha encontrado coincidencia", undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location:  response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode