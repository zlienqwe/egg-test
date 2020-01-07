'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');
const { genData } = require('../../mockData/database');

describe('test/app/controller/home.test.js', () => {
  it('should GET /user 500', async () => {
    await app.mysql.delete('user');
    const requestResult = await app.httpRequest().get('/user');
    assert.equal(requestResult.status, 200);
    assert.equal(requestResult.body.code, 500);
  });

  it('should GET /user 200', async () => {
    await genData();
    const requestResult = await app.httpRequest().get('/user');
    assert.equal(requestResult.status, 200);
    assert.equal(requestResult.body.code, 200);
    assert.equal(requestResult.body.data.length, 5);
  });

  it('should GET status 500', async () => {
    await genData();
    app.mockServiceError('user', 'list', 'mock user service error');
    const requestResultList = await app.httpRequest().get('/user');
    assert.equal(requestResultList.status, 200);
    assert.equal(requestResultList.body.code, 500);

    app.mockServiceError('user', 'create', 'mock user service error');
    const requestResultCreate = await app.httpRequest().post('/user');
    assert.equal(requestResultCreate.status, 200);
    assert.equal(requestResultCreate.body.code, 500);


    const requestResultLogin = await app.httpRequest().post('/user/login');
    assert.equal(requestResultLogin.status, 200);
    assert.equal(requestResultLogin.body.code, 500);
  });

  afterEach(mock.restore);
});
