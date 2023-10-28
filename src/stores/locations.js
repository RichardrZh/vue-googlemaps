import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { getDateTime } from "../scripts/GoogleMapsUtils";

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
     * @property {Number} timeZoneID
     * @property {Number} timeZoneName
     * @property {Number} localTimestamp
     */
    const locations = reactive(new Map())

    const mostRecentLocation = computed(() => {
        let placeID = locations.keys().next().value
        if (typeof placeID === 'undefined' && locations.keys().next().done) {
            /* no locations in map */
            return null
        }

        let data = locations.get(placeID)
        return data
    })

    function addLocation(placeID, address, latitude, longitude) {
        getDateTime(
            latitude, 
            longitude, 
            ({ timeZoneID, timeZoneName, localTimestamp }) => {
                const locationsData = {
                    placeID: placeID,
                    address: address,
                    position: {
                        lat: latitude,
                        lng: longitude
                    },
                    timeData: {
                        timeZoneID: timeZoneID,
                        timeZoneName: timeZoneName,
                        localTimestamp: localTimestamp,
                    }
                }
                locations.set(placeID, locationsData)
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