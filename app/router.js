'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  console.log('====================================');
  console.log(app);
  console.log('====================================');
  require('./router/weather')(app);
  require('./router/user')(app);
};
