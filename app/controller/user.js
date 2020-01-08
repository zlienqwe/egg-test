'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/baseController');
const rules = {
  username: 'string',
  password: 'string',
};

class UserController extends Controller {
  async list() {
    try {
      const users = await this.ctx.service.user.list();
      if (users.length) {
        this.success(users);
      } else {
        this.error('空');
      }
    } catch (error) {
      this.error(error.toString());
    }
  }
  async create() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    // 表单验证
    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      const [ error ] = errors;
      this.error(`${error.field} ${error.message}`);
      return;
    }

    // 检测用户是否存在
    const user = await ctx.service.user.getUserByUsername({ username });
    if (user) {
      this.error('用户已存在');
      return;
    }
    // 创建用户
    try {
      await ctx.service.user.create({ username, password });
      this.success();
    } catch (error) {
      this.error(error.toString());
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
      this.error(`${error.field} ${error.message}`);
      return;
    }

    // 检测用户是否存在
    const user = await ctx.service.user.getUserById({ id });
    if (!user) {
      this.error('用户不存在');
      return;
    }
    // 创建用户
    try {
      await ctx.service.user.edit({ id, username, password });
      this.success();
    } catch (error) {
      this.error(error.toString());
    }
  }

  async login() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    // 表单验证

    console.log(ctx.queries);
    console.log(ctx.headers);
    console.log('aaaaaa', ctx.get('cookie'));
    console.log('aaaaaa', ctx.host);
    console.log('aaaaaa', ctx.protocol);
    console.log('aaaaaa', ctx.ip);


    const errors = this.app.validator.validate(rules, ctx.request.body);
    if (errors) {
      const [ error ] = errors;
      this.error(`${error.field} ${error.message}`);
      return;
    }

    const user = await ctx.service.user.getUserByUsername({ username });
    if (!user) {
      this.error('用户不存在');
      return;
    }

    if (user.password !== ctx.helper.sha(password)) {
      this.error('密码不正确');
      return;
    }

    ctx.cookies.set('user_id', user.id);
    this.success(user);
  }

  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.request.query;
    const user = await ctx.service.user.getUserById({ id });
    if (!user) {
      this.error('用户不存在');
      return;
    }

    try {
      await ctx.service.user.delete({ id });
      this.success();
    } catch (error) {
      this.error(error.toString());
    }
  }

  async logout() {
    this.ctx.cookies.set('user_id', null);
    this.success();
  }
}

module.exports = UserController;
