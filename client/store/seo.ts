import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, SeoState } from '~/types';
import strapiRequestService from '~/services/strapiRequestService';

type SeoGetter = GetterTree<SeoState, RootState>;

const defaultSeotitle: string = 'Сеотайтл';
const defaultSeodescription: string = 'Сеодискрипшон';
const defaultSeokeywords: string = 'Сеокейворлдз';

export const state: SeoState = {
  seotitle: defaultSeotitle,
  seodescription: defaultSeodescription,
  seokeywords: defaultSeokeywords
};

export const getters: SeoGetter = {
  getSeotitle: state => state.seotitle,
  getSeodescription: state => state.seodescription,
  getSeokeywords: state => state.seokeywords
};

export const mutations: MutationTree<SeoState> = {
  setSeo(state, payload): void {
    state.seotitle = payload.seotitle;
    state.seodescription = payload.seodescription;
    state.seokeywords = payload.seokeywords;
  },
  clearSeo(state) {
    state.seotitle = defaultSeotitle;
    state.seodescription = defaultSeodescription;
    state.seokeywords = defaultSeokeywords;
  }
};

export const actions: ActionTree<SeoState, RootState> = {
  async fetchSeo({ commit }, payload): Promise<void> {
    try {
      const seo = (await strapiRequestService(`query {
        pages (where: {
          slug: "${payload.toLowerCase()}"
        }) {
          seotitle
          seodescription
          seokeywords
        }
      }
      `)).data.pages.pop();
      commit('setSeo', seo);
    } catch (error) {
      console.error(error);
    }
  },
  clearSeo({ commit }) {
    commit('clearSeo');
  }
};

export const seo: Module<SeoState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
