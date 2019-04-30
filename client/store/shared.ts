import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, SharedState } from '~/types';

type SharedGetter = GetterTree<SharedState, RootState>;

export const state: SharedState = {
  isMenuOpen: false,
  isCallbackOpen: false,
  isToolbarActive: false,
  modalSettings: {
    page: '',
    form: ''
  },
  notification: {
    message: '',
    active: false,
    type: ''
  }
};

export const getters: SharedGetter = {
  getCallbackState: state => state.isCallbackOpen,
  getNotification: state => state.notification
};

export const mutations: MutationTree<SharedState> = {
  setCallbackState(state, curState): void {
    state.isCallbackOpen = curState;
  },
  setNotification(state, curState) {
    state.notification = curState;
  }
};

export const actions: ActionTree<SharedState, RootState> = {
  fetchCallbackState({ commit }, curState) {
    commit('setCallbackState', curState);
  },
  fetchNotification({ commit }, curState) {
    commit('setNotification', curState);
  }
};

export const shared: Module<SharedState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
