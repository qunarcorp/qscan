module.exports = {
    INDEX_LOGIN_BTN: {
        name: '首页登录按钮',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/dbe"]'
    },
    USE_USER_AND_PASSWORD: {
        name: '使用账号密码',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/c5p"]'
    },
    USERNAME_INPUT: {
        name: '账号输入框',
        xpath:
            '//android.widget.EditText[@resource-id="com.tencent.mm:id/jd"][@password="false"]'
    },
    PASSWORD_INPUT: {
        name: '密码输入框',
        xpath:
            '//android.widget.EditText[@resource-id="com.tencent.mm:id/jd"][@password="true"]'
    },
    DO_LOGIN_BTN: {
        name: '登录',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/c5q"]'
    },
    ALERT_OK: {
        name: '弹窗',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/apj"]'
    },
    TAB_1: {
        name: 'tab: 微信',
        xpath:
            '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bg"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[1]'
    },
    TAB_4: {
        name: 'tab: 我',
        xpath:
            '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bg"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[4]'
    },
    WX_USERNAME: {
        name: '微信号',
        xpath: '//android.widget.TextView[@resource-id="com.tencent.mm:id/cl8"]'
    },
    THE_MORE_BTN: {
        name: '右上角加号',
        xpath: '//android.widget.RelativeLayout[@content-desc="更多功能按钮"]'
    },
    THE_SCAN_BTN: {
        name: '扫一扫',
        xpath:
            '//android.widget.LinearLayout[@resource-id="com.tencent.mm:id/jm"][@index=2]'
    },
    IDE_AFTER_SCAN: {
        name: 'ide扫码后确认',
        xpath: '//android.view.View[@text="确认登录"]'
    },
    MP_AFTER_SCAN: {
        name: 'mp扫码后确认',
        xpath: '//android.view.View[@resource-id="js_allow"]'
    },
    LAST_WX_USERNAME: {
        name: '上一次登录的微信号',
        xpath: '//android.widget.TextView[@resource-id="com.tencent.mm:id/c5n"]'
    },
    THE_LIST: {
        name: '列表',
        xpath: '//android.widget.ListView[@resource-id="android:id/list"]'
    },
    THE_LIST_ELS: {
        name: '列表内所有元素',
        xpath:
            '//android.widget.ListView[@resource-id="android:id/list"]/android.widget.LinearLayout'
    },
    SETTING_EXIT: {
        name: '设置: 退出登录',
        xpath:
            '//android.support.v7.widget.RecyclerView[@resource-id="com.tencent.mm:id/chl"]/android.widget.LinearLayout[1]'
    },
    LOGIN_MORE: {
        name: '登录: 更多',
        xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/c5x"]'
    },
    LOGIN_OTHER: {
        name: '登录: 登录其他账号',
        xpath:
            '//android.support.v7.widget.RecyclerView[@resource-id="com.tencent.mm:id/chl"]/android.widget.LinearLayout[1]'
    }
};
