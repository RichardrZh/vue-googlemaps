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
  
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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
    <div class="tw-flex tw-flex-col tw-gap-5">
        <div class="container-rounded tw-bg-red-200">
            <h2>Latest Searched Location:</h2>
            <p>{{ latestLocation.address }} - {{ latestLocation.timeZone }} - {{ latestLocation.localTime }}</p>
        </div>

        <div class="container-rounded tw-bg-red-200">
            <Pagination />
        </div>
    </div>
</template>

<style scoped>
.container-rounded {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 1rem;
  padding: 16px;
  text-align: center;
}
</style>
