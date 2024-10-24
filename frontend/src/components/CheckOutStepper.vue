<template>

  <v-stepper v-model="step" :items="items" hide-actions="true">
    <template v-slot:item.1>
      <h3 class="text-h6">Do you want to get these?</h3>
      <div clas="table" width="400px">
        <v-table fixed-header>
          <thead>
            <tr>
              <th class="text-left">
                Pokemon
              </th>
              <th class="text-left">
                DexNo.
              </th>
              <th class="text-left">
                Species
              </th>
              <th class="text-left">
                Lv.
              </th>

              <th class="text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pkm in pokestore.selectedPkm">

              <td> <v-img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${pkm.dexNo}.png`"
                  min-width="30px" max-width="50px"></v-img></td>
              <td class="text-left">{{ pkm.dexNo }}</td>
              <td class="text-left">{{ pkm.name }}</td>
              <td class="text-left">{{ pkm.level }}</td>

              <td class="text-left">
                <v-btn @click="pokestore.removeSelectedPokemon(pkm)" prepend-icon="mdi-delete"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </template>

    <template v-slot:item.2 ">
        <h3 class=" text-h6">Enter your ingame Trainer ID:</h3>
      <br>
      <v-otp-input v-model="opt" length="5" @change="validateOPT"></v-otp-input>

      <br>


    </template>

    <template v-slot:item.3>
      <h3 class="text-h6">Waiting for Connection...</h3>
      <br>
      <v-sheet>
        Play your Game with the DoubleCherryGB Core and visit the Cable Club in a PokeCenter.

      </v-sheet>
    </template>
    <v-stepper-actions @click:next="next" @click:prev="prev" v-bind:disabled="nextdisabled"></v-stepper-actions>
  </v-stepper>

</template>

<script>
import PokeSelection from './PokeSelection.vue';
import { usePokemonStore } from '@/stores/app';
import axios from 'axios';

const pokestore = usePokemonStore()

export default {
  data: () => ({
    opt: '',
    nextdisabled: false,
    pokestore,
    step: 1,
    items: [
      'Choose',
      'Checkout',
      'Connect',
    ],
  }),
  methods: {
    next() {
      this.step++;
      if (this.step === 2) {
        this.nextdisabled = this.opt.length < 5 ? 'next' : false;
      }
      if (this.step === 3) {
        this.nextdisabled = 'next';
        this.sendCheckout();

      }

      console.log("Yeah")
    },
    prev() {
      if (this.step != 0) this.step--;

      if (this.step === 2) {

        this.nextdisabled = this.opt.length < 5;
      }
      if (this.step === 1) {
        this.nextdisabled = (this.pokestore.selectedPkm.length == 6) ? 'prev' : false;
      }
      if (this.step === 0) {
        pokestore.showCheckout = false;
      }

      console.log("Yeah")
    },
    validateOPT() {
      this.nextdisabled = (this.opt.length >= 5) ? false : true;
      console.log(this.opt);
    },
    sendCheckout() {
      axios.post("/pkms/checkout", {
        TrainerId: this.opt,
        Pokemons: this.pokestore.selectedPkm
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'

        },
      }).then((res) => {
        console.log(res);

      })
    }
  },
  computed: {

  },
}
</script>


<style>
.dexNo {
  text-align: right;
}

.pkmlist {
  justify-self: center;
  justify-content: center;
  flex-wrap: wrap;
}

.pkimg {
  justify-content: center;
}
</style>