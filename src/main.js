import './styles/main.css'

/* lib: bootstrap */
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { GOOGLE_MAPS_API_KEY } from './config.json'

import { createApp } from 'vue'
import App from './App.vue'

/* pinia */
import { createPinia } from 'pinia'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faMapLocationDot, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'

/* vue 3 google maps */
import VueGoogleMaps from 'vue-google-maps-community-fork'

const app = createApp(App)

/* fontawesome */
library.add(faMapLocationDot, faSearch, faTrash);
app.component('font-awesome-icon', FontAwesomeIcon)

/* pinia */
const pinia = createPinia()
app.use(pinia)

/* vue 3 google maps */
app.use(VueGoogleMaps, {
    load: {
        key: GOOGLE_MAPS_API_KEY,
        libraries: 'places',
    },
})

app.mount('#app')