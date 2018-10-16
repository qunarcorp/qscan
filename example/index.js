const QScan = require('../src/index');

const scan = new QScan({
    customModel: {

    },
    modelOpts: {
        'wx-default': {
            udid: '7PTS4TDAGM9DLNEU00000000000000000',
            port: '4723',
            opts: {
                user: 'socutur00000000000000000',
                pass: 'Wangle53926400000000000000000'
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
