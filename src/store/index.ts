import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import { router } from '@/router'
import AuthService from "@/api/auth";
import {LoginPayload, LoginSuccess, RegisterPayload} from "@/store/types";

Vue.use(Vuex)

const tokenFromStorageStr = localStorage.getItem('vev-token') || '""'
const userFromStorageStr = localStorage.getItem('vev-user') || '""'

const tokenObj = JSON.parse(tokenFromStorageStr) as { token: string }
const userObj = JSON.parse(userFromStorageStr) as { user: { username: string; userId: string; } }
const token = tokenObj.token || ''

const state = {
  user: userObj.user || {
    username: '',
    userId: ''
  },
  token: token,
  error: '',
  gSearchTerm: '',
  loginStatus: '',
  registerStatus: '',
}

type MyStateType = {
  user: {
    username: string;
    userId: string;
  }
  token: string;
  error: string;
  gSearchTerm: string;
  loginStatus: string;
  registerStatus: string;
}

const actions = {
  async login(ctx: ActionContext<any, any>, payload: LoginPayload) {
    ctx.commit('loginRequest')

    try {
      const resp = await AuthService.login(payload.email, payload.password)
      if (!resp) {
        ctx.commit('loginFail', 'Cannot login')
        return
      }

      const tokenStr = JSON.stringify({token: resp.token})
      const userStr = JSON.stringify({ user: { username: resp.username, userId: resp.userId }})
      window.localStorage.setItem('vev-token', tokenStr)
      window.localStorage.setItem('vev-user', userStr)
      ctx.commit('loginSuccess', resp);
      await router.push('/')
    } catch (err) {
      ctx.commit('loginFail', err.message);
    }
  },

  async register(ctx: ActionContext<any, any>, payload: RegisterPayload) {
    ctx.commit('registerRequest', payload.email)

    try {
      const id = await AuthService.register(
          payload.email,
          payload.username,
          payload.name,
          payload.password
      )
      if (!id) {
        ctx.commit('registerFailure', 'Cannot register')
      }

      await ctx.commit('registerSuccess', id)
      await router.push('/')
    } catch (err) {
      ctx.commit('registerFailure', err.message);
      return;
    }
  },

  async logout(ctx: ActionContext<any, any>) {
    localStorage.removeItem('vev-token');
    localStorage.removeItem('vev-user');
    ctx.commit('logout');
    await router.push('/login')
  }
}

const mutations = {
  loginRequest(state: MyStateType) {
    state.user = {
      userId: '',
      username: ''
    }
    state.token = ''
    state.error = ''
    state.loginStatus = 'loading'
    state.registerStatus = ''
  },
  loginSuccess(state: MyStateType, payload: LoginSuccess) {
    state.loginStatus = 'success'
    state.error = ''
    state.user.username = payload.username
    state.user.userId = payload.userId
    state.token = payload.token
  },
  loginFail(state: MyStateType, errorMessage: string) {
    state.loginStatus = 'fail'
    state.error = errorMessage
  },
  logout(state: MyStateType) {
    state.user = {
      username: '',
      userId: '',
    }
    state.token = ''
    state.error = ''
    state.loginStatus = ''
    state.registerStatus = ''
  }
}

export default new Vuex.Store({
  state, actions, mutations,
})
