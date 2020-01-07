'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const utility = require('utility');

describe('test/app/extend/helper.test.js', () => {
  it('should check md5 and sha', async () => {
    const ctx = app.mockContext();
    assert(utility.sha256('xxxxx') === ctx.helper.sha('xxxxx'));
    assert(utility.md5('xxxxx') === ctx.helper.md5('xxxxx'));
  });

  it('should check timer', async () => {
    const ctx = app.mockContext();
    const duration17 = ctx.helper.relativeTime(Date.parse(new Date()) / 1000 - 1000);
    const duration2 = ctx.helper.relativeTime(Date.parse(new Date()) / 1000 - 100);
    assert.equal(duration17, '17 minutes ago');
    assert.equal(duration2, '2 minutes ago');
  });
});
