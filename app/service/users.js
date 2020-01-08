'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async list() {
    const users = await this.app.model.Users.findAll();
    return users;
  }

  async getUserByUsername({ username }) {
    const users = await this.app.model.Users.findOne({ where: { username } });
    return users;
  }

  async getUserById({ id }) {
    const user = await this.app.model.Users.findByPk(id);
    return user;
  }

  async create({ username, password }) {
    password = this.ctx.helper.sha(password);
    await this.app.model.Users.create({ username, password });
    return;
  }

  async edit({ id, username, password }) {
    password = this.ctx.helper.sha(password);
    const user = await this.app.model.Users.findByPk(id);
    await user.update({ username, password });
    return;
  }

  async delete({ id }) {
    const user = await this.app.model.Users.findByPk(id);
    await user.destroy();
    return user;
  }
}

module.exports = UserService;
