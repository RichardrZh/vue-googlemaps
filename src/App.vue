<script setup>
import ContentPanel from './components/ContentPanel.vue';
import LeftSidebar from './components/LeftSidebar.vue'
import MapPanel from './components/MapPanel.vue'
</script>

<template>

  <main class="tw-flex tw-items-stretch tw-w-screen tw-max-w-full tw-overflow-x-hidden">
    
    <LeftSidebar class="tw-z-50">
      <ContentPanel />
    </LeftSidebar>

    <MapPanel class="tw-z-10" /> 

  </main>

</template>

<style scoped>


</style>
