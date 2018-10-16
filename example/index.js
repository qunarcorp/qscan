const QScan = require('../src/index');

const scan = new QScan({
    customModel: {

    },
    modelOpts: {
        'wx-default': {
            udid: 'a1b9160',
            port: '4723',
            opts: {
                user: '15311512923',
                pass: '910216hqy'
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
