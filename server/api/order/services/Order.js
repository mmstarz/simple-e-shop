'use strict';

/**
 * `Order` service.
 */

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }

  /**
   * Promise to add record
   *
   * @return {Promise}
   */

  create: async (data) => {
    const entry = await strapi.query("order").create(data);
    // const order = await strapi.model('order').create(data);

    entry.save();

    return entry;
  }
};
