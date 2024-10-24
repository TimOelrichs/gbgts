<template>
<v-card  v-bind:class="[pokemon.isShiny ? 'pink' : '']" class="ma-1" elevation="5" min-width="300px">

    <v-card-title>{{pokemon.isEventPkm ? pokemon.eventName : '#' + pokemon.dexNo}} {{pokemon.name}} <v-icon v-if="pokemon.isShiny" size="20">mdi-creation</v-icon></v-card-title>
    <v-card-subtitle>Lv. {{ pokemon.level}} </v-card-subtitle>

    <v-card flat class="mx-8 d-flex align-center justify-center"
    >
    <v-img  contain max-height="150px"  aspect-ratio="16/9"
            :src="`https://github.com/Purukitto/pokemon-data.json/blob/master/images/pokedex/hires/${pokemon.dexNo<10 ? '00' : pokemon.dexNo<100 ? '0' : ''}${pokemon.dexNo}.png?raw=true`"
            :lazy-src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${pokemon.dexNo}.png`">
            <template v-slot:placeholder>
      <div  class="d-flex align-center justify-center fill-height">
        <v-progress-circular 
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    </v-img>
    </v-card>

    <pokemon-judge-rating :pokemon="pokemon"></pokemon-judge-rating>
    <div class="actions">
    <v-card-actions >
    
        <v-btn class="ma-0" @click="pokestore.addSelectedPokemon(pokemon.id)" text="Trade"  append-icon="mdi-download"></v-btn>
    </v-card-actions>
    </div>

</v-card>

</template>

<script setup>

import { usePokemonStore } from '@/stores/app'

const pokestore = usePokemonStore()

const prop = defineProps({pokemon : {
    id: String,
    name: String,
    dexNo: Number,
    level: Number,
}})

/*
    <v-img min-width="170px" cover class="ml-6 mr-6"
           :src="`https://github.com/Purukitto/pokemon-data.json/blob/master/images/pokedex/hires/${pokemon.dexNo<10 ? '00' : pokemon.dexNo<100 ? '0' : ''}${pokemon.dexNo}.png?raw=true`">
    </v-img>

*/
</script>

<style>

.actions{
    display: flex;
    justify-content: center;
}

.shiny{
  color: "FFEA00";
}
</style>
