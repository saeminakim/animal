import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'AbandonedAnimal',
    component: () => import('../views/AbandonedAnimal.vue')
  },
  {
    path: '/AnimalList',
    name: 'AnimalList',
    component: () => import('../views/AnimalList.vue')
  },
  {
    path: '/lostandfoundanimal',
    name: 'LostAndFoundAnimal',
    component: () => import('../views/LostAndFoundAnimal.vue')
  },
  {
    path: '/reviewmain',
    name: 'ReviewMain',
    component: () => import('../views/ReviewMain.vue')
  },
  {
    path: '/Request',
    name: 'Request',
    component: () => import('../views/Request.vue')
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/Manager.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
