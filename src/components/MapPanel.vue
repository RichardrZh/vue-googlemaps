<script setup>
import GoogleMaps from './GoogleMaps.vue'
import Searchbar from './Searchbar.vue'
</script>


<template>
  <section class="tw-h-screen tw-max-h-full tw-flex-grow tw-relative"> 
  
    <div class="tw-absolute searchbar-wrapper tw-z-10">
      <Searchbar />
    </div>
    
    <div class="tw-w-full tw-h-full tw-z-0">
      <GoogleMaps  />
    </div>

  </section>
</template>


<style scoped>
section {
  background-color: lightblue;
}

.searchbar-wrapper {
  top: 10px;
  left: 32px;
}
</style>
