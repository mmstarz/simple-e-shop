"use strict";

/**
 * A set of functions called "actions" for `Order`
 */
const stripe = require("stripe")("sk_test_NAuL84MEMaYfuAtFALF4njTg");

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }

  /**
   * Create a record.
   *
   * @return {Object}
   */

  create: async (ctx, next) => {
    try {
      const {
        city,
        postalCode,
        address,
        amount,
        brews,
        token
      } = ctx.request.body;

      // send charge to stripe
      const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: "usd",
        description: `Order ${new Date()} - User ${ctx.state.user._id}`,
        source: token
      });

      const order = await Order.create({
        user: ctx.state.user._id,
        address,
        amount,
        postalCode,
        brews,
        city
      });

      ctx.body = "ok";
      ctx.send({ order });
    } catch (err) {
      ctx.body = err;
    }
  }
};
