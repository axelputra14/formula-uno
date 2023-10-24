<script>
import { mapActions, mapState } from 'pinia'

import { useFormulaStore } from '../stores/formula'
import Elevator from 'elevator.js'

import CircuitCard from '../components/CircuitCard.vue'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'CircuitListPage',
  data() {
    return {
      theElevator: ''
    }
  },
  components: {
    CircuitCard,
    NavBar
  },
  methods: {
    ...mapActions(useFormulaStore, ['fetchCircuit']),
    onWindowLoad() {
      var elevator = new Elevator({
        element: document.querySelector('.back-to-top'),
        duration: 10000,
        mainAudio: '../src/assets/f1_sound_track_2018.mp3',
        endAudio: '../src/assets/elevator_ding.mp3'
      })
      this.theElevator = elevator
    },
    runElevator() {
      elevator.elevate()
    }
  },
  computed: {
    ...mapState(useFormulaStore, ['circuitList'])
  },
  created() {
    this.fetchCircuit()
  },
  onMounted() {
    window.addEventListener('load', this.onWindowLoad)
  },
  updated() {
    this.onWindowLoad()
  }
}
</script>

<template>
  <NavBar />
  <div class="text-center">
    <h2>List of F1 circuits</h2>
    <p>From 2012 to 2023</p>
  </div>

  <div class="circuit-list-container">
    <CircuitCard v-for="circuit in circuitList" v-bind:circuitData="circuit" :key="circuit.id" />
  </div>

  <div class="back-to-top" v-on:click.prevent="runElevator">
    &#8593; Click to go &#8593; back to top &#8593;
  </div>
</template>
