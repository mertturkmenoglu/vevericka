import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../router'

Vue.use(Vuex)

let user = JSON.parse(localStorage.getItem('user'));

const state = {
  status: user ? { loggedIn: true } : {},
  user: user ? user : null,
  error: null
}

const actions = {
  async login({ commit }, { email, password }) {
    commit('loginRequest', { email })

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      };

      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://vevericka-auth-service.herokuapp.com/auth/login`, requestOptions);
      const data = await response.json();

      if (!data.user) {
        commit('loginFailure', data.message);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      await commit('loginSuccess', data.user);
      router.push('/')
    } catch (err) {
      commit('loginFailure', err.message);
    }
  },

  async register({ commit }, { email, username, name, password }) {
    commit('registerRequest', { email, username, name, password })

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, name, password })
      };

      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://vevericka-auth-service.herokuapp.com/auth/register`, requestOptions);
      const data = await response.json();

      if (!data || data.message) {
        commit('registerFailure', data.message)
        return;
      }

      localStorage.setItem('user', JSON.stringify(data))
      await commit('registerSuccess', data)
      router.push('/')
    } catch (err) {
      commit('registerFailure', err.message);
    }
  },

  logout({ commit }) {
    localStorage.removeItem('user');
    commit('logout');
    router.push('/login')
  }
}

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
    state.error = null;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
    state.error = null;
  },
  loginFailure(state, err) {
    state.status = {};
    state.user = null;
    state.error = err;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state, user) {
    state.status = { registering: true };
    state.user = user;
    state.error = null;
  },
  registerSuccess(state, user) {
    state.status = { registeredIn: true, registering: false, loggedIn: true };
    state.user = user;
    state.error = null;
  },
  registerFailure(state, error) {
    state.status = {};
    state.user = null;
    state.error = error;
  }
}

export default new Vuex.Store({
  state, actions, mutations
})
