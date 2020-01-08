'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/users.test.js', () => {
  let ctx;

  beforeEach(async () => {
    ctx = app.mockContext();
  });

  describe('GET users list', () => {
    it('should GET user list', async () => {
      await app.factory.createMany('users', 5);
      const data = await ctx.service.users.list();
      assert.equal(data.length, 5);
    });
  });

  describe('GET user2', () => {
    it('should GET user2 by username', async () => {
      await app.factory.createMany('users', 5);
      const user = await app.factory.create('users');
      const user2 = await ctx.service.users.getUserByUsername({ username: user.username });
      assert.equal(user2.username, user.username);
    });

    it('should GET user2 by id', async () => {
      const user = await app.factory.create('users');
      const user2 = await ctx.service.users.getUserById({ id: user.id });
      assert.equal(user2.username, user.username);
    });
  });

  describe('create user', () => {
    it('should create a new user6', async () => {
      await app.factory.createMany('users', 5);
      await ctx.service.users.create({ username: 'username_6', password: 'password' });
      const count = await app.model.Users.count();
      assert.equal(count, 6);
      const user6 = await app.model.Users.findOne({ where: { username: 'username_6' } });
      assert.equal(user6.username, 'username_6');
    });
  });


  describe('edit user', () => {
    it('should edit user2', async () => {
      const user = await app.factory.create('users');
      await ctx.service.users.edit({ id: user.id, username: 'usernameXXX', password: 'password' });
      const user2 = await app.model.Users.findByPk(user.id);
      assert.equal(user2.username, 'usernameXXX');
    });
  });

  describe('delete user', () => {
    it('should delete user2', async () => {
      const user = await app.factory.create('users');
      await ctx.service.users.delete({ id: user.id });
    });
  });
});
