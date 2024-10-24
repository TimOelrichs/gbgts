<template>
<hr>
<br>
<h3 class="text-h6">I choose you!</h3>

<v-layout class="pkmlist" row wrap>
    <v-flex v-for="i in 6" :key="i" >
      <v-card width="50px" flat tile class="ma-1 " elevation="5">
     
      <v-img  class="pa-8"
                :src="`https://media.bisafans.de/16305f0/pokemon/gen2/kristall/normal/${ i<10 ? '00' : i<100 ? '0' : ''}${i}.png`"
                
              ></v-img>
        <v-icon>home</v-icon>
          </v-card>
   </v-flex>
  </v-layout>
</template>
