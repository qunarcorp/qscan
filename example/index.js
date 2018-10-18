const QScan = require('../src/index');
const wx = require('../src/models/wx-default');

const q =  new QScan({
    modelOpts: {
        'wx-default': {
            udid: '3HX0217705004280',
            port: '4723',
            opts: {
                user: '15311512923',
                pass: '910216hqy'
            }
        }
    }
});
q.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
},
err => {
    if (err) {
        console.log(err);
    }
});

const q2 = new QScan({
    modelOpts: {
        'wx-default': {
            udid: 'a1b9160',
            port: '4725',
            opts: {
                user: 'connorj',
                pass: 'connorj..2'
            }
        }
    }
});
q2.run({
    modelName: 'wx-default',
    type: 'ide-login-scan'
},
err => {
    if (err) {
        console.log(err);
    }
});

setTimeout(() => {
    q1.abort();    
}, 2000);
// const scan2 = new QScan({
//     modelOpts: {
//         'wx-default': {
//             udid: '3HX0217705004280',
//             port: '4724',
//             opts: {
//                 user: 'connorj',
//                 pass: 'connorj..2'
//             }
//         }
//     }
// })
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

// setTimeout(function() {
//     scan.abort()
// }, 2000);

 
// scan.run(
//     {
//         modelName: 'wx-default',
//         type: 'ide-login-scan'
//     },
//     err => {
//         if (err) {
//             console.log(err);
//         }
//     }
// );

// scan2.run({
//     modelName: 'wx-default',
//     type: 'ide-login-scan'
// },
// err => {
//     if (err) {
//         console.log(err);
//     }
// })