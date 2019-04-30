import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, PagesState, Page } from '~/types';
import strapiRequestService from '~/services/strapiRequestService';

type PagesGetter = GetterTree<PagesState, RootState>;

const defaultPage: Page = {
  _id: '',
  slug: '',
  seotitle: '',
  seodescription: '',
  seokeywords: '',
  title_ru: '',
  title_en: '',
  subtitle_ru: '',
  subtitle_en: '',
  content_ru: '',
  content_en: ''
};

export const state: PagesState = {
  mainPage: defaultPage,
  postsPage: defaultPage
};

export const getters: PagesGetter = {
  // Main page
  getMainPage: state => state.mainPage,
  getMainPageSeotitle: state => state.mainPage.seotitle,
  getMainPageSeoDescription: state => state.mainPage.seodescription,
  getMainPageSeoKeywords: state => state.mainPage.seokeywords,
  // Posts page
  getPostsPage: state => state.postsPage,
  getPostsSeotitle: state => state.postsPage.seotitle,
  getPostsSeoDescription: state => state.postsPage.seodescription,
  getPostsSeoKeywords: state => state.postsPage.seokeywords
};

export const mutations: MutationTree<PagesState> = {
  setMainPage(state, page: Page): void {
    const curPage = page as Page;
    state.mainPage = curPage;
  },
  setPostsPage(state, page: Page): void {
    const curPage = page as Page;
    state.postsPage = curPage;
  },
  clearPages(state) {
    state.mainPage = defaultPage;
    state.postsPage = defaultPage;
  }
};

export const actions: ActionTree<PagesState, RootState> = {
  async fetchPage({ commit }, payload): Promise<void> {
    try {
      const page: Page = (await strapiRequestService(`query {
        pages (where: {
          slug: "${payload.toLowerCase()}"
        }) {
          _id
          slug
          title_ru
          title_en
          subtitle_ru
          subtitle_en
          seotitle
          seodescription
          seokeywords
          content_ru
          content_en
        }
      }
      `)).data.pages.pop();
      const curPage = page as Page;
      if (curPage === undefined) {
        commit(`set${payload}Page`, defaultPage);
      } else {
        commit(`set${payload}Page`, curPage);
      }
    } catch (error) {
      console.error(error);
    }
  },
  clearPages({ commit }) {
    commit('clearPages');
  }
};

export const pages: Module<PagesState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
