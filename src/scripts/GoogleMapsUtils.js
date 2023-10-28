import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../config.json"

function getCurrentLocation() {
    if (!navigator || !navigator.geolocation) {
        /* no geolocation support (browser), handle error */

        return null
    }

    let positionPromiseResult = null
    const positionPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 })
    })
    positionPromise.then(
        (value) => positionPromiseResult = value,
        (error) => { 
            /* handle error, result will be undefined */
        }
    )

    if (!positionPromiseResult) {
        return null
    }

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const address = getAddress(latitude, longitude)

    if (!address) {
        return null
    }

    return {
        address: address,
        latitude: latitude, 
        longitude: longitude        
    }
}

function getAddress(latitude, longitude) {
    let result = null
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        timeout: 3000,
        params: {
            latlng: `${latitude},${longitude}`,
            key: GOOGLE_MAPS_API_KEY
        }
    }).then(function (response) {
        result = response.data.results[0].formatted_address
    }).catch(function (error) {
        /* handle error, result will be undefined */
    })

    return result
}

function getFirstAutoComplete(input) {
    let predictions = getAutoComplete(input)
    if (!predictions) {
        return null
    }
    
    let location = getPlaceDetails(predictions[0].place_id)
    if (!address) {
        return null
    }

    return location
}

function getAutoComplete(input) {
    let result = null
    axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        timeout: 3000,
        params: {
            input: input,
            key: GOOGLE_MAPS_API_KEY
        }
    }).then(function (response) {
        result = response.data.predictions
    }).catch(function (error) {
        /* handle error, result will be undefined */
    })

    return result
}

function getPlaceDetails(placeID) {
    let result = null
    axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        timeout: 3000,
        params: {
            place_id: placeID,
            key: GOOGLE_MAPS_API_KEY
        }
    }).then(function (response) {
        result = {
            address: response.data.result.formatted_address,
            latitude: response.data.result.geometry.location.lat,
            longitude: response.data.result.geometry.location.lng
        }
    }).catch(function (error) {
        /* handle error, result will be undefined */
    })

    return result
}

function getDateTime(latitude, longitude, callback) {
    let timestamp = Date.now() / 1000

    axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
        timeout: 3000,
        params: {
            location: `${latitude},${longitude}`,
            timestamp: timestamp,
            key: GOOGLE_MAPS_API_KEY
        }
    }).then(function (response) {
        callback({
            timeZoneID: response.data.timeZoneId,
            timeZoneName: response.data.timeZoneName,
            localTimestamp: (timestamp + response.data.dstOffset + response.data.rawOffset) * 1000
        })
    }).catch(function (error) {
        /* handle error, result will be undefined */
        console.log(error)
    })

}

export { 
    getCurrentLocation, 
    getAddress, 
    getFirstAutoComplete, 
    getAutoComplete, 
    getPlaceDetails,
    getDateTime 
}