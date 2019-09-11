const QScan = require('../src/index');
const Util = require('../src/util');

const q = new QScan({
    modelOpts: {
        'bu-default': {
            udid: 'd51d5015',
            port: '4723',
            opts: {
                user: '###',
                pass: '###'
            }
        }
    }
});

q.run({
    modelName: 'bu-default',
    type: 'backstage-login-scan'
}, err => {
    console.log(err);
});