'use strict';

const { app } = require('egg-mock/bootstrap');
const username = 'username';
const username2 = 'username2';
const username3 = 'username3';
const username4 = 'username4';
const username5 = 'username5';
const username6 = 'username6';
const password = 'password';

const genData = async () => {
  await app.mysql.delete('user');
  await app.mysql.insert('user', { id: 1, username, password });
  await app.mysql.insert('user', { id: 2, username: username2, password });
  await app.mysql.insert('user', { id: 3, username: username3, password });
  await app.mysql.insert('user', { id: 4, username: username4, password });
  await app.mysql.insert('user', { id: 5, username: username5, password });
};

module.exports = {
  genData, username2, username6, password,
};
