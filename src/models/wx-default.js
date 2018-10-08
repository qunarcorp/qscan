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
        appActivity: '.ui.LauncherUI'
    },
    // 等待超时时间
    waitTimeout: 3000,
    // 检查 App 是否是相应的版本等 
    checkApp: (cb) => {
        const version = '6.7.0';
        // TODO
        setTimeout(() => {
            cb(null, true);
        }, 100);
    },
    // 初始化 App，从打开、登录到主界面
    init: (app) => {
        return app;
    },
    // 检查状态是否正确，包括登录的用户是指定用户等
    checkStatus: (app, opts, cb) => {
        setTimeout(() => {
            cb(null, true);
        }, 100);
    },
    // 不同类型的扫码
    types: {
        // 开发者工具登录
        "ide-login-scan": (app, opts) => {
            return app;
        },
        // 微信后台登录
        "backstage-login-scan": (app, opts) => {
            return app;
        }
    }
};

