import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { getDateTime, handleError } from "../scripts/GoogleMapsUtils";

export const useLocationsStore = defineStore("locations", () => {

    /** 
     * A Map where the key is a place ID from the google maps
     * database (representing a location) and the value is an 
     * object containg location data for the location specified 
     * by the place ID. Wrapped in a proxy by reactive() from Vue.
     * 
     * @type {Map<String, LoactionData>}
     * 
     * @typedef {Object} LoactionData
     * @property {String} placeID
     * @property {String} address
     * @property {Position} position
     * @property {TimeData} timeData
     * 
     * @typedef {Object} Position
     * @property {Number} lat
     * @property {Number} lng
     * 
     * @typedef {Object} TimeData
     * @property {String} timeZoneID
     * @property {String} timeZoneName
     * @property {Number} localTimestamp
     */
    const locations = reactive(new Map())

    /* for testing purposes, manually adds 101 entries to locations map. to use: replace locations assignment above
    let data = []
    for (let i = 0; i < 101; i++) {
        data[i] = [`test_placeID_${i}`, {
            placeID: `test_placeID_${i}`,
            address: `test_address_${i}`,
            position: {
                lat: 0,
                lng: 0
            },
            timeData: {
                timeZoneID: `test_timeZoneID_${i}`,
                timeZoneName: `test_timeZoneName_${i}`,
                localTimestamp: 0,
            }
        }]
    }
    let testingMap = new Map(data)
    const locations = reactive(testingMap) */

    const mostRecentLocation = computed(() => {
        let array = Array.from(locations.values())
        if (array.length < 1) {
            /* no locations in map */
            return null
        }

        return array[array.length - 1]
    })

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

    function removeLocation(placeID) {
        locations.delete(placeID)
    }

    function getLocations() {
        return locations
    }

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