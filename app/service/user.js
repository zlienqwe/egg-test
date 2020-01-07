'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async list() {
    const users = await this.app.mysql.select('user');
    return users;
  }

  async getUserByUsername({ username }) {
    const user = await this.app.mysql.get('user', { username });
    return user;
  }

  async getUserById({ id }) {
    const user = await this.app.mysql.get('user', { id });
    return user;
  }

  async create({ username, password }) {
    password = this.ctx.helper.sha(password);
    await this.app.mysql.insert('user', { username, password });
    return;
  }

  async edit({ id, username, password }) {
    const option = {
      where: {
        id,
      },
    };
    password = this.ctx.helper.sha(password);
    await this.app.mysql.update('user', { username, password }, option);
    return;
  }

  async delete({ id }) {
    const result = await this.app.mysql.delete('user', { id });
    return result;
  }
}

module.exports = UserService;
