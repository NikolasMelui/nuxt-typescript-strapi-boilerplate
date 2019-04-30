import Strapi from 'strapi-sdk-javascript/build/main';

const apiUrl: string = process.env.apiUrl || 'http://0.0.0.0:1337';

export default new Strapi(apiUrl);
