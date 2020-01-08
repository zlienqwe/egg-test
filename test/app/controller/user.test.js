'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should GET /user 500', async () => {
    const requestResult = await app.httpRequest().get('/user');
    assert.equal(requestResult.status, 200);
    assert.equal(requestResult.body.code, 500);
  });

  it('should GET /user 200', async () => {
    await app.factory.createMany('users', 5);
    const requestResult = await app.httpRequest().get('/user');
    assert.equal(requestResult.status, 200);
    assert.equal(requestResult.body.code, 200);
    assert.equal(requestResult.body.data.length, 5);
  });

  it('should GET status 500', async () => {
    await app.factory.createMany('users', 5);
    app.mockServiceError('users', 'list', 'mock user service error');
    const requestResultList = await app.httpRequest().get('/user');
    assert.equal(requestResultList.status, 200);
    assert.equal(requestResultList.body.code, 500);

    app.mockServiceError('users', 'create', 'mock user service error');
    const requestResultCreate = await app.httpRequest().post('/user');
    assert.equal(requestResultCreate.status, 200);
    assert.equal(requestResultCreate.body.code, 500);

    const requestResultLogin = await app.httpRequest().post('/user/login');
    assert.equal(requestResultLogin.status, 200);
    assert.equal(requestResultLogin.body.code, 500);
  });

});
