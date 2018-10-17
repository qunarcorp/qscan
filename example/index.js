const QScan = require('../src/index');
const wx = require('../src/models/wx-default');

const scan = new QScan({
    modelOpts: {
        'wx-default': {
            udid: '3HX0217705004280',
            port: '4723',
            opts: {
                user: '******',
                pass: '******'
            }
        }
    }
});

// scan.clone({
//     newModelName: 'another-model',
//     oldModelName: 'wx-default',
//     opts: {}
// // });

// scan.doctor(err => {
//     if (err) {
//         console.log(err);
//     }
// });

 
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
