import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const base_host = process.env.BASE_HOST || '127.0.0.1';
const base_port = process.env.BASE_PORT || '3002';
const base_url = process.env.BASE_URL || 'http://localhost:3002';
const base_meta_robots = process.env.BASE_META_ROBOTS || 'noindex, nofollow';
const api_host = process.env.API_HOST || '127.0.0.1';
const api_port = process.env.API_PORT || '1337';
const api_url = process.env.API_PROTOCOL || 'http://localhost:1337';

export default {
  env: {
    baseUrl: base_url,
    apiUrl: api_url
  },
  server: {
    host: base_host || '127.0.0.1',
    port: base_port || 3002
  },
  head: {
    title: 'Multikey-strapi-template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'This is a description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }],
    script: [
      {
        src: '/scripts/vkPixel.js'
      },
      {
        src: '/scripts/fbPixel.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: ['~/assets/sass/index.sass'],
  plugins: [
    {
      src: '~/plugins/ga.js',
      ssr: false
    }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Host: base_url
      }
    ],
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    path: '/sitemap.xml',
    generate: true,
    hostname: base_url,
    exclude: [],
    async routes() {
      return (await Promise.all([
        (await axios.get(`${api_url}/posts`)).data.map(
          post => `/posts/${post.slug}`
        )
      ])).flat(1);
    }
  },
  axios: {
    baseURL: api_url
  }
};
