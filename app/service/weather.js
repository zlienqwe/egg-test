'use strict';

const Service = require('egg').Service;

class WeatherService extends Service {
  async info() {
    const { serverUrl, apiKey, cityCode } = this.config;
    const { data: { result: data, error_code: code } } = await this.ctx.curl(`${serverUrl}`, {
      method: 'POST',
      dataType: 'json',
      data: {
        key: apiKey,
        city: cityCode,
      },
    });

    return { data, code };
  }
}

module.exports = WeatherService;
