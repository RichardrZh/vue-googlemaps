<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

const toggleSidebarStyle = computed(() => {
  return { 
    'sidebar-active': showSidebar.value
  }
})

const toggleSidebarButtonStyle = computed(() => {
  return { 
    'arrow-left': !showSidebar.value, 'arrow-right': showSidebar.value 
  }
})

const sidebarRef = ref(null)

const theme = reactive({
  marginLeft: '0'
})

function handleResize() {
  theme.marginLeft = `-${sidebarRef.value.clientWidth - 32}px`
}

onMounted(() => {
  handleResize()
  window.addEventListener("resize", handleResize);
})

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
})

</script>

<template>
  <section :class="toggleSidebarStyle" ref="sidebarRef">

    <div class="togglesidebarbutton-wrapper">
      <button @click="toggleSidebar" :class="toggleSidebarButtonStyle">
      </button>
    </div>
    
    <div class="content-wrapper">
      <slot></slot>
    </div>

  </section>
</template>

<style scoped>

section {
  background-color: lightgrey;
  border-style: solid;
  border-width: 0 8px 0 0;
  border-right-color: whitesmoke;
  min-width: 16px;
  transition: margin 1s;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
.sidebar-active {
  margin-left: v-bind('theme.marginLeft');
}

.togglesidebarbutton-wrapper {
  position: relative;
}

.togglesidebarbutton-wrapper button {
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  width: 0;
  height: 0;
}

.arrow-right {
  border-top: 32px solid transparent;
  border-bottom: 32px solid transparent;
  border-left: 32px solid lightgrey;
  border-right: none;
  transform: translateX(40px);
}
.arrow-left {
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent; 
  border-left: none;
  border-right: 40px solid whitesmoke; 
  transform: translate(8px, -8px);
}

.content-wrapper {
    max-width: 80vw;
    min-width: 30vw;
    width: 30rem;
    padding: 16px;
    max-height: 100vh;
    overflow: auto;
}

</style>
