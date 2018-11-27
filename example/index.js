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

q.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
}, err => {
    console.log(err);
});