<script>
import { RouterLink } from 'vue-router'
import { useFormulaStore } from '../stores/formula'
import { mapActions } from 'pinia'

export default {
  name: 'NavBar',
  data() {
    return {
      speechResult: ''
    }
  },
  methods: {
    runSpeechRecog() {
      document.getElementById('output').innerHTML = 'Loading text...'
      var output = document.getElementById('output')
      var action = document.getElementById('action')
      let recognization = new webkitSpeechRecognition()
      recognization.onstart = () => {
        action.innerHTML = 'Listening...'
      }
      recognization.onresult = (e) => {
        var transcript = e.results[0][0].transcript
        output.value = transcript
        this.speechResult = transcript
        action.innerHTML = ''
      }
      recognization.start()
    },
    ...mapActions(useFormulaStore, ['logout', 'setIsLogin']),
    logoutHandler() {
      this.logout()
    }
  },
  watch: {
    speechResult(result) {
      if (result == 'home') {
        this.$router.push({ name: 'home' })
      } else if (result == 'circuit') {
        this.$router.push({ name: 'circuit' })
      } else if (result == 'logout' || result == 'log out') {
        this.logoutHandler()
      }
    }
  }
}
</script>

<template>
  <div class="header">
    <img src="../assets/FUno_logo_temp.svg" alt="App Logo" class="logo" />

    <nav class="navbar">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/circuit">Circuit</RouterLink>
        </li>
        <li>
          <RouterLink to="/" v-on:click.prevent="logoutHandler">Logout</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="speaker">
      <p id="action"></p>
      <input type="text" id="output" v-model="speechResult" />
      <button v-on:click.prevent="runSpeechRecog()">Speech</button>
    </div>
  </div>
</template>
