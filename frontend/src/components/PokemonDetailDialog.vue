<template>

        <v-dialog
          transition="dialog-bottom-transition"
          width="auto"
        >
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              text="Stats"
            ></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card >
              <v-toolbar class="pl-2" title=""> #{{pokemon.dexNo}} {{pokemon.name}} </v-toolbar>
            
                <v-row>
                    <v-col>
                        Move1:
                    </v-col>
                       <v-col>
                        {{ pokemon.move1 }}
                        </v-col>
                </v-row>
              <v-card-text class="text-h2 pa-12">
                Hello world!
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
     

</template>

<script setup>
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

import * as Pkm from "@/types/pkm-model"

const prop = defineProps({pokemon : Pkm
});

const data = {
  labels: [
    'AttackIv',
    'DefenseIv',
    'SpeedIv',
    'SpecialIv',
    'HpIv',
  ],
  datasets: [
    {
      label: 'IVs',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [0,15,15,14,15,10,0]
    }
   
  ]
}

const options = {
  responsive: false,
  maintainAspectRatio: false
}


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)


</script>