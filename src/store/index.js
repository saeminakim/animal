import Vue from 'vue'
import Vuex from 'vuex'
import profile from './profile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // totalPages: 0,
    // page: 0,
    // value: 0,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    profile
  }
})
