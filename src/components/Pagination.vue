<script setup>
import { ref, computed, watch } from 'vue'

import { useLocationsStore } from '../stores/locations.js'
import { getFormattedTime} from '../scripts/DateTimeUtils.js'


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

const store = useLocationsStore()

/** 
 * The current page number.
 * @type {Ref<Number>}
 */
const page = ref(1)

/** 
 * The number of locations per page.
 * @type {Ref<Number>}
 */
const locationsPerPage = ref(10)

/** 
 * The collection of all locations.
 * Is equal to the reversed locations store values array.
 * @type {Ref<Array.<LocationData>>}
 */
const pageLocations = computed(() => {
    let array = Array.from(store.getLocations().values())
    if (array.length < 1) {
        return []
    }

    let reversedArray = array.toReversed()
    let mostRecentLocation = reversedArray[0]
    if (deletePageChecked.value) {
        selectedLocations.value.push(mostRecentLocation.placeID)
    }

    return reversedArray
})

/** 
 * The collection of all selected locations. 
 * Locations are stored by their place ids in string form.
 * @type {Ref<String>}
 */
const selectedLocations = ref([])

/** 
 * Represents the state of the 'select all on page' checkbox.
 * When true, all locations on the page should be checked.
 * @type {Ref<Boolean>}
 */
const deletePageChecked = ref(false)

/* Watches the deletePageChecked checkbox value.
 * When checked, check all locations on the current page.
 * When unchecked, uncheck all locations on the current page.
 */
watch(deletePageChecked, (value, previousValue) => {
    let startingIndex = (page.value - 1) * locationsPerPage.value
    let endingIndex = Math.min(startingIndex + locationsPerPage.value, pageLocations.value.length)

    if (value) {
        /* check all locations on page ie. add them to selected locations */
        for(let i = startingIndex; i < endingIndex; i++) {
            let placeID = pageLocations.value[startingIndex + i].placeID
            if (!selectedLocations.value.includes(placeID)) {
                selectedLocations.value.push(placeID)
            }
        }
    } else if (previousValue) {
        /* uncheck all locations on page */
        for(let i = startingIndex; i < endingIndex; i++) {
            let placeID = pageLocations.value[startingIndex + i].placeID

            let index = selectedLocations.value.indexOf(placeID)
            if (index > -1) {
                /* remove location */
                selectedLocations.value.splice(index, 1)
            }
        }
    }
})

/**
 * Removes all selected locations.
 */
 function deleteSelectedLocations() {
    /* remove from location store */
    selectedLocations.value.forEach(placeID => {
        store.removeLocation(placeID)
    })

    /* remove from locations selected list */
    selectedLocations.value = []

    /* uncheck select all delete button */
    deletePageChecked.value = false
}

/**
 * Returns whether or not a location should be visibly rendered.
 * @param {Number} index - The index of the location in the pageLocations list.
 * @returns {Boolean} Returns true if the location is visible, or false otherwise.
 */
function isTableRowActive(index) {
    let startingIndex = (page.value - 1) * locationsPerPage.value
    return (startingIndex <= index) && (index < (startingIndex + locationsPerPage.value))
}

/**
 * Returns whether or not a page should be visibly rendered.
 * @param {Number} pageNumber - The page number.
 * @returns {Boolean} Returns true if the page is visible, or false otherwise.
 */
 function isPageActive(pageNumber) {
    let index = pageNumber - 1
    if (pageLocations.value.length == 0) {
        return index == 0
    }

    return index >= 0 && index * locationsPerPage.value + 1 <= pageLocations.value.length
}

/**
 * Gets a formatted string representing the local date.
 * @param {Number} localTimestamp - The local time in seconds since midnight, January 1, 1970.
 * @returns {String} The local date as a formatted string.
 */
function getDate(localTimestamp) {
    return new Date(localTimestamp).toDateString()
}

/**
 * Gets a formatted string representing the local time.
 * @param {Number} localTimestamp - The local time in seconds since midnight, January 1, 1970.
 * @returns {String} The local time as a formatted string, eg: '3:45 pm'.
 */
function getTime(localTimestamp) { 
    return getFormattedTime(localTimestamp)
}
</script>


