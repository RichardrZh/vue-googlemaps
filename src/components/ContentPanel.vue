<script setup>
import Pagination from './Pagination.vue'
import { computed } from 'vue'
import { useLocationsStore } from '../stores/locations.js'
import { getDateString } from '../scripts/DateTimeUtils.js'

const store = useLocationsStore()



/* const formattedDate = new Intl.DateTimeFormat(navigator.language).format(date); */

const latestLocation = computed(() => {
  if (!store.getMostRecentLocation()) {
    return {
      address: "",
      timeZone: "",
      localTime: ""
    }
  }

  let address = store.getMostRecentLocation().address
  let timeZone = `${store.getMostRecentLocation().timeData.timeZoneID}, ${store.getMostRecentLocation().timeData.timeZoneName}`
  
  const options = {
    dayperiod: "short",
    hour: "numeric",
    minute: "numeric",
  }
  let localTime = getDateString(store.getMostRecentLocation().timeData.localTimestamp, options)

  return {
    address: address,
    timeZone: timeZone,
    localTime: localTime
  }
})


</script>

<template>

  <div class="container-rounded tw-bg-red-200">
    <h2>Latest Searched Location:</h2>
    
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Address:</th>
          <td>{{ latestLocation.address }}</td>
        </tr>
        <tr>
          <th scope="row">Time&nbsp;Zone:</th>
          <td>{{ latestLocation.timeZone }}</td>
        </tr>
        <tr>
          <th scope="row">Local&nbsp;Time:</th>
          <td>{{ latestLocation.localTime }}</td>
        </tr>
      </tbody>
    </table>
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
  background-color: white;
  margin-bottom: 0;
  font-weight: bold;
  font-size: larger;
}

table th {
  font-size: medium;
  font-weight: 600;
}
</style>
