<script setup>
import { useLocationsStore } from '../stores/locations.js'

import { handleError } from '../scripts/ErrorsUtils.js'
import { getCurrentLocation } from '../scripts/GoogleMapsUtils.js'
import { getReverseGeocodeAddress } from '../scripts/GoogleMapsApi.js'


const locationsStore = useLocationsStore()

/**
 * Handles a search request on dropdown menu click or (dropdown select + enter keypress). 
 * On success: adds current location to locations store. 
 */
function setPlace(place) {
    if (!place.geometry || !place.formatted_address || !place.place_id) {
        /* invalid place (not a valid place object)
         * may have property place.name
         */
        handleInputSubmit()
        return
    }

    locationsStore.addLocation(
        place.place_id, 
        place.formatted_address, 
        place.geometry.location.lat(), 
        place.geometry.location.lng()
    )

}

/**
 * Handles a search request on enter key press or search button click. 
 * On success: adds current location to locations store. 
 */
function handleInputSubmit() {
    /* ###### WORKAROUND ######
     * We manually get the 1st autocomplete dropdown text (from vue-google-maps 
     * map component) and call geolocation api.
     * This is needed to solve enter key press and search button click functionality
     * as vue-google-maps does not expose its autocomplete functionality
     */

    /* get 1st place name from autocomplete dropdown */
    let pacContainer = document.querySelectorAll('.pac-container .pac-item')[0]

    let itemQuery = pacContainer?.children[1]
    let itemRest = pacContainer?.children[2]
    let text = `${itemQuery?.textContent} ${itemRest?.textContent}`.replace(' ', '%20')

    getReverseGeocodeAddress(text).then(
        (result) => { 
            if (!Array.isArray(result.data.results) || result.data.results.length < 1) {
                handleError('No valid search results found.')
                return
            }
            locationsStore.addLocation(
                result.data.results[0].place_id, 
                result.data.results[0].formatted_address, 
                result.data.results[0].geometry.location.lat, 
                result.data.results[0].geometry.location.lng
            )
        },
        (error) => { 
            handleError(error)
        }
    )
    
    
    /* this code below does not work due to places api being server side, there is a coors issue */
    /* 
    let inputText = document.getElementById('searchbox-input').value.trim()
    getFirstAutoComplete(inputText).then(
        (result) => { 
            locationsStore.addLocation(
                result.placeID, 
                result.address, 
                result.latitude, 
                result.longitude
            )
        },
        (error) => { 
            handleError(error)
        }
    ) */
}


/**
 * Handles a get current location request. 
 * On success: adds current location to locations store. 
 */
function handleGetCurrentLocation() {
    getCurrentLocation().then(
        (result) => { 
            locationsStore.addLocation(
                result.placeID, 
                result.address, 
                result.latitude, 
                result.longitude
            )
        },
        (error) => { 
            handleError(error)
        }
    )
}

</script>


<template>
    <!-- We do not use form to prevent form submit event firing causing duplicate api requests -->
    <div class="tw-relative tw-inline-block"> 
        
        <!-- setplace is called on dropdown click or enter keypress -->
        <GMapAutocomplete
            id="searchbox-input" 
            type="text" 
            placeholder="Search Locations" 

            aria-label="Seachbar" 
            aria-description="Search results will appear below" 
            aria-placeholder="Search Locations" 

            @place_changed="setPlace">
        </GMapAutocomplete>

        <button 
            class="search-button" 
            type="button" 
            title="Search Location" 

            aria-label="Search Button" 
            
            @click.prevent="setPlace">
            <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        
        <button 
            class="location-button" 
            type="button" 
            title="Get Current Location" 

            aria-label="Get Current Location" 
            
            @click.prevent="handleGetCurrentLocation">
            <font-awesome-icon :icon="['fas', 'map-location-dot']" style="color: #fd0006"/>
        </button>

    </div>
</template>


<style scoped>
.search-button, .location-button {
    display: inline-block;
    overflow: hidden;
    background-color: white;

    position: absolute;
    bottom: auto;
    left: auto;

    padding: 0;
    border: 0;
    border-radius: 50%;
}

.search-button {
    top: 3px;
    right: 6px;

    width: 1.5em;
    height: 1.5em;
}

.location-button {
    top: 0;
    right: 0;
    
    width: 2em;
    height: 2em;
    transform: translatex(3em);
}

#searchbox-input {
  outline: none;
  border-radius: 1rem;
  
  text-indent: 1rem;

  width: 20em;
  max-width: 50vw;
}
</style>
