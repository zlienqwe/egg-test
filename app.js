'use strict';

module.exports = app => {
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
    ctx.logger.info('request: ', ctx.request.body);
  });
  app.on('response: ', ctx => {
    // ctx.starttime is set by framework
    ctx.logger.info('response: ', ctx.starttime);
    const used = Date.now() - ctx.starttime;
    ctx.logger.info('response used: ', used);
    // log total cost
  });
};
