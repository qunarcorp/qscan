const QScan = require('../src/index');
const Queue = require('queue');

const scan = new QScan({
    modelOpts: {
        'wx-default': {
            port: '4723',
            udid: '7PTS4TDAGM9DLNEU',
            opts: {
                user: 'xxx',
                pass: 'xxx'
            },
            connectOpt: {
                platformName: 'Android',
                deviceName: '7PTS4TDAGM9DLNEU',
                appPackage: 'com.tencent.mm',
                appActivity: '.ui.LauncherUI'
            }
        }
    }
});

scan.doctor();
// scan.run({
//     modelName: 'wx-default',
//     type: 'ide-login-scan'
// }, (err) => {
//     console.log('example example index index',err);
// });