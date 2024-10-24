<template>

<div>

  <v-rating class="ma-4"
        readonly
        :length="3"
        size="20"
        :model-value="pokemon.starRating"
        active-color="pink"
    />       
    <v-card-subtitle>
      {{pokemon.textRating}}
    </v-card-subtitle>

</div>

</template>


<script setup>

const prop = defineProps({pokemon : {
    starRating: Number,
    textRating: String

}})

</script>
