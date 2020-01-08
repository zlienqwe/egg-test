'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async index() {
    const ctx = this.ctx;
    const result = await ctx.service.weather.info();
    ctx.response.body = result;
  }
}

module.exports = WeatherController;
