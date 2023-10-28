<script setup>
import { ref, reactive, computed } from 'vue'
import { useLocationsStore } from '../stores/locations.js'
import { getDateString } from '../scripts/DateTimeUtils';

const store = useLocationsStore()

/* page numbers start from 0 */
const page = ref(0)
const selectedLocations = reactive([])

const pageLocations = computed(() => {
    return Array.from(store.getLocations().values()).toReversed()
})

function isActive(index) {
    return (page.value <= index) && (index < (page.value + 10))
}

function getTimeString(localTimestamp) {
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    return getDateString(localTimestamp, options)
}

</script>

<template>
<div>
    <table class="table">
        <thead>
            <tr>
                <th><input type="checkbox" id="checkbox" v-model="checked" /></th>
                <th>Location</th>
                <th>Date</th>
                <th>Coordinates</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(locationData, index) in pageLocations">
                <td v-show="isActive(index)">
                    <input type="checkbox" value="locationData.placeID" v-model="selectedLocations" />
                </td>
                <td v-show="isActive(index)">
                    {{ locationData.address }}
                </td>
                <td v-show="isActive(index)">
                    {{ getTimeString(locationData.timeData.localTimestamp) }}
                </td>
                <td v-show="isActive(index)">
                    Latitude:&nbsp;{{ locationData.position.lat }}
                    <br>
                    Longitude:&nbsp;{{ locationData.position.lng }}
                </td>
            </tr>
        </tbody>
        
    </table> 

    <div id="pagination">

    </div>
</div>



</template>

<style scoped>

</style>
