<script>
import { useFormulaStore } from '../stores/formula'
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
export default {
  name: 'CircuitDetailPage',
  components: {
    NavBar
  },
  data() {
    return {
      mapSrc: ''
    }
  },
  methods: {
    ...mapActions(useFormulaStore, ['fetchCircuitById']),
    setMapSrc() {
      this.mapSrc =
        'https://www.google.com/maps/embed/v1/search?q=' +
        this.circuitDetail.name +
        '&key=AIzaSyA6Tj-8ZZin7KEavi7zYEbBVaOCj3k-P20&maptype=satellite&zoom=15'
    },
    convertNameToIso() {
      this.flagIso = 'https://flagsapi.com/' + '/flat/32.png'
    }
  },
  computed: {
    ...mapState(useFormulaStore, ['circuitDetail'])
  },
  created() {
    this.fetchCircuitById(this.$route.params.circuitId)
  },
  updated() {
    this.setMapSrc()
    this.convertNameToIso()
  }
}
</script>

<template>
  <NavBar />
  <div class="circuit-detail-title">
    <h1>{{ circuitDetail.name }}</h1>
  </div>
  <div class="detail-page">
    <div class="detail-container">
      <iframe
        width="900"
        height="700"
        style="border: 0"
        loading="lazy"
        allowfullscreen
        v-bind:src="this.mapSrc"
      ></iframe>
    </div>
    <div class="detail-container detail-data">
      <img class="track-layout" v-bind:src="circuitDetail.image" />

      <h3>{{ circuitDetail.competition.location.country }}</h3>
      <p>First F1 race hosted: {{ circuitDetail.first_grand_prix }}</p>
      <p>Laps: {{ circuitDetail.laps }}</p>

      <p>Year opened: {{ circuitDetail.opened }}</p>

      <p>Length: {{ circuitDetail['length'] }}</p>

      <p>Race distance: {{ circuitDetail.race_distance }}</p>
    </div>
  </div>
  <div class="back-div">
    <RouterLink to="/circuit">&#171; Back</RouterLink>
  </div>
</template>
