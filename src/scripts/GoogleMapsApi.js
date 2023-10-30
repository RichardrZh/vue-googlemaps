import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '../config.json'


/**
 * The default timeout for api requests in milliseconds
 * @constant
 * @default
 * @type {Number}
 */
const DEFAULT_TIMEOUT = 3000

/**
 * Initiates an API request to a google maps API.
 * @async
 * @param {String} url - The url of the api endpoint.
 * @param {Object} params - An object containing the api parameters.
 * @param {Number} [timeout=DEFAULT_TIMEOUT] - Optional: The time in milliseconds before the api request times out.
 * @returns {Promise<AxiosResponse<any, any>>} Returns a Promise representing an Axios API Reponse object.
 */
async function getGoogleAPIResponse(url, params, timeout=DEFAULT_TIMEOUT) {
    return await axios.get(url, { timeout: timeout, params: params })
}


/*###### TIMEZONE API ######*/

/**
 * Initiates an API request to the timezone google maps API.
 * @async
 * @param {Number} latitude - The latitude of a location.
 * @param {Number} longitude - The longitude of a location.
 * @param {Number} timestamp - The desired time in seconds since midnight, January 1, 1970 UTC. 
 * @param {Number} [timeout=DEFAULT_TIMEOUT] - Optional: The time in milliseconds before the api request times out.
 * @returns {Promise<AxiosResponse<any, any>>} Returns a Promise representing an Axios API Reponse object.
 */
async function getTimeZone(latitude, longitude, timestamp, timeout=DEFAULT_TIMEOUT) {
    let url = 'https://maps.googleapis.com/maps/api/timezone/json'
    let params = {
        location: `${latitude},${longitude}`,
        timestamp: timestamp,
        key: GOOGLE_MAPS_API_KEY
    }
    
    return await getGoogleAPIResponse(url, params, timeout)
}

/*###### PLACE API ###### */
/* IMPORTANT: these currently do not work on this application due to a coors issue */

/**
 * Initiates an API request to the place autocomplete google maps API.
 * @async
 * @param {String} input - The input test on which a query is made.
 * @param {Number} [timeout=DEFAULT_TIMEOUT] - Optional: The time in milliseconds before the api request times out.
 * @returns {Promise<AxiosResponse<any, any>>} Returns a Promise representing an Axios API Reponse object.
 */
async function getAutoComplete(input, timeout=DEFAULT_TIMEOUT) {
    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
    let params = {
        input: input,
        key: GOOGLE_MAPS_API_KEY
    }
    return await getGoogleAPIResponse(url, params, timeout)
}

/**
 * Initiates an API request to the place details google maps API.
 * @async
 * @param {Number} placeID - The place id of a location (as specified in the google maps database).
 * @param {Number} [timeout=DEFAULT_TIMEOUT] - Optional: The time in milliseconds before the api request times out.
 * @returns {Promise<AxiosResponse<any, any>>} Returns a Promise representing an Axios API Reponse object.
 */
async function getPlaceDetails(placeID, timeout=DEFAULT_TIMEOUT) {
    let url = 'https://maps.googleapis.com/maps/api/place/details/json'
    let params = {
        place_id: placeID,
        key: GOOGLE_MAPS_API_KEY
    }
    return await getGoogleAPIResponse(url, params, timeout)
}


/*###### GEOCODE API ######*/

/**
 * Initiates an API request to the reverse geocode google maps API, using latitude and longitude.
 * @async
 * @param {Number} latitude - The latitude of a location.
 * @param {Number} longitude - The longitude of a location.
 * @param {Number} [timeout=DEFAULT_TIMEOUT] - Optional: The time in milliseconds before the api request times out.
 * @returns {Promise<AxiosResponse<any, any>>} Returns a Promise representing an Axios API Reponse object.
 */
async function getReverseGeocodeLatLng(latitude, longitude, timeout=DEFAULT_TIMEOUT) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json'
    let params = {
        latlng: `${latitude},${longitude}`,
        key: GOOGLE_MAPS_API_KEY
    }
    return getGoogleAPIResponse(url, params, timeout)
}

/**
 * Initiates an API request to the reverse geocode google maps API, using an address.
 * @async
 * @param {String} address - The address of a location.
 * @param {Number} [timeout=DEFAULT_TIMEOUT] - Optional: The time in milliseconds before the api request times out.
 * @returns {Promise<AxiosResponse<any, any>>} Returns a Promise representing an Axios API Reponse object.
 */
async function getReverseGeocodeAddress(address, timeout=DEFAULT_TIMEOUT) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json'
    let params = {
        address: address,
        key: GOOGLE_MAPS_API_KEY
    }
    return getGoogleAPIResponse(url, params, timeout)
}

export {
    getTimeZone,
    getGoogleAPIResponse,
    getAutoComplete, 
    getPlaceDetails,
    getReverseGeocodeLatLng, 
    getReverseGeocodeAddress,
}