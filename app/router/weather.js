'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.isLogin();
  const gzip = app.middleware.gzip({ threshold: 1024 });
  console.log(gzip);
  router.get('weather', '/weather', gzip, controller.weather.index);
};
