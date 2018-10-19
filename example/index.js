const QScan = require('../src/index');

const q =  new QScan({
    modelOpts: {
        'wx-default': {
            udid: '7PTS4TDAGM9DLNEU',
            port: '4723',
            opts: {
                user: 'xxxx',
                pass: 'xxxx'
            }
        }
    }
});
const task = q.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
},
err => {
    if (err) {
        console.log(err);
    }
});

<<<<<<< HEAD
=======
setTimeout(() => {
    if(task.stop) {
        task.stop()
    };
}, 5000);
>>>>>>> 3ab78bd4bd2c3e31638e90a6fe493430f87a4a60
