<script setup>
import { computed } from 'vue'

import { useLocationsStore } from "../stores/locations.js"


const store = useLocationsStore()

/**
 * The center of the google map.
 * @type {Computed<Object>}
 * @property {Number} lat - The latitude of the center.
 * @property {Number} lng - The longitude of the center.
 */
const center = computed(() => {
  if (store.getMostRecentLocation()) {
    return store.getMostRecentLocation().position
  }
  return { 
    lat: 43.7476699, 
    lng: -79.355269
  }
})
</script>


<template>
  <GMapMap 
    ref="googleMapsRef"
    class="google-map"
    :center="center"
    :zoom="5"
    map-type-id="terrain"
    :options="{ mapTypeControl: false }">

    <GMapMarker
      :key="placeID"
      v-for="[placeID, locationData] in store.getLocations()"
      :position="locationData.position"
      @click="center = locationData"/>

  </GMapMap>
</template>


<style scoped>
.google-map {
  width: 100%;    
  height: 100%;
}
</style>
