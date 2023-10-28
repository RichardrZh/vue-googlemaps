<script setup>
import { ref, reactive, computed } from 'vue'
import { useLocationsStore } from '../stores/locations.js'
import { getCurrentLocation } from '../scripts/GoogleMapsUtils.js'
const store = useLocationsStore()

function setPlace(place) {
    if (!place.geometry || !place.formatted_address || !place.place_id) {
        /* invalid (or not a specific) place (ie. not a place object) */
        /* place.name */
        /* use autocomplete api to get 1st result */
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

    /* console.log(place) */
    console.log(data)

    store.addLocation(data.placeID, data.address, data.position.lat, data.position.lng)
    
    console.log(store.getMostRecentLocation())
}

/* helper */
function getInputText() {
    return document.getElementById('searchbox-input').value.trim()
}

function handleInputSubmit() {
    let text = getInputText()


    /* we want to: 
        get the current location? from autocomplete api, 

        add it to store, 
        fill the input field with the location's actual address
        navigate to the location on the map (update center?)
    */
}



function handleGetCurrentLocation() {
    /* getCurrentLocation() */


    /* we want to: 
        get the current location, 
        add it to store, 
        fill the input field with the location's address
        navigate to the location on the map (update center?)
    */
}

</script>

<template>

    <form action="" class="relative inline-block"> 
        <!-- <input id="searchbox-input" type="search" placeholder="Search Locations" aria-description="search results will appear below"> -->
        <!-- setplace is called on dropdown click or enter keypress -->
        <GMapAutocomplete
            id="searchbox-input"
            placeholder="Search Locations"
            @place_changed="setPlace"
            @keyup.enter.native="handleInputSubmit">
        </GMapAutocomplete>

        <!-- add search button/curr loc button here -->
        <button @click.prevent="handleInputSubmit">search</button>
        <button @click.prevent="handleGetCurrentLocation">current location</button>

    </form>

</template>


<style scoped>
form {
  margin-left: 32px;
}

#searchbox-input {
  outline: none;
  border-radius: 1rem;
  text-indent: 1rem;
  width: 20em;
  /* todo: make responsove by adding min/max width */
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
