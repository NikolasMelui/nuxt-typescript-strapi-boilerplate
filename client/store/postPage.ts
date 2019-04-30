import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, PostPageState, PostPage } from '~/types';
import strapiRequestService from '~/services/strapiRequestService';

type PostPageGetter = GetterTree<PostPageState, RootState>;

const defaultPage: PostPage = {
  _id: '',
  slug: '',
  createdAt: '',
  seotitle: '',
  seodescription: '',
  seokeywords: '',
  title_ru: '',
  title_en: '',
  content_ru: '',
  content_en: '',
  previewImage: {
    url: ''
  },
  image: {
    url: ''
  }
};

export const state: PostPageState = {
  postPage: defaultPage
};

export const getters: PostPageGetter = {
  // Post page
  getPostPage: state => state.postPage,
  getPostPageSeoTitle: state => state.postPage.seotitle,
  getPostPageSeoDescription: state => state.postPage.seodescription,
  getPostPageSeoKeywords: state => state.postPage.seokeywords
};
export const mutations: MutationTree<PostPageState> = {
  setPostPage(state, postPage: PostPage): void {
    const curPostPage = postPage as PostPage;
    state.postPage = curPostPage;
  },
  clearPage(state) {
    state.postPage = defaultPage;
  }
};

export const actions: ActionTree<PostPageState, RootState> = {
  async fetchPostPage({ commit }, payload): Promise<void> {
    try {
      const postPage: PostPage = (await strapiRequestService(`query {
        posts (where: {
          slug: "${payload.toLowerCase()}"
        }) {
          _id
          slug
          createdAt
          title_ru
          title_en
          seotitle
          seodescription
          seokeywords
          content_ru
          content_en
          previewImage {
            url
          }
          image {
            url
          }
        }
      }
      `)).data.posts.pop();
      const curPostPage = postPage as PostPage;
      commit('setPostPage', curPostPage);
    } catch (error) {
      console.error(error);
    }
  },
  clearPage({ commit }) {
    commit('clearPage');
  }
};

export const postPage: Module<PostPageState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
