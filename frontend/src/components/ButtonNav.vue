<template>
  <v-bottom-navigation >
  <v-btn value="recent" @click="showGlobals">
    <v-icon >mdi-search-web</v-icon>

    <span>Global</span>
  </v-btn>

  <v-btn value="favorites" @click="showEvents">
    <v-icon>mdi-calendar-star</v-icon>

    <span>Event</span>
  </v-btn>

  <v-btn value="nearby" @click="pokestore.showCheckout = true">
        <v-badge class="ml-10" v-if="pokestore.selectedPkm.length" color="cyan"  v-bind:content="pokestore.selectedPkm.length"  >
       </v-badge>
    <v-icon>mdi-pokeball</v-icon>

    <span>Checkout</span>
  </v-btn>
</v-bottom-navigation>
</template>

<script setup>

import { usePokemonStore } from '@/stores/app';

const pokestore = usePokemonStore();

const showEvents = () => {
  
   pokestore.showCheckout = false;
    pokestore.showEventPkm = true; 
}

const showGlobals = () => {
    
    pokestore.showCheckout = false;
    pokestore.showEventPkm = false; 
}

</script>