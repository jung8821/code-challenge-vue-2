import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form.vue'
import Results from '../views/Results.vue'
import Compare from '../views/Compare.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/results/compare',
    name: 'Compare',
    component: Compare
  }
]

const router = new VueRouter({
  routes
})

export default router
