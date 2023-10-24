<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useFormulaStore } from '../stores/formula'
export default {
  name: 'LoginPage',
  data() {
    return {
      dataLogin: { email: '', password: '' }
    }
  },
  methods: {
    ...mapActions(useFormulaStore, ['login']),
    loginHandler() {
      this.login(this.dataLogin)
    }
  }
}
</script>

<template>
  <div class="regist-login-bg">
    <div class="form-body">
      <div class="form-container">
        <div class="form-content">
          <div class="form-title">
            <div class="form-svg">
              <img src="../assets/FUno_logo_temp.svg" alt="App Logo" />
            </div>
            <h2>Login</h2>
          </div>
          <form class="regist-partone" v-on:submit.prevent="loginHandler">
            <div class="form-content-inner">
              <div>
                <label>Email</label>
              </div>

              <div>
                <input
                  v-model="dataLogin.email"
                  class="input-field-text"
                  type="text"
                  data-text="Email"
                />
              </div>
            </div>
            <div class="form-content-inner">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input
                  v-model="dataLogin.password"
                  class="input-field-text"
                  type="password"
                  data-text="Password"
                />
              </div>
            </div>
            <div class="form-button">
              <div class="form-content-inner">
                <button type="submit" class="btn-next">Login</button>
              </div>
            </div>
            <p>
              Go to
              <RouterLink class="span-orange" to="/register"> registration.</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
