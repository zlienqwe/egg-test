'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async index() {
    const ctx = this.ctx;
    console.log('====================this================');
    console.log(this.app);
    console.log(ctx.isIOS);
    console.log(ctx.ips);
    console.log(ctx.ip);
    
    console.log('====================================');
    console.log(ctx.helper.relativeTime(1231231231));
    const result = await ctx.service.weather.info();
    ctx.response.body = result;
  }
}

module.exports = WeatherController;
