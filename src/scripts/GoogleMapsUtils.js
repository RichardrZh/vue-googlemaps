import {
    getTimeZone,
    getAutoComplete, 
    getPlaceDetails,
    getReverseGeocodeLatLng, 
} from './GoogleMapsApi.js'

/** 
 * @typedef {Object} GeoLocationData 
 * @property {String} placeID - The place id of a location (as specified by the google maps database). 
 * @property {String} address - The address of a location.
 * @property {Number} latitude - The latitude of a location.
 * @property {Number} longitude - The longitude of a location.
*/

/** 
 * @typedef {Object} TimeData
 * @property {String} timeZoneID - The ID of the time zone (as specified by the CLDR project). 
 * @property {String} timeZoneName - The long form name of the time zone.
 * @property {Number} localTimestamp - The local time in seconds since midnight, January 1, 1970.
*/

/**
 * Gets the currrent location of the user.
 * @async
 * @throws Will throw an error if the user browser does not support geolocation.
 * @returns {GeoLocationData} Returns an object containing geolocation data.
 */
async function getCurrentLocation() {
    /* if browser does not have geolocation support, throw error */
    if (!navigator || !navigator.geolocation) {
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

/**
 * Gets geolocation place api data from the first google place autocomplete api result.
 * @async
 * @throws Will throw an error if the input query has no matching autocomplete results.
 * @param {String} input - An input query string.
 * @returns {GeoLocationData} Returns an object containing geolocation data.
 */
async function getFirstAutoComplete(input) {
    let response = await getAutoComplete(input)
    let predictions = response.data.predictions

    /* if predictions array is empty/null/undefined, throw error */
    if (!Array.isArray(predictions) || predictions.length < 1) {
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

/**
 * Gets datetime data from the timezone google maps API.
 * @async
 * @param {Number} latitude - The latitude of a location.
 * @param {Number} longitude - The longitude of a location.
 * @returns {TimeData} Returns an object containing time data.
 */
async function getDateTime(latitude, longitude) {
    let timestamp = Date.now() / 1000

    let timeZoneData = await getTimeZone(latitude, longitude, timestamp)

    return {
        timeZoneID: timeZoneData.data.timeZoneId,
        timeZoneName: timeZoneData.data.timeZoneName,
        localTimestamp: (timestamp + timeZoneData.data.dstOffset + timeZoneData.data.rawOffset) * 1000
    }
}

export { 
    getCurrentLocation, 
    getFirstAutoComplete, 
    getDateTime,
}