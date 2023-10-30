<script setup>
import { ref, reactive, computed } from 'vue'
import { useLocationsStore } from '../stores/locations.js'
import { getCurrentLocation, getReverseGeocodeAddress, handleError } from '../scripts/GoogleMapsUtils.js'
const store = useLocationsStore()

function setPlace(place) {
    if (!place.geometry || !place.formatted_address || !place.place_id) {
        /* invalid (or not a specific) place (ie. not a place object) */
        /* place.name */ 
        /* use autocomplete api to get 1st result */
        handleInputSubmit()
        return
    }
    
    const data = {
        placeID: place.place_id,
        address: place.formatted_address,
        position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        }
    }

    store.addLocation(data.placeID, data.address, data.position.lat, data.position.lng)

}

/* helper */
/* function getInputText() {
    return document.getElementById('searchbox-input').value.trim()
} */

/* 
we want to: 
        get the current location? from autocomplete api, 

        add it to store, 
        fill the input field with the location's actual address
        navigate to the location on the map (update center?)
*/
function handleInputSubmit() {
    /* workaround */
    /* we manually get the 1st autocomplete dropdown text and call geolocation api */

    /* get 1st place name from autocomplete dropdown */
    let pacContainer = document.querySelectorAll(".pac-container .pac-item")[0]

    let itemQuery = pacContainer?.children[1]
    let itemRest = pacContainer?.children[2]
    let text = `${itemQuery?.textContent} ${itemRest?.textContent}`.replace(' ', '%20')
    getReverseGeocodeAddress(text).then(
        (result) => { 
            if (!Array.isArray(result.data.results) || result.data.results.length < 1) {
                handleError("No valid search results found.")
                return
            }
            store.addLocation(
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
    
    
    /* this below does not work due to places api being server side, there is a coors issue */
    /* 
    let inputText = getInputText()
    getFirstAutoComplete(inputText).then(
        (result) => { 
            store.addLocation(
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



function handleGetCurrentLocation() {
    getCurrentLocation().then(
        (result) => { 
            store.addLocation(
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
        <!-- <input id="searchbox-input" type="search" placeholder="Search Locations" aria-description="search results will appear below"> -->
        <!-- setplace is called on dropdown click or enter keypress -->
        <GMapAutocomplete
            id="searchbox-input"
            placeholder="Search Locations"
            @place_changed="setPlace">
        </GMapAutocomplete>
        <!-- add search button/curr loc button here -->
        <button class="search-button" @click.prevent="setPlace" title="Search Locations">
            <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        
        <button class="location-button" @click.prevent="handleGetCurrentLocation" title="Get Current Location">
            <font-awesome-icon :icon="['fas', 'map-location-dot']" style="color: #fd0006"/>
        </button>

    </div>

        

</template>


<style scoped>
.search-button, .location-button {
    position: absolute;
    bottom: auto;
    left: auto;
    border: 0;
    padding: 0;
    background-color: white;
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

button {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border: 1px solid green;
}

</style>
