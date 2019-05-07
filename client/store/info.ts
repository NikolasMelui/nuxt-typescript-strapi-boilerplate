import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, InfoState, Info } from '~/types';
import strapiRequestService from '~/services/strapiRequestService';

type InfoGetter = GetterTree<InfoState, RootState>;

const clearInfoObject: Info = {
  _id: '',
  phone: '',
  email: '',
  address: '',
  addresslink: ''
};

export const state: InfoState = {
  info: clearInfoObject
};

export const getters: InfoGetter = {
  getInfo: state => state.info
};

export const mutations: MutationTree<InfoState> = {
  setInfo(state, info: Info): void {
    const curInfo = info as Info;
    state.info = curInfo;
  },
  clearInfo(state) {
    state.info = clearInfoObject;
  }
};

export const actions: ActionTree<InfoState, RootState> = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      const info: Info = (await strapiRequestService(`query {
        infos {
          _id
          phone
          email
          address
          addresslink
        }
      }
      `)).data.infos.pop();
      const curInfo: Info = info as Info;
      commit('setInfo', curInfo);
    } catch (error) {
      console.error(error);
      commit('clearInfo');
    }
  },
  clearInfo({ commit }) {
    commit('clearInfo');
  }
};

export const info: Module<InfoState, RootState> = {
  state,
  getters,
  actions,
  mutations
  // namespaced: true
};
