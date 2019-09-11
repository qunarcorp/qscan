const pkgJSON = require('../../package.json');
const CONST = require(`./bu_default_cfg/bu_${pkgJSON.support_bu_version}`);
const shelljs = require('shelljs');
const logger = require('../logger');
const path = require('path');
const fs = require('fs');

// 定位元素超时时间
const waitTimeout = 15 * 1000;
// 判断元素是否存在超时时间
const checkElTimeout = 5 * 1000;

module.exports = {
    // Model Name 默认的微信的配置
    name: 'bu-default',
    // 参数，包括用户名，密码等
    opts: {},
    // Appium 连接参数
    connectOpt: {
        platformName: 'Android',
        deviceName: 'Android',
        appPackage: 'com.baidu.searchbox',
        appActivity: '.MainActivity',
        noReset: 'true',
        autoGrantPermissions: 'true',
    },
    // 等待超时时间
    waitTimeout,
    // 检查 App 是否是相应的版本等
    checkApp: (cb, udid) => {
        const version = pkgJSON.support_bu_version;
        console.log(udid);
        let currentVersion = shelljs
            .exec(`adb -s ${udid} shell pm dump com.baidu.searchbox | grep "versionName"`, {
                silent: true,
            })
            .stdout.trim();

        currentVersion = currentVersion && currentVersion.match(/\w=([0-9.]+)/)[1];

        if (!currentVersion || currentVersion !== version) {
            cb(`Need baidu-${version}, please install manually `);
        } else {
            logger.success('The app version is ok');
            cb(null);
        }
    },

    // 检查状态是否正确，包括登录的用户是指定用户等
    checkStatus: (app, opts, cb) => {
        logger.await('启动中...');
        app.setImplicitWaitTimeout(checkElTimeout).waitForElementById(CONST.SEARCH_BOX.id);
        cb(null, app);
    },
    // 不同类型的扫码
    types: {
        // 后台登录
        'backstage-login-scan': (app, opts, cb) => {
            logger.info('扫码类型: 百度后台');

            return app
                .setImplicitWaitTimeout(waitTimeout)
                .elementByXPath(CONST.CAMERA_PATH.xpath)
                .click()
                .waitForElementByXPath(CONST.MP_AFTER_SCAN.xpath)
                .click();
        },
    },
};
