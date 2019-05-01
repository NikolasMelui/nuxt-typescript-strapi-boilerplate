import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState, PostsState, Post } from '~/types';
import strapiRequestService from '~/services/strapiRequestService';

type PostsGetter = GetterTree<PostsState, RootState>;

export const state: PostsState = {
  posts: [],
  postsTotalCount: 0
};

export const getters: PostsGetter = {
  getPosts: state => state.posts,
  getPostsTotalCount: state => state.postsTotalCount
};

export const mutations: MutationTree<PostsState> = {
  setPosts(state, posts: Array<Post>): void {
    if (posts.length < 1) {
      state.posts = [];
    } else {
      const curPosts: Array<Post> = [];
      posts.forEach(post => {
        const curPost = post as Post;
        curPosts.push(curPost);
      });
      state.posts = curPosts;
    }
  },
  setPostsTotalCount(state, postsTotalCount) {
    state.postsTotalCount = postsTotalCount;
  },
  clearPosts(state) {
    state.posts = [];
  }
};

export const actions: ActionTree<PostsState, RootState> = {
  async fetchPosts({ commit }) {
    try {
      const curData = (await strapiRequestService(
        `query {
					posts (limit: 9, sort: "createdAt:desc") {
						_id
						createdAt
						slug
						title_ru
						title_en
						content_ru
						content_en
						seotitle
						seodescription
						seokeywords
						previewImage {
							url
						}
						image {
							url
						}
					}
					postsConnection {
						aggregate {
							count
						}
					}
				}
				`
      )).data;
      const curPosts: Array<Post> = [];
      const curTotalCount: number = curData.postsConnection.aggregate.count;
      curData.posts.forEach(post => {
        curPosts.push(post as Post);
      });
      commit('setPosts', curPosts);
      commit('setPostsTotalCount', curTotalCount);
    } catch (error) {
      console.error(error);
      commit('clearPosts');
    }
  },
  async morePosts({ commit }, payload) {
    try {
      const posts: Array<Post> = (await strapiRequestService(
        `query {
					posts (limit: 9, start: ${payload}) {
						_id
						createdAt
						slug
						title_ru
						title_en
						content_ru
						content_en
						seotitle
						seodescription
						seokeywords
						image {
							url
						}
						previewImage {
							url
						}
					},
				}
				`
      )).data.posts;
      const curPosts: Array<Post> = [];
      posts.forEach(post => {
        curPosts.push(post as Post);
      });
      commit('setPosts', curPosts);
    } catch (error) {
      console.error(error);
      commit('clearPosts');
    }
  },
  clearPosts({ commit }) {
    commit('clearPosts');
  }
};

export const posts: Module<PostsState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
