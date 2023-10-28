<script setup>
import { computed } from 'vue'
import { useLocationsStore } from "../stores/locations.js"
const store = useLocationsStore()

let center = computed(() => {
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
    class="google-map"
    :center="center"
    :zoom="5"
    map-type-id="terrain">

    <GMapMarker
      :key="placeID"
      v-for="[placeID, locationData] in store.getLocations()"
      :position="locationData.position"
      @click="center = locationData"/>

      <!-- <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position"  /> -->

  </GMapMap>
</template>


<style scoped>
.google-map {
  width: 100%;    
  height: 100%;
}
</style>
