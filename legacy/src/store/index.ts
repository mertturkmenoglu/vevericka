/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { router } from '@/router';
import AuthService from '@/api/auth';
import { LoginPayload, LoginSuccess, RegisterPayload } from '@/store/types';

Vue.use(Vuex);

const token = localStorage.getItem('vev-token') || '';
const userFromStorageStr = localStorage.getItem('vev-user') || '{"user":{"username":"","userId":""}}';
const userObj = JSON.parse(userFromStorageStr) as { user: { username: string; userId: string } };

const gstate = {
  user: userObj.user || {
    username: '',
    userId: '',
  },
  token,
  error: '',
  gSearchTerm: '',
  loginStatus: '',
  registerStatus: '',
};

type MyStateType = {
  user: {
    username: string;
    userId: string;
  };
  token: string;
  error: string;
  gSearchTerm: string;
  loginStatus: string;
  registerStatus: string;
}

const actions = {
  async login(ctx: ActionContext<MyStateType, MyStateType>, payload: LoginPayload): Promise<void> {
    ctx.commit('loginRequest');

    try {
      const resp = await AuthService.login(payload.email, payload.password);
      if (!resp) {
        ctx.commit('loginFail', 'Cannot login');
        return;
      }

      const userStr = JSON.stringify({ user: { username: resp.username, userId: resp.userId } });
      window.localStorage.setItem('vev-token', resp.token);
      window.localStorage.setItem('vev-user', userStr);
      ctx.commit('loginSuccess', resp);
      await router.push('/');
    } catch (err: any) {
      ctx.commit('loginFail', err.response.data.message);
    }
  },

  async register(
    ctx: ActionContext<MyStateType, MyStateType>,
    payload: RegisterPayload,
  ): Promise<void> {
    ctx.commit('registerRequest');

    try {
      const id = await AuthService.register(
        payload.email,
        payload.username,
        payload.name,
        payload.password,
      );

      if (!id) {
        ctx.commit('registerFail', 'Cannot register');
        return;
      }

      const loginResponse = await AuthService.login(payload.email, payload.password);

      if (!loginResponse) {
        ctx.commit('registerFail', 'Registered but cannot login');
        return;
      }

      const userStr = JSON.stringify({
        user: { username: loginResponse.username, userId: loginResponse.userId },
      });

      window.localStorage.setItem('vev-token', loginResponse.token);
      window.localStorage.setItem('vev-user', userStr);

      await ctx.commit('registerSuccess');
      await router.push('/');
    } catch (err: any) {
      ctx.commit('registerFail', err.response.data.message);
    }
  },

  async logout(ctx: ActionContext<MyStateType, MyStateType>): Promise<void> {
    localStorage.removeItem('vev-token');
    localStorage.removeItem('vev-user');
    ctx.commit('logout');
    await router.push('/login');
  },
};

const mutations = {
  loginRequest(state: MyStateType): void {
    state.user = {
      userId: '',
      username: '',
    };
    state.token = '';
    state.error = '';
    state.loginStatus = 'loading';
    state.registerStatus = '';
  },
  loginSuccess(state: MyStateType, payload: LoginSuccess): void {
    state.loginStatus = 'success';
    state.error = '';
    state.user.username = payload.username;
    state.user.userId = payload.userId;
    state.token = payload.token;
  },
  loginFail(state: MyStateType, errorMessage: string): void {
    state.loginStatus = 'fail';
    state.error = errorMessage;
  },
  logout(state: MyStateType): void {
    state.user = {
      username: '',
      userId: '',
    };
    state.token = '';
    state.error = '';
    state.loginStatus = '';
    state.registerStatus = '';
  },
  registerRequest(state: MyStateType): void {
    state.user = {
      userId: '',
      username: '',
    };
    state.token = '';
    state.error = '';
    state.loginStatus = '';
    state.registerStatus = 'loading';
  },
  registerSuccess(state: MyStateType): void {
    state.user = {
      userId: '',
      username: '',
    };
    state.token = '';
    state.error = '';
    state.loginStatus = '';
    state.registerStatus = 'success';
  },
  registerFail(state: MyStateType, errorMessage: string): void {
    state.user = {
      userId: '',
      username: '',
    };
    state.token = '';
    state.error = errorMessage;
    state.loginStatus = '';
    state.registerStatus = 'fail';
  },
};

export default new Vuex.Store({
  state: gstate, actions, mutations,
});