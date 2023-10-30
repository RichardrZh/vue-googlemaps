<script setup>
import Pagination from './Pagination.vue'

import { computed } from 'vue'

import { useLocationsStore } from '../stores/locations.js'
import { getFormattedTime} from '../scripts/DateTimeUtils.js'


const store = useLocationsStore()

/** 
 * Represents the most recently searched location. 
 * Contains formatted string descriptors of its location data.
 * @type {Object}
 * @property {String} address - The address of the location. 
 * @property {String} timeZone - The time zone id and time zone name of the location.
 * @property {String} localTime - The local time of the location.
 */
const latestLocationFormatted = computed(() => {
  if (!store.getMostRecentLocation()) {
    return {
      address: "",
      timeZone: "",
      localTime: ""
    }
  }
  
  let address = store.getMostRecentLocation().address
  let timeZone = `${store.getMostRecentLocation().timeData.timeZoneID}, ${store.getMostRecentLocation().timeData.timeZoneName}`
  let localTime = getFormattedTime(store.getMostRecentLocation().timeData.localTimestamp)

  return {
    address: address,
    timeZone: timeZone,
    localTime: localTime
  }
})
</script>


<template>
  <div class="container-rounded tw-bg-[#d1eaff]">

    <h2>Latest Searched Location:</h2>

    <div class="tw-overflow-auto">
      <table class="table">
        <tbody>

          <tr>
            <th scope="row">Address:</th>
            <td>{{ latestLocationFormatted.address }}</td>
          </tr>

          <tr>
            <th scope="row">Time&nbsp;Zone:</th>
            <td>{{ latestLocationFormatted.timeZone }}</td>
          </tr>

          <tr>
            <th scope="row">Local&nbsp;Time:</th>
            <td>{{ latestLocationFormatted.localTime }}</td>
          </tr>

        </tbody>
      </table>
    </div>

    <Pagination />

  </div>
</template>


<style scoped>
.container-rounded {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 1rem;
  
  padding: 16px;
}

h2 {
  text-align: center;
  font-weight: bold;
  font-size: larger;

  margin-bottom: 0;
  background-color: white;
}

table th {
  font-size: medium;
  font-weight: 600;
}
</style>
