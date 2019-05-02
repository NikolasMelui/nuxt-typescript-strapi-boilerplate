import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, InfoState, Info } from '~/types';
import strapiRequestService from '~/services/strapiRequestService';

type InfoGetter = GetterTree<InfoState, RootState>;

const clearInfoObject: Info = {
  _id: '',
  phone: '',
  email: ''
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
    console.log(req);
    try {
      const info: Info = (await strapiRequestService(`query {
        infos {
          _id
          address_ru
          address_en
          addresslink
          phone
          email
          vkontakte
          facebook
          instagram
        }
      }
      `)).data.infos.pop();
      const curInfo: Info = info as Info;
      console.log(curInfo);
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
  mutations,
  namespaced: true
};
