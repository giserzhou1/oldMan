import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
    token: '',
    user: null,
    isUserLogin: false,
    loadingInstance: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLogin = true
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setLoadingInstance (state, loadingInstance) {
      state.loadingInstance = loadingInstance
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setLoadingInstance ({ commit }, loadingInstance) {
      commit('setLoadingInstance', loadingInstance)
    }
  }
})
