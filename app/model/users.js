'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(100),
    auth: STRING(100),
  });

  return Users;
};
