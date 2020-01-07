'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { genData, password, username2, username6 } = require('../../mockData/database');
describe('test/app/service/user.test.js', () => {
  beforeEach(async () => {
    await genData();
  });
  
  it('should GET user list', async () => {
    const ctx = app.mockContext();
    const data = await ctx.service.user.list();
    assert.equal(data.length, 5);
  });

  it('should GET user2 by username', async () => {
    const ctx = app.mockContext();
    const user2 = await ctx.service.user.getUserByUsername({ username: username2 });
    assert.equal(user2.username, username2);
  });
  it('should GET user2 by id', async () => {
    const ctx = app.mockContext();
    const user2 = await ctx.service.user.getUserById({ id: 2 });
    assert.equal(user2.username, 'username2');
  });
  it('should create a new user6', async () => {
    const ctx = app.mockContext();
    await ctx.service.user.create({ username: username6, password });
    const count = await app.mysql.count('user');
    assert.equal(count, 6);
    const user6 = await app.mysql.get('user', { username: username6 });
    assert.equal(user6.username, username6);
  });
  it('should edit user2', async () => {
    const ctx = app.mockContext();
    await ctx.service.user.edit({ id: 2, username: 'usernameXXX', password });
    const user2 = await app.mysql.get('user', { id: 2 });
    assert.equal(user2.username, 'usernameXXX');
  });
  it('should delete user2', async () => {
    const ctx = app.mockContext();
    await ctx.service.user.delete({ id: 2 });
    const count = await app.mysql.count('user');
    assert.equal(count, 4);
    const user2 = await app.mysql.get('user', { id: 2 });
    assert.equal(user2, null);
  });
});
