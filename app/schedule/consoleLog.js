'use strict';

module.exports = app => {
  console.log('ooooooooooooooooo');
  console.log(app);
  return {
    schedule: {
      immediate: true,
      interval: '10s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      console.log('=============schedule=======================');
      console.log('ppppppppppppppp');
      console.log('====================================');
    },
  };
};
