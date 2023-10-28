<script setup>
import GoogleMaps from './GoogleMaps.vue'
import Searchbar from './Searchbar.vue'

</script>

<template>
  <section class="h-screen max-h-full flex-grow z-10 relative">

    <!-- search field from maps api, maybe wrap it and add buttons: 
      search(mag glass), curr loc icons(house?) -->
    <div class="absolute z-10 searchbar-wrapper">
      <Searchbar />
    </div>
    
    <!-- google maps map from api -->
    <div class="w-full h-full z-0">
      <GoogleMaps  />
    </div>

  </section>
</template>

<style scoped>
section {
  background-color: lightblue;
}

.searchbar-wrapper {
  top: 16px;
  left: 50%;
  transform: translate(-50%);
}
</style>
