import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins:[persistedState()],
  state: {
    bookshelf: []
  },
  mutations: {

  }
})
export default store