<template>


<v-card>


<v-card-title>Welcome to GBGTS</v-card-title>
   <v-img  cover aspect-ratio="16/9"
            src="@/assets/logo.png"
           ></v-img>
<v-select class="mt-8" width="30ch" label="Select your Generation" v-model="selectedGen" :items="gens" @update:modelValue="onChange"></v-select>

</v-card>
</template>
<script>

import { usePokemonStore } from '@/stores/app';

const pokestore = usePokemonStore()

  export default {
    data: () => ({
        pokestore,
        selectedGen : '', 
      gens: ['Red / Blue / Yellow', 'Silver / Gold / Crystal'],
    }),
    methods:{
        onChange(){pokestore.setGeneration(this.selectedGen == 'Red / Blue / Yellow' ? 1 : 2)}},
    mounted() {
		console.log(pokestore.generation);
	}
  }


</script>