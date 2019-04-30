import Vue from 'vue';
import Vuex from 'vuex';
import { info } from './info';
import { pages } from './pages';
import { posts } from './posts';
import { shared } from './shared';
import { seo } from './seo';
import { postPage } from './postPage';

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    modules: {
      info,
      pages,
      posts,
      shared,
      seo,
      postPage
    }
  });
