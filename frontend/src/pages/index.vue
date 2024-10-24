<template>

    <PokemonList></PokemonList>
        

  <button-nav v-if="pokestore.generation != ''"></button-nav>

  </template>

<script setup>

import PokemonList from '@/components/PokemonList.vue';
import { usePokemonStore } from '@/stores/app';

const pokestore = usePokemonStore();
</script>