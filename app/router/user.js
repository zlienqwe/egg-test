'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.isLogin();


  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);
  router.get('/user', controller.user.list);
  router.post('/user', controller.user.create);
  router.post('/user/:user_id', isLogin, controller.user.edit);
  router.delete('/user', isLogin, controller.user.delete);

};
