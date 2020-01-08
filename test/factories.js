// test/factories.js
'use strict';

const { factory } = require('factory-girl');

module.exports = async app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;
  // 定义 user 和默认数据
  factory.define('users', app.model.Users, {
    username: factory.sequence('Users.username', n => `username_${n}`),
    password: 'password',
  });
};
