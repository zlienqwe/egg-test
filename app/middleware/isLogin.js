'use strict';

module.exports = () => {
  return async function isLogin(ctx, next) {
    console.log(ctx.cookies.get('user_id'));
    if (!ctx.cookies.get('user_id')) {
      ctx.cookies.set('user_id', null);
      ctx.response.body = {
        code: 401,
        msg: '',
      };
    } else {
      await next();
    }
  };
};
