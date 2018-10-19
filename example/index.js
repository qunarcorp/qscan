const QScan = require('../src/index');
const Util = require('../src/util');

const q =  new QScan({
    modelOpts: {
        'wx-default': {
            udid: '3HX0217705004280',
            port: '4723',
            opts: {
                user: 'hqyqunar',
                pass: '910216hqy'
            }
        }
    }
});
const task = q.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
},
err => {
    console.log('run err', err);
});

// q.run({
//     modelName: 'wx-default',
//     type: 'ide-login-scan'
// },
// err => {
//     if (err) {
//         console.log(err);
//     }
// })
// setTimeout()

setTimeout(() => {
    if(task.stop) {
        task.stop()
    };
}, 4000);
