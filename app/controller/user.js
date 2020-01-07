'use strict';

const Controller = require('egg').Controller;

const rules = {
  username: 'string',
  password: 'string',
};

class ResponseData {
  constructor(code = 200, data = {}, msg = '') {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }
}

class UserController extends Controller {
  async list() {
    try {
      const users = await this.ctx.service.user.list();
      if (users.length) {
        this.ctx.response.body = new ResponseData(200, users);
      } else {
        this.ctx.response.body = new ResponseData(500, {}, '空');
      }
    } catch (error) {
      this.ctx.response.body = new ResponseData(500, {}, error.toString());
    }
  }
  async create() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    // 表单验证
    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      const [ error ] = errors;
      ctx.response.body = new ResponseData(500, {}, `${error.field} ${error.message}`);
      return;
    }

    // 检测用户是否存在
    const user = await ctx.service.user.getUserByUsername({ username });
    if (user) {
      ctx.response.body = new ResponseData(500, {}, '用户已存在');
      return;
    }
    // 创建用户
    try {
      await ctx.service.user.create({ username, password });
      ctx.response.body = new ResponseData(200, {}, '创建成功');
    } catch (error) {
      ctx.response.body = new ResponseData(500, {}, error.toString());
    }
  }

  async edit() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const { user_id: id } = ctx.params;
    // 表单验证
    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      const [ error ] = errors;
      ctx.response.body = new ResponseData(500, {}, `${error.field} ${error.message}`);
      return;
    }

    // 检测用户是否存在
    const user = await ctx.service.user.getUserById({ id });
    if (!user) {
      ctx.response.body = new ResponseData(500, {}, '用户不存在');
      return;
    }
    // 创建用户
    try {
      await ctx.service.user.edit({ id, username, password });
      ctx.response.body = new ResponseData(200, {}, '编辑成功');
    } catch (error) {
      ctx.response.body = new ResponseData(500, {}, error.toString());
    }
  }

  async login() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    // 表单验证

    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      const [ error ] = errors;
      ctx.response.body = new ResponseData(500, {}, `${error.field} ${error.message}`);
      return;
    }

    const user = await ctx.service.user.getUserByUsername({ username });
    if (!user) {
      this.ctx.response.body = new ResponseData(500, {}, '用户不存在');
      return;
    }

    if (user.password !== ctx.helper.sha(password)) {
      this.ctx.response.body = new ResponseData(500, {}, '密码不正确');
      return;
    }

    ctx.cookies.set('user_id', user.id);
    ctx.response.body = new ResponseData(200, { data: user }, '登录成功');
  }

  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.request.query;
    const user = await ctx.service.user.getUserById({ id });
    if (!user) {
      this.ctx.response.body = new ResponseData(500, {}, '用户不存在');
      return;
    }

    try {
      await ctx.service.user.delete({ id });
      ctx.response.body = new ResponseData(200, {}, '删除成功');
    } catch (error) {
      ctx.response.body = new ResponseData(500, {}, error.toString());
    }
  }

  async logout() {
    this.ctx.cookies.set('user_id', null);
    this.ctx.response.body = new ResponseData(200, {}, '退出');
  }

}

module.exports = UserController;
