const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2lhbnRqZWFrcyIsImEiOiJjazhiOWkyazEwM29vM2xxZWdwZXcxajNiIn0.hS8t6f7KpC3ACw04fy5v6w&limit=1'
    
    request({ url, json: true }, (error,{ body }) => {
        if(error){
            callback('Unable to connect to services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode