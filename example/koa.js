const Koa = require('Koa');
const app = new Koa();
const QScan = require('../src/index');

const customModel = {

};
const modelOpts = {
  'wx-default': {
    udid: '3HX0217705004280',
    port: '4723',
    opts: {
      user: 'socutur',
      pass: 'Wangle539264'
    }
  }
}

app.use(QScan.middleWare({
  customModel: 'wx-default',
  modelOpts
}));

app.use(async ctx => {
  ctx.body = `123`;
});

app.listen(9001, function () {
  console.log(`Port[9001] started! `);
});