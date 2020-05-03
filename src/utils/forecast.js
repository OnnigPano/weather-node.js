const request = require('request');

const forecast = (lon, lat, callback) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f61dfd3effce635c64595e9e3c9b419a`
    request({ url: openWeatherUrl, json : true }, (error, response) => {
        if(error){
            callback('Error de conexión', undefined)
        } else if(response.body.error) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined, {
                weather: response.body.weather[0].main,
                temperature: response.body.main.temp,
                feels_like: response.body.main.feels_like,
                location: response.body.name
            })
        }
    })
}

module.exports = forecast