const QScan = require('../src/index');

const scan = new QScan({
    modelOpts: {
        'wx-default': {
            udid: 'xxx',
            port: '4723',
            opts: {
                user: 'xxx',
                pass: 'xxx'
            }
        }
    }
});

scan.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
}, (err) => {
    
});
