'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.cookies.get('user_id');
  }

  success(data = {}) {
    this.ctx.body = {
      code: 200,
      data,
    };
  }

  error(msg = '未知错误') {
    this.ctx.body = {
      code: 500,
      data: {},
      msg,
    };
  }

  notFound(msg = 'not found') {
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
