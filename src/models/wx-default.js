const pkgJSON = require('../../package.json');
const CONST = require(`./wx_default_cfg/wx_${pkgJSON.support_wx_version}`);
const shelljs = require('shelljs');
const logger = require('../logger');
const path = require('path');
const fs = require('fs');

const waitTimeout = 30 * 1000;
const checkElTimeout = 10 * 1000;

module.exports = {
    // Model Name 默认的微信的配置
    name: 'wx-default',
    // 参数，包括用户名，密码等
    opts: {},
    // Appium 连接参数
    connectOpt: {
        platformName: 'Android',
        deviceName: 'Android',
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
    checkApp: (cb, udid) => {
        const version = pkgJSON.support_wx_version;
        let currentVersion = shelljs
            .exec(`adb -s ${udid} shell pm dump com.tencent.mm | grep "versionName"`, {
                silent: true
            })
            .stdout.trim();
        // TODO
        currentVersion = currentVersion && currentVersion.match(/\w=([0-9.]+)/)[1];
        if (!currentVersion || currentVersion !== version) {
            logger.warn(`Need version-${version} wechat app`);
            logger.info(`installing ${version} wechat...`);
            // install wx 6.7.2
            const apksPath = path.join(__dirname, '../apks'),
                apkLinePath =
                    'http://yapkwww.cdn.anzhi.com/data4/apk/201808/20/21134e06c366c63faace92226d3124bb_29305400.apk';

            if (!fs.existsSync(`${apksPath}/wx672.apk`)) {
                shelljs.exec(`mkdir ${apksPath}`);
                shelljs.exec(`curl -o ${apksPath}/wx672.apk  ${apkLinePath}`);
            }

            if(currentVersion > version) {
                shelljs.exec(`adb -s ${udid} uninstall com.tencent.mm`, {silent: true}, (code, stdout, stderr) =>  {
                    if(stderr) {
                        cb(`Can Not Uninstall wechat-${currentVersion}, please uninstall manually`);
                    }
                })
            }

            if (
                shelljs.exec(`adb -s ${udid} install -r ${apksPath}/wx672.apk`, {
                    silent: true
                }).code === 0
            ) {
                logger.success(`install wechat-${version} success`);
                cb(null);
            } else {
                cb(`Need wechat-${version}, please install manually `);
            }
        } else {
            logger.success('The app version is ok');
            cb(null);
        }
    },
    // 初始化 App，从打开、登录到主界面
    init: (app, opts) => {
        logger.primary('开始登录');

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
                    // 通讯录弹窗是否存在, 存在则点击确定
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
        logger.primary('检测登录状态');

        app.setImplicitWaitTimeout(checkElTimeout)
            .elementByXPathIfExists(CONST.TAB_4.xpath, (err, el) => {
                if (el) {
                    logger.info('已登录! 检测等账号是否一致');

                    el.click()
                        .elementByXPath(CONST.WX_USERNAME.xpath)
                        .text()
                        .then(text => {
                            if (text === '微信号：' + opts.user) {
                                logger.success('一致! 可扫码');
                                cb(null, true, app);
                            } else {
                                logger.warn('不一致! 重新登录');
                                cb(null, false);
                            }
                        })
                        .catch(err => {
                            cb(err);
                        });
                } else {
                    logger.warn('未登录');
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
            logger.info('扫码类型: 开发者工具');

            return app
                .setImplicitWaitTimeout(waitTimeout)
                .waitForElementByXPath(CONST.THE_MORE_BTN.xpath)
                .click()
                .elementByXPath(CONST.THE_SCAN_BTN.xpath)
                .click()
                .waitForElementByXPath(CONST.IDE_AFTER_SCAN.xpath)
                .click();
        },
        // 微信后台登录
        'backstage-login-scan': (app, opts, cb) => {
            logger.info('扫码类型: 微信后台');

            return app
                .setImplicitWaitTimeout(waitTimeout)
                .waitForElementByXPath(CONST.THE_MORE_BTN.xpath)
                .click()
                .elementByXPath(CONST.THE_SCAN_BTN.xpath)
                .click()
                .waitForElementByXPath(CONST.MP_AFTER_SCAN.xpath)
                .click();
        }
    }
};
