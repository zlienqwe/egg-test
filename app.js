'use strict';

// module.exports = app => {
//   app.once('server', server => {
//     // websocket
//   });
//   app.on('error', (err, ctx) => {
//     // report error
//   });
//   app.on('request', ctx => {
//     // log receive request
//     ctx.logger.info('request: ', ctx.request.body);
//   });
//   app.on('response: ', ctx => {
//     // ctx.starttime is set by framework
//     ctx.logger.info('response: ', ctx.starttime);
//     const used = Date.now() - ctx.starttime;
//     ctx.logger.info('response used: ', used);
//     // log total cost
//   });
// };


// app.js 或 agent.js 文件：
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
  }

  async willReady() {
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。
  }
}

module.exports = AppBootHook;
