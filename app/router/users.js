'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.isLogin();


  router.post('/user/login', controller.users.login);
  router.post('/user/logout', controller.users.logout);
  router.get('/user', controller.users.list);
  router.post('/user', controller.users.create);
  router.post('/user/:user_id', isLogin, controller.users.edit);
  router.delete('/user', isLogin, controller.users.delete);

};
