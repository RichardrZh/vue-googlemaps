<script setup>
import { ref, reactive, computed, watch, getCurrentInstance } from 'vue'
import { useLocationsStore } from '../stores/locations.js'
import { getFormattedTime} from '../scripts/DateTimeUtils.js'

const store = useLocationsStore()

const deletePageChecked = ref(false)

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
                /* remove elem */
                selectedLocations.value.splice(index, 1)
            }
        }
    }
})

const locationsPerPage = ref(10)

/* page numbers start from 0 */
const page = ref(1)

const selectedLocations = ref([])

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

function isTableRowActive(index) {
    let startingIndex = (page.value - 1) * locationsPerPage.value
    return (startingIndex <= index) && (index < (startingIndex + locationsPerPage.value))
}

function getDate(localTimestamp) {
    return new Date(localTimestamp).toDateString()
}

function getTime(localTimestamp) { 
    return getFormattedTime(localTimestamp)
}


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

function isPaginationIconActive(pageNumber) {
    let index = pageNumber - 1
    if (pageLocations.value.length == 0) {
        return index == 0
    }

    return index >= 0 && index * locationsPerPage.value + 1 <= pageLocations.value.length
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
        
        <table class="table">
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
    

    <nav class="" aria-label="...">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <button title="First Page" type="button" class="page-link" @click="page = 1">
                    &lt;&lt; <!--  << -->
                </button> 
            </li>
            <li v-show="isPaginationIconActive(page - 3)" class="page-item" aria-current="page">
                <span v-if="isPaginationIconActive(page - 4)" type="button" class="page-link" >
                    ...
                </span>
                <button v-else type="button" class="page-link" @click="page = page - 3">
                    {{ page - 3 }} 
                </button>
            </li>
            <li v-show="isPaginationIconActive(page - 2)" class="page-item">
                <button type="button" class="page-link" @click="page = page - 2">
                    {{ page - 2 }}
                </button>
            </li>
            <li v-show="isPaginationIconActive(page - 1)" class="page-item">
                <button type="button" class="page-link" @click="page = page - 1">
                    {{ page - 1 }}
                </button>
            </li>
            <li v-show="isPaginationIconActive(page)" class="page-item">
                <button type="button" class="page-link active">
                    {{ page }} 
                </button>
            </li>
            <li v-show="isPaginationIconActive(page + 1)" class="page-item">
                <button type="button" class="page-link" @click="page = page + 1">
                    {{ page + 1 }} 
                </button>
            </li>
            <li v-show="isPaginationIconActive(page + 2)" class="page-item">
                <button type="button" class="page-link" @click="page = page + 2">
                    {{ page + 2 }} 
                </button>
            </li>
            <li v-show="isPaginationIconActive(page + 3)" class="page-item">
                <span v-if="isPaginationIconActive(page + 4)" type="button" class="page-link">
                    ...
                </span>
                <button v-else type="button" class="page-link" @click="page = page + 3">
                    {{ page + 3 }} 
                </button>
            </li>
            <li class="page-item">
                <button title="Last Page" class="page-link" @click="page = Math.round(pageLocations.length / locationsPerPage + 0.49)">
                    &gt;&gt; <!-- >> -->
                </button> 
            </li>
        </ul>
    </nav>


</template>

<style scoped>
.tableheader-wrapper h2 {
  text-align: center;
  background-color: white;
  margin-bottom: 0;
  font-weight: bold;
  font-size: larger;
  margin-bottom: 0;
  padding: 4px 0;
}
.tableheader-wrapper button {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 40px;
  width: 40px;
  border: 0;
  padding: 0;
  transform: translateX(-5px);
  background-color: transparent;
}

.table-wrapper {
    overflow: auto;
    max-height: 50vh;
}

.table-wrapper table {
    margin: 0;
}

nav {
    margin-top: 4px;
}

table th {
  font-size: medium;
  font-weight: 600;
}


</style>
