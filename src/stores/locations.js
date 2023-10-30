import { computed, reactive } from 'vue'

import { defineStore } from 'pinia'

import { handleError } from '../scripts/ErrorsUtils.js'
import { getDateTime } from '../scripts/GoogleMapsUtils'

export const useLocationsStore = defineStore('locations', () => {

    /**
     * @typedef {Object} LocationData
     * @property {String} placeID - The place id of a location (as specified by the google maps database). 
     * @property {String} address - The address of a location.
     * @property {Position} position - The position coordinates of a location .
     * @property {TimeData} timeData - Time data of a location.
     */

    /**
     * @typedef {Object} Position
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
     * Represents a collection of locations. A Map<placeID, LocationData> where the key is a place ID from the google maps
     * database and the value is an object containg location data.
     * @private
     * @type {Map<String, LocationData>}
     */
    const locations = reactive(new Map())

    /* For testing purposes; manually adds 101 entries to locations map. 
     * How to use: set debug to true.
     */
    const debug = false
    if (debug) {
        let data = []

        /* adds key/value pairs to the list */
        for (let i = 0; i < 101; i++) {
            data[i] = [`test_placeID_${i}`, {
                placeID: `test_placeID_${i}`,
                address: `test_address_${i}`,
                position: {
                    lat: i,
                    lng: i
                },
                timeData: {
                    timeZoneID: `test_timeZoneID_${i}`,
                    timeZoneName: `test_timeZoneName_${i}`,
                    localTimestamp: i * 1000,
                }
            }]
        }

        locations = new Map(data)
    }
    
    /**
     * Gets the current locations map.
     * @returns {Map<String, LocationData>} Returns an object containing geolocation data.
     */
    function getLocations() {
        return locations
    }

    /**
     * Removes a location from the current locations map.
     * @param {String} placeID - The place id of a location (as specified by the google maps database).
     * @returns {Boolean} Returns true if an element in the Map existed and has been removed, or false if the element did not exist.
     */
    function removeLocation(placeID) {
        locations.delete(placeID)
    }

    /**
     * Adds a location to the current locations map.
     * @param {String} placeID - The place id of a location (as specified by the google maps database).
     * @property {String} address - The address of a location.
     * @property {Number} latitude - The latitude of a location.
     * @property {Number} longitude - The longitude of a location.
     * @returns {Boolean} Returns true if an element in the Map existed and has been removed, or false if the element did not exist.
     */
    function addLocation(placeID, address, latitude, longitude) {
        getDateTime(latitude, longitude).then(
            (result) => { 
                const locationsData = {
                    placeID: placeID,
                    address: address,
                    position: {
                        lat: latitude,
                        lng: longitude
                    },
                    timeData: {
                        timeZoneID: result.timeZoneID,
                        timeZoneName: result.timeZoneName,
                        localTimestamp: result.localTimestamp,
                    }
                }
                locations.set(placeID, locationsData)
            },
            (error) => { 
                handleError(error)
            }
        ) 
    }

    /** 
     * Represents the most recently seached location.
     * @private
     * @type {LocationData}
     */
    const mostRecentLocation = computed(() => {
        let array = Array.from(locations.values())
        if (array.length < 1) {
            /* no locations in map */
            return null
        }

        return array[array.length - 1]
    })

    /**
     * Gets the most recently searched location.
     * @returns {LocationData} Returns the location data of the most recently searched location.
     */
    function getMostRecentLocation () {
        if (mostRecentLocation) {
            return mostRecentLocation.value
        }
        return null
    }

    return {
        getLocations,
        getMostRecentLocation,
        addLocation,
        removeLocation
    }
})