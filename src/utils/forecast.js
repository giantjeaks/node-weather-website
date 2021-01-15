const request = require('request')

const forecast = (lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/c0cb204168263f713c23cfb11fc7a9d6/' + lat + ',' + long +'?lang=en'
    
    request({ url, json: true }, (error,{ body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, body.daily.data[0].summary +'The high today is ' + body.daily.data[0].temperatureHigh 
            + ' with a low of ' + body.daily.data[0].temperatureLow
            + ' It is currently ' + body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability 
            + '% Chance of rain'
        )}
    })
}

module.exports = forecast