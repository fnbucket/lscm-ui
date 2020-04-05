import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedIds: []
  },
  mutations: {
    setSelectedIds (state, payload) {
      state.selectedIds = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
