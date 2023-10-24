import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CircuitListPage from '../views/CircuitListPage.vue'
import CircuitDetailPage from '../views/CircuitDetailPage.vue'
import Swal from 'sweetalert2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: HomePage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/circuit',
      name: 'circuit',
      component: CircuitListPage
    },
    {
      path: '/circuit/:circuitId',
      name: 'circuitDetail',
      component: CircuitDetailPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == 'NotFound') {
    next('/')
  } else {
    if (localStorage.access_token) {
      if (to.name == 'register' || to.name == 'login') {
        next('/')
      } else {
        next()
      }
    } else if (!localStorage.access_token) {
      if (to.name == 'register' || to.name == 'login') {
        next()
      } else {
        Swal.fire({
          title: 'Please login first!',
          icon: 'error',
          confirmButtonText: 'Close'
        })
        next('/login')
      }
    }
  }
})

export default router
