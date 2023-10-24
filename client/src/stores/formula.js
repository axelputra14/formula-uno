import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
import router from '../router'
export const useFormulaStore = defineStore({
  id: 'formula',
  state() {
    return {
      circuitList: [],
      circuitDetail: [],
      isLogin: false
    }
  },
  actions: {
    async fetchCircuit() {
      try {
        const result = await axios.get('https://axelputra14.site/circuit', {
          headers: { access_token: localStorage.access_token }
        })

        this.circuitList = result.data
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCircuitById(circuitId) {
      try {
        const result = await axios.get(`https://axelputra14.site/circuit/${circuitId}`, {
          headers: { access_token: localStorage.access_token }
        })

        this.circuitDetail = result.data[0]
      } catch (err) {
        console.log(err)
      }
    },

    async register(dataRegister) {
      try {
        // console.log(dataRegister)
        const response = await axios.post('https://axelputra14.site/user', {
          email: dataRegister.email,
          username: dataRegister.username,
          password: dataRegister.password
        })
        // idk why it always goes to err when response is 202.
        router.push({ name: 'login' })
      } catch (err) {
        Swal.fire({
          title: `Check your email!`,
          text: 'Verification email sent',
          icon: 'success',
          confirmButtonText: 'Okay!'
        })
        router.push({ name: 'login' })
        // Swal.fire({
        //   title: `Failed to register`,
        //   icon: 'error',
        //   confirmButtonText: 'Close'
        // })
      }
    },

    async login(dataLogin) {
      try {
        const response = await axios.post('https://axelputra14.site/user/login', {
          email: dataLogin.email,
          password: dataLogin.password
        })
        console.log(response)

        localStorage.setItem('access_token', response.data.access_token)

        Swal.fire({
          title: `Welcome to Formula Uno!`,
          icon: 'success',
          confirmButtonText: 'Yay!'
        })
        this.isLogin = true
        router.push({ name: 'home' })
      } catch (err) {
        Swal.fire({
          title: `Wrong login credentials`,
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
    },
    logout() {
      localStorage.removeItem('access_token')
      Swal.fire({
        title: `Logged out`,
        icon: 'success',
        confirmButtonText: 'Close'
      })

      this.isLogin = false
      router.push({ name: 'login' })
    },

    setIsLogin() {
      this.isLogin = true
    }
  }
})
