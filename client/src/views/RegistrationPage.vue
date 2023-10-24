<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useFormulaStore } from '../stores/formula'
export default {
  name: 'RegistrationPage',
  data() {
    return {
      dataRegister: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useFormulaStore, ['register']),
    registerHandler() {
      this.register(this.dataRegister)
    }
  }
}
</script>

<template>
  <div class="regist-login-bg">
    <div class="form-body">
      <div class="form-container">
        <form class="form-content" v-on:submit.prevent="registerHandler">
          <div class="form-title">
            <div class="form-svg">
              <img src="../assets/FUno_logo_temp.svg" alt="App Logo" />
            </div>
            <h2>Registration</h2>
          </div>
          <div class="regist-partone">
            <div class="form-content-inner">
              <div>
                <label>Email</label>
              </div>

              <div>
                <input v-model="dataRegister.email" class="input-field-text" type="email" />
              </div>
            </div>
            <div class="form-content-inner">
              <div>
                <label>Username</label>
              </div>
              <div>
                <input v-model="dataRegister.username" class="input-field-text" type="text" />
              </div>
            </div>
            <div class="form-content-inner">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input v-model="dataRegister.password" class="input-field-text" type="password" />
              </div>
            </div>
            <div class="form-button">
              <button type="submit" class="btn-next">Register</button>
            </div>

            <p>
              Go to
              <RouterLink class="span-orange" to="/login"> login.</RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
