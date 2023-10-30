<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'


/**
 * Represents whether or not the sidebar is open or closed.
 * If true, the sidebar is open.
 * If false, the sidebar is closed.
 */
const showSidebar = ref(true)

/**
 * Toggles whether or not the sidebar is open or closed.
 */
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

/** 
 * The style of the sidebar.
 * @type {Ref<Object>}
 */
const toggleSidebarStyle = computed(() => {
  return { 
    'sidebar-active': !showSidebar.value
  }
})

/** 
 * The style of the arrow button.
 * @type {Ref<Object>}
 */
const toggleSidebarButtonStyle = computed(() => {
  return { 
    'arrow-left': showSidebar.value, 'arrow-right': !showSidebar.value 
  }
})

/** 
 * A reference to the sidebar wrapper html element.
 * @type {Ref<HTMLElement | null>}
 */
const sidebarRef = ref(null)

/**
 * The left sidebar margin theme.
 * @type {Ref<Object>}
 */
const theme = reactive({
  marginLeft: '0'
})

/**
 * Sets the left sidebar margin left theme to ensure proper open/close sidebar behaviour.
 */
function handleResize() {
  theme.marginLeft = `-${sidebarRef.value.clientWidth - 32}px`
}

/* On mount we add an event listener to observe the sidebar's width. */
onMounted(() => {
  handleResize()
  window.addEventListener("resize", handleResize);
})

/* On unmount we remove all uncaught resources. */
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
  border-style: solid;
  border-width: 0 8px 0 0;
  border-right-color: #f5c73d;

  background-color: #66ccc3;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  min-width: 16px;

  transition: margin 1s;
}

.sidebar-active {
  margin-left: v-bind('theme.marginLeft');
}

.togglesidebarbutton-wrapper {
  position: relative;
}

.togglesidebarbutton-wrapper button {
  position: absolute;
  top: 0;
  right: 0;

  width: 0;
  height: 0;
  z-index: 100;

  background-color: transparent;
}

.arrow-right {
  border-top: 32px solid transparent;
  border-bottom: 32px solid transparent;
  border-left: 32px solid #66ccc3;
  border-right: none;

  transform: translateX(40px);
}

.arrow-left {
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent; 
  border-left: none;
  border-right: 40px solid #f5c73d; 

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
