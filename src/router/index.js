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
    name: 'animals',
    component: () => import('../views/AnimalList.vue')
  },
  {
    path: '/animals',
    name: 'animals',
    component: () => import('../views/AnimalList.vue')
  },
  {
    path: '/animals/:id',
    name: 'animalDetails',
    component: () => import('../views/AnimalDetails.vue'),
  },
  {
    path: '/applied',
    name: 'applied',
    component: () => import('../views/Applied.vue'),
  },
  {
    path: '/apply/:id',
    name: 'apply',
    component: () => import('../views/NewApp.vue')
  },
  {
    path: '/application',
    name: 'application',
    component: () => import('../views/getApp.vue')
  },
  {
    path: '/application/:id',
    name: 'appDetails',
    component: () => import('../views/AppDetails.vue')
  },
  {
    path: '/application/edit/:id',
    name: 'editApp',
    component: () => import('../views/EditApp.vue')
  },
  {
    path: '/edited',
    name: 'edited',
    component: () => import('../views/Edited.vue')
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: () => import('../views/CancelApp.vue')
  },
  {
    path: '/canceled',
    name: 'canceled',
    component: () => import('../views/Canceled.vue')
  },
  {
    path: '/lostandfoundanimal',
    name: 'lostAndFoundAnimal',
    component: () => import('../views/LostAndFoundAnimal.vue')
  },
  {
    path: '/reviewmain',
    name: 'reviewMain',
    component: () => import('../views/ReviewMain.vue')
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../views/Manager.vue')
  },
  {
    path: '/about',
    name: 'about',
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
