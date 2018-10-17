const QScan = require('../src/index');
const wx = require('../src/models/wx-default');

const scan = new QScan({
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

scan.clone({
    newModelName: 'another-model',
    oldModelName: 'wx-default',
    opts: {}
});

// scan.loadModel({
//     model: wx,
//     udid: '123456',
//     port: '4723',
//     opts: {
//         user: 'xxx',
//         pass: 'xxx'
//     }
// });


scan.doctor(err => {
    if (err) {
        console.log(err);
    }
});


scan.run(
    {
        modelName: 'another-model',
        type: 'ide-login-scan'
    },
    err => {
        if (err) {
            console.log(err);
        }
    }
);
