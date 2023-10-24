<script>
export default {
  name: 'CircuitCard',
  props: ['circuitData'],
  data() {
    return {
      flagIso: ''
    }
  },
  methods: {
    getCircuitDetail(circuitId) {
      this.$router.push({ name: 'circuitDetail', params: { circuitId } })
    },
    convertNameToIso() {
      this.flagIso = 'https://flagsapi.com/' + '/flat/32.png'
    }
  },
  created() {
    this.convertNameToIso()
  }
}
</script>

<template>
  <div class="card-container" v-on:click="getCircuitDetail(circuitData.id)">
    <div class="circuit-card-layout">
      <img v-bind:src="circuitData.image" />
    </div>

    <div class="circuit-card-title">
      <p>{{ circuitData.name }}</p>
    </div>
    <div class="circuit-card-location">
      <p>&nbsp;{{ circuitData.competition.location.country }}</p>
    </div>
  </div>
</template>
