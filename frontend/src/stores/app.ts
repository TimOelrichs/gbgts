// Utilities
import { defineStore } from 'pinia'
import { Pkm } from "@/types/pkm-model"

const selectedPkm : string[] = [];

export const usePokemonStore = defineStore('pokemons', {
  state: () => ({
    generation: 0, 
    allPokemons: [],
    gen1Pokemons: [],
    selectedPokemons: selectedPkm,
    showCheckout: false,
    showEventPkm: false,
    loading: true
    }),
  actions: {
    addSelectedPokemon(pkmid: string){
      console.log(pkmid);
      this.selectedPokemons.push(pkmid);
    },
     removeSelectedPokemon(pkm: Pkm) {
       this.selectedPokemons = this.selectedPokemons.filter((id : string) => id != pkm.id );
       console.log(pkm);
      },
    setGeneration(gen : number) {
      this.generation = gen;  
  },
},
  getters:{
    unselectedPkm() : Pkm[]{
      return this.allPokemons.filter((pkm : Pkm) => this.selectedPokemons.indexOf(pkm.id)=== -1);
    },
    selectedPkm() : Pkm[]{
      return this.allPokemons.filter((pkm : Pkm) => this.selectedPokemons.indexOf(pkm.id) !== -1);
    },
    selectedPkmCount() : number{
      return this.selectedPkm.length;
    }   
  }
})
