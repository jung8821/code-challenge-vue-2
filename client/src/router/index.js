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
    component: Results,
    props: true
  },
  {
    path: '/results/compare',
    name: 'Compare',
    component: Compare,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
