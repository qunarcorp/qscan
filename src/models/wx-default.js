const pkgJSON = require('../../package.json');
const CONST = require(`../const/wx_${pkgJSON.support_wx_version}`);
const shelljs = require('shelljs');

const waitTimeout = 10 * 1000;
const checkElTimeout = 3 * 1000;

module.exports = {
    // Model Name 默认的微信的配置
    name: 'wx-default',
    // 参数，包括用户名，密码等
    opts: {},
    // Appium 连接参数
    connectOpt: {
        platformName: 'Android',
        deviceName: '7PTS4TDAGM9DLNEU',
        appPackage: 'com.tencent.mm',
        appActivity: '.ui.LauncherUI',
        noReset: 'true',
        fullReset: 'false',
        fastReset: 'false'
    },
    // 等待超时时间
    waitTimeout,
    // 检测元素时间
    checkElTimeout,

    // 检查 App 是否是相应的版本等
    checkApp: cb => {
        const version = '6.7.0';
        // TODO
        setTimeout(() => {
            cb(null, true);
        }, 100);

        shelljs
            .exec('adb shell pm dump com.tencent.mm | grep "versionName"')
            .stdout(ret => {
                ret.match(/\w=([0-9]+)/)[1] !== version && cb(new Error('The app version is not right'));
            });
    },
    // 初始化 App，从打开、登录到主界面
    init: (app, opts) => {
        console.log('开始登录');

        return (
            app
                .setImplicitWaitTimeout(waitTimeout)
                .resetApp()
                .elementByXPath(CONST.INDEX_LOGIN_BTN.xpath)
                .click()
                .elementByXPath(CONST.USE_USER_AND_PASSWORD.xpath)
                .click()
                .elementByXPath(CONST.USERNAME_INPUT.xpath)
                .sendKeys(opts.user)
                .elementByXPath(CONST.PASSWORD_INPUT.xpath)
                .sendKeys(opts.pass)
                .elementByXPath(CONST.DO_LOGIN_BTN.xpath)
                .click()
                // 重新设置等待时间
                .setImplicitWaitTimeout(checkElTimeout)
                .elementByXPathIfExists(CONST.AB_YES.xpath, (err, el) => {
                    //通讯录弹窗是否存在, 存在则点击确定
                    if (el) {
                        el.click();
                    }
                })
                .setImplicitWaitTimeout(waitTimeout)
                .waitForElementByXPath(CONST.TAB_1.xpath)
        );
    },
    // 检查状态是否正确，包括登录的用户是指定用户等
    checkStatus: (app, opts, cb) => {
        console.log('检测登录状态');

        app.setImplicitWaitTimeout(checkElTimeout)
            .hasElementByXPath(CONST.TAB_4.xpath)
            .then(ret => {
                if (ret) {
                    console.log('已登录! 检测等账号是否一致');

                    app.elementByXPath(CONST.TAB_4.xpath)
                        .click()
                        .elementByXPath(CONST.WX_USERNAME.xpath)
                        .text()
                        .then(text => {
                            if (text === '微信号：' + opts.user) {
                                console.log('一致! 可扫码');
                                cb(null, true, app);
                            } else {
                                console.log('不一致! 重新登录');
                                cb(null, false);
                            }
                        })
                        .catch(err => {
                            cb(err);
                        });
                } else {
                    console.log('未登录');
                    cb(null, false);
                }
            })
            .catch(err => {
                cb(err);
            });
    },
    // 不同类型的扫码
    types: {
        // 开发者工具登录
        'ide-login-scan': (app, opts, cb) => {
            console.log('开发者工具: 开始扫码!');

            app.setImplicitWaitTimeout(waitTimeout)
                .waitForElementByXPath(CONST.THE_MORE_BTN.xpath)
                .click()
                .elementByXPath(CONST.THE_SCAN_BTN.xpath)
                .click()
                .waitForElementByXPath(CONST.MP_AFTER_SCAN.xpath)
                .click()
                .catch(e => {
                    cb(e);
                })
                .finally(() => {
                    cb(null);
                });
        },
        // 微信后台登录
        'backstage-login-scan': (app, opts, cb) => {
            console.log('微信后台: 开始扫码!');

            app.setImplicitWaitTimeout(waitTimeout)
                .waitForElementByXPath(CONST.THE_MORE_BTN.xpath)
                .click()
                .elementByXPath(CONST.THE_SCAN_BTN.xpath)
                .click()
                .waitForElementByXPath(CONST.IDE_AFTER_SCAN.xpath)
                .click()
                .catch(e => {
                    cb(e);
                })
                .finally(() => {
                    cb(null);
                });
        }
    }
};
