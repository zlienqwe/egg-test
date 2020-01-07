/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    apiKey: '1826118766e6650a68d87fa1ece50512qefssfrew',
    serverUrl: 'http://apis.juhe.cn/simpleWeather/query',
    cityCode: 3,
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
    },
    security: {
      domainWhiteList: [ 'http://localhost:8081', 'http://localhost:3000' ],
    },
    cors: {
      credentials: true,
      origin: '*',
    },
    session: {
      key: 'EGG_SESS',
      maxAge: 10 * 1000, // 单位毫秒
      httpOnly: true,
      encrypt: true,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576592209746_8828';

  // add your middleware config here
  config.middleware = ['gzip'];

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'work123',
      // 数据库名
      database: 'microblog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  const logger = {
    dir: `${appInfo.baseDir}/log/dir`,
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };


  return {
    ...config,
    ...userConfig,
    ...logger,
  };
};