<template>
    <div class="table-wrapper">

        <div class="tw-relative tableheader-wrapper">

            <h2>Searched Locations:</h2>

            <button @click="deleteSelectedLocations" type="button" title="Delete Selected Locations">
                <font-awesome-icon :icon="['fas', 'trash']" style="color: #fd0006;" />
            </button>

        </div>
        
        <table class="table" aria-label="Searched locations table">

            <thead>
                <tr>
                    <th><input type="checkbox" v-model="deletePageChecked" /></th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(locationData, index) in pageLocations">
                    <!-- we use v-show instead of v-if for better performance as there is no large location list -->
                    <td v-show="isTableRowActive(index)">
                        <input type="checkbox" :value="locationData.placeID" v-model="selectedLocations" />
                    </td>
                    <td v-show="isTableRowActive(index)">
                        {{ locationData.address }}
                    </td>
                    <td v-show="isTableRowActive(index)">
                        {{ getDate(locationData.timeData.localTimestamp) }}
                    </td>
                    <td v-show="isTableRowActive(index)">
                        {{ getTime(locationData.timeData.localTimestamp) }}
                    </td>
                </tr>
            </tbody>
            
        </table> 
    </div>

    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">

            <li class="page-item">
                <button title="First Page" aria-label="First page" type="button" class="page-link" @click="page = 1">
                    &lt;&lt; <!--  << -->
                </button> 
            </li>

            <li v-show="isPageActive(page - 3)" class="page-item" aria-current="page">
                <span v-if="isPageActive(page - 4)" type="button" class="page-link" >
                    ...
                </span>
                <button v-else type="button" :aria-label="`Page ${page - 3}`" class="page-link" @click="page = page - 3">
                    {{ page - 3 }} 
                </button>
            </li>

            <li v-show="isPageActive(page - 2)" class="page-item">
                <button type="button" :aria-label="`Page ${page - 2}`" class="page-link" @click="page = page - 2">
                    {{ page - 2 }}
                </button>
            </li>

            <li v-show="isPageActive(page - 1)" class="page-item">
                <button type="button" :aria-label="`Page ${page - 1}`" class="page-link" @click="page = page - 1">
                    {{ page - 1 }}
                </button>
            </li>

            <li v-show="isPageActive(page)" class="page-item">
                <button type="button" :aria-label="`Page ${page}`" class="page-link active">
                    {{ page }} 
                </button>
            </li>

            <li v-show="isPageActive(page + 1)" class="page-item">
                <button type="button" :aria-label="`Page ${page + 1}`" class="page-link" @click="page = page + 1">
                    {{ page + 1 }} 
                </button>
            </li>

            <li v-show="isPageActive(page + 2)" class="page-item">
                <button type="button" :aria-label="`Page ${page + 2}`" class="page-link" @click="page = page + 2">
                    {{ page + 2 }} 
                </button>
            </li>

            <li v-show="isPageActive(page + 3)" class="page-item">
                <span v-if="isPageActive(page + 4)" type="button" class="page-link">
                    ...
                </span>
                <button v-else type="button" :aria-label="`Page ${page + 3}`" class="page-link" @click="page = page + 3">
                    {{ page + 3 }} 
                </button>
            </li>

            <li class="page-item">
                <button title="Last Page" aria-label="Last page" class="page-link" @click="page = Math.round(pageLocations.length / locationsPerPage + 0.49)">
                    &gt;&gt; <!-- >> -->
                </button> 
            </li>

        </ul>
    </nav>
</template>


<style scoped>
.table-wrapper {
    overflow: auto;
    max-height: 50vh;
}

.table-wrapper table {
    margin: 0;
}

table th {
  font-size: medium;
  font-weight: 600;
}

nav {
    margin-top: 4px;
}

.tableheader-wrapper h2 {
  text-align: center;
  font-weight: bold;
  font-size: larger;

  background-color: white;

  margin-bottom: 0;
  margin-bottom: 0;
  padding: 4px 0;
}

.tableheader-wrapper button {
  display: block;
  height: 40px;
  width: 40px;

  position: absolute;
  top: 0;
  left: 0;
  
  border: 0;
  padding: 0;

  transform: translateX(-5px);
  background-color: transparent;
}
</style>
