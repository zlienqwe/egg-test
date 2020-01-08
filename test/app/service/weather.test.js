'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/weather.test.js', () => {
  it('should GET info', async () => {
    const ctx = app.mockContext();
    const { code } = await ctx.service.weather.info();
    assert.equal(code, 10001);
  });
});
