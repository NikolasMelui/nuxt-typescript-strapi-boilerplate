'use strict';

/**
 * Info.js controller
 *
 * @description: A set of functions called "actions" for managing `Info`.
 */

module.exports = {

  /**
   * Retrieve info records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.info.search(ctx.query);
    } else {
      return strapi.services.info.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a info record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.info.fetch(ctx.params);
  },

  /**
   * Count info records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.info.count(ctx.query);
  },

  /**
   * Create a/an info record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.info.add(ctx.request.body);
  },

  /**
   * Update a/an info record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.info.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an info record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.info.remove(ctx.params);
  }
};
