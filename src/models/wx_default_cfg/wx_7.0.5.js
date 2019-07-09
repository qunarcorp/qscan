module.exports = {
    INDEX_LOGIN_BTN: {
        name: '首页登录按钮',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/ecv"]',
    },
    USE_USER_AND_PASSWORD: {
        name: '使用账号密码',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/cum"]',
    },
    USERNAME_INPUT: {
        name: '账号输入框',
        xpath: '//android.widget.EditText[@resource-id="com.tencent.mm:id/lh"][@password="false"]',
    },
    PASSWORD_INPUT: {
        name: '密码输入框',
        xpath: '//android.widget.EditText[@resource-id="com.tencent.mm:id/lh"][@password="true"]',
    },
    DO_LOGIN_BTN: {
        name: '登录',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/cun"]',
    },
    ALERT_OK: {
        name: '弹窗',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/b1v"]',
    },
    TAB_1: {
        name: 'tab: 微信',
        xpath:
            '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bq"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[1]',
    },
    TAB_4: {
        name: 'tab: 我',
        xpath:
            '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bq"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[4]',
    },
    WX_USERNAME: {
        name: '微信号',
        xpath: '//android.widget.TextView[@resource-id="com.tencent.mm:id/dhb"]',
    },
    THE_MORE_BTN: {
        name: '右上角加号',
        xpath: '//android.widget.RelativeLayout[@content-desc="更多功能按钮"]',
    },
    THE_SCAN_BTN: {
        name: '扫一扫',
        xpath: '//android.widget.LinearLayout[@resource-id="com.tencent.mm:id/lp"][@index=2]',
    },
    IDE_AFTER_SCAN: {
        name: 'ide扫码后确认',
        xpath: '//android.view.View[@content-desc="确认登录" or @text="确认登录"]',
    },
    MP_AFTER_SCAN: {
        name: 'mp扫码后确认',
        xpath: '//android.view.View[@content-desc="确定 " or @text="确定 "]',
    },
    LAST_WX_USERNAME: {
        name: '上一次登录的微信号',
        xpath: '//android.widget.TextView[@resource-id="com.tencent.mm:id/cuk"]',
    },
    THE_LIST: {
        name: '列表',
        xpath: '//android.widget.ListView[@resource-id="android:id/list"]',
    },
    THE_LIST_ELS: {
        name: '列表内所有元素',
        xpath: '//android.widget.ListView[@resource-id="android:id/list"]/android.widget.LinearLayout',
    },
    SETTING_EXIT: {
        name: '设置: 退出登录弹窗',
        xpath:
            '//android.support.v7.widget.RecyclerView[@resource-id="com.tencent.mm:id/dcp"]/android.widget.LinearLayout[1]',
    },
    LOGIN_MORE: {
        name: '登录: 更多',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/cut"]',
    },
    LOGIN_OTHER: {
        name: '登录: 登录其他账号',
        xpath:
            '//android.support.v7.widget.RecyclerView[@resource-id="com.tencent.mm:id/dcp"]/android.widget.LinearLayout[1]',
    },
    WAIT_FINISHED: {
        name: '等待启动完成(待登录的背景)',
        xpath: '//android.view.View[@resource-id="com.tencent.mm:id/ke"]',
        id: 'com.tencent.mm:id/ke',
    },
    PROGRESS_BAR: {
        name: '加载框进度条',
        xpath: '//android.widget.ProgressBar[@resource-id="com.tencent.mm:id/a87"]',
    },
    PUBLISH_SCAN: {
        name: '通过审核上线',
        xpath: '//android.view.View[@content-desc="确定 " or @text="确定 "]',
    }
};
