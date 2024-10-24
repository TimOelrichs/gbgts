<template>


  <div v-if="pokestore.generation == ''" class="d-flex text-center justify-center ma-8">
    <version-select></version-select>
  </div>

  <div v-else class="card text-center m-3" v-if="pokestore.selectedPkm.length < 6 && !pokestore.showCheckout">


    <div v-if="!pokestore.loading" class="searchbar " elevation="8">
      <div class="search">
        <v-text-field class="searchfield" clearable width="35ch" density="compact" label="" v-model="searchValue"
          prepend-inner-icon="mdi-magnify"></v-text-field>

      </div>
      <!--
    <div class="sortBy">
    <div class="label">Sort by </div>

<v-select flat
v-model:model-value="sortBySelection"
    width="22ch"
  label=""
  density="compact"
  :items="['Pokedex High-Low', 'Pokedex Low-High','Level High-Low', 'Level Low-High', 'Rating High-Low']"
  
></v-select>

    </div>
     -->
    </div>

    <div v-if="pokestore.loading">
      <v-row class="mx-4">
        <v-col v-for="i in 18" cols="12" xs="12" sm="6" md="4" lg="3" xl="2" xxl="1">
          <v-skeleton-loader class="ma-1 " elevation="8" v-if="loading" type="card" width="280px"
            height="350px"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>


    <div v-if="!pokestore.loading" class="content">
      <v-layout class="pkmlist mx-auto" row wrap>

        <v-row class="mx-4">
          <v-col v-for="i in filteredPkm" :key="i.id" cols="12" xs="12" sm="6" md="4" lg="3" xl="2" xxl="1">
            <pokemon-card :pokemon="i" @click=""></pokemon-card>
          </v-col>
        </v-row>

      </v-layout>
    </div>
  </div>
  <div class="card text-center m-3" v-if="pokestore.selectedPkm.length == 6 || pokestore.showCheckout">
    <check-out-stepper></check-out-stepper>
  </div>

</template>

<style>
.sortBy {
  display: flex;
  width: 35ch;
}

.sortBy .label {
  padding: 12px;
}

.pkmlist {
  margin-top: 90px;
  justify-self: center;
  justify-content: center;
  flex-wrap: wrap;
}

.searchbar {
  height: 60px;
  padding-top: 10px;
  width: 100vw;
  background-color: #212121;
  z-index: 1000;
  position: fixed;
  margin-top: -95px;
  display: flex;
  justify-self: center;
  justify-content: center;
  flex-wrap: wrap;
}

.searchfield {


  justify-self: center;
}
</style>

<script>
import axios from 'axios'
import { usePokemonStore } from '@/stores/app'

const pokestore = usePokemonStore();
let filterGen1Done = false;

export default {
  name: "get-request-error-handling",
  data() {
    return {
      searchValue: '',
      sortBySelection: ref('Rating High-Low'),
      pokestore,
      errorMessage: null,
      loading: ref(true),
      sortMethod: null
    };
  },
  mounted() {

    if (pokestore.allPokemons.length === 0) {

      axios.get("/pkms")
        .then((res) => {

          pokestore.allPokemons = res.data;
          pokestore.loading = false;
        }

        )
    };
  },
  computed: {
    filteredPkm() {
      pokestore.loading = true;
      let pkms = pokestore.unselectedPkm;

      if (pokestore.showEventPkm) {
        pkms = pkms.filter((pkm) => pkm.isEventPkm)
      } else pkms = pkms.filter((pkm) => !pkm.isEventPkm)

      if (pokestore.generation == 1) {
        console.log(pkms);
        pkms = pkms.filter((pkm) => {
          return (pkm.dexNo <= 151
            && (pkm.move1 == 0xFF || pkm.move1 < 166)
            && (pkm.move2 == 0xFF || pkm.move2 < 166)
            && (pkm.move3 == 0xFF || pkm.move3 < 166)
            && (pkm.move4 == 0xFF || pkm.move4 < 166)

          )
        })
      }



      // Process search input
      if (this.searchValue != '' && this.searchValue) {

        pkms = pkms.filter((pkm) => {
          return pkm.name
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
            ||
            pkm.dexNo
              .toString()
              .includes(this.searchValue)
        })
      }

      switch (this.sortBySelection) {
        case 'Pokedex High-Low': pkms = pkms.sort((a, b) => b.dexNo - a.dexNo);
        case 'Pokedex Low-High': pkms = pkms.sort((a, b) => a.dexNo - b.dexNo);
        case 'Level High-Low': pkms = pkms.sort((a, b) => b.level - a.level);
        case 'Level Low-High': pkms = pkms.sort((a, b) => a.level - b.level);
        case 'Rating High-Low': pkms = pkms.sort((a, b) => b.starRating - a.starRating);

      }
      pokestore.loading = false;
      return pkms;

    }
  }
}


</script>
