/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
//import 'material-design-icons-iconfont/dist/material-design-icons.css'


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
})

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
