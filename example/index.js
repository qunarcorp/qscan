const QScan = require('../src/index');
const Util = require('../src/util');

const q = new QScan({
    modelOpts: {
        'wx-default': {
            udid: '7PTS4TDAGM9DLNEU',
            port: '4723',
            opts: {
                user: '###',
                pass: '###'
            }
        }
    }
});
const task = q.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
},
err => {
    console.log(err);
});

// let tast2 = null;
// setTimeout(() => {
//     tast2 = q.run({
//         modelName: 'wx-default',
//         type: 'ide-login-scan'
//     },
//     err => {
//         console.log('run err', err);
//     });
// }, 2000);

// setTimeout(() => {
//     task.stop();
// }, 100);

// tast2 = q.run({
//     modelName: 'wx-default',
//     type: 'ide-login-scan'
// },
// err => {
//     console.log('第二个任务结束');
// });

setTimeout(() => {
    task.stop();

}, 4000);