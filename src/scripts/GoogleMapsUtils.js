import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../config.json"

async function getCurrentLocation() {
    if (!navigator || !navigator.geolocation) {
        /* no geolocation support (browser), handle error */
        throw new Error('Cannot get location from browser, no geolocation support detected.')
    }
        
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
    })

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const result = await getReverseGeocodeLatLng(latitude, longitude)
    return {
        placeID: result.data.results[0].place_id,
        address: result.data.results[0].formatted_address,
        latitude: result.data.results[0].geometry.location.lat, 
        longitude: result.data.results[0].geometry.location.lng
    }
}

async function getReverseGeocodeLatLng(latitude, longitude) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json'
    let params = {
        latlng: `${latitude},${longitude}`,
        key: GOOGLE_MAPS_API_KEY
    }
    return getGoogleAPIResponse(url, params)
}

async function getReverseGeocodeAddress(address) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json'
    let params = {
        address: address,
        key: GOOGLE_MAPS_API_KEY
    }
    return getGoogleAPIResponse(url, params)
}

async function getFirstAutoComplete(input) {
    let response = await getAutoComplete(input)
    let predictions = response.data.predictions
    if (!Array.isArray(predictions) || predictions.length < 1) {
        /* throw error, no autocomplete results */
        throw new Error('Cannot find any matching locations.')
    }
    let placeDetails = await getPlaceDetails(predictions[0].place_id)
    return {
        placeID: placeDetails.data.result.placeID,
        address: placeDetails.data.result.formatted_address,
        latitude: placeDetails.data.result.geometry.location.lat,
        longitude: placeDetails.data.result.geometry.location.lng
    }
}

async function getAutoComplete(input) {
    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
    let params = {
        input: input,
        key: GOOGLE_MAPS_API_KEY
    }
    return await getGoogleAPIResponse(url, params)
}

async function getPlaceDetails(placeID) {
    let url = 'https://maps.googleapis.com/maps/api/place/details/json'
    let params = {
        place_id: placeID,
        key: GOOGLE_MAPS_API_KEY
    }
    return await getGoogleAPIResponse(url, params)
}

async function getDateTime(latitude, longitude) {
    let timestamp = Date.now() / 1000
    let timeZoneData = await getTimeZone(latitude, longitude, timestamp)
    return {
        timeZoneID: timeZoneData.data.timeZoneId,
        timeZoneName: timeZoneData.data.timeZoneName,
        localTimestamp: (timestamp + timeZoneData.data.dstOffset + timeZoneData.data.rawOffset) * 1000
    }
}

async function getTimeZone(latitude, longitude, timestamp) {
    let url = 'https://maps.googleapis.com/maps/api/timezone/json'
    let params = {
        location: `${latitude},${longitude}`,
        timestamp: timestamp,
        key: GOOGLE_MAPS_API_KEY
    }
    
    return await getGoogleAPIResponse(url, params)
}
           
      
async function getGoogleAPIResponse(url, params, timeout=3000) {
    return await axios.get(url, { timeout: timeout, params: params })
}

function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error);
    }
}

export { 
    getCurrentLocation, 
    getReverseGeocodeLatLng, 
    getReverseGeocodeAddress,
    getFirstAutoComplete, 
    getAutoComplete, 
    getPlaceDetails,
    getDateTime,
    getTimeZone,
    getGoogleAPIResponse,
    handleError
}