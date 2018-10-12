const QScan = require('../src/index');

const scan = new QScan({
    modelOpts: {
        'wx-default': {
            udid: '3HX0217705004280',
            port: '4723',
            opts: {
                user: 'connorj',
                pass: 'connorj.'
            }
        }
    }
});

scan.run(
    {
        modelName: 'wx-default',
        type: 'ide-login-scan'
    },
    err => {
        if (err) {
            console.log(err);
        }
    }
);
