module.exports = {
  INDEX_LOGIN_BTN: {
    name: '首页登录按钮',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/drp"]'
  },
  USE_USER_AND_PASSWORD: {
    name: '使用账号密码',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/ch5"]'
  },
  USERNAME_INPUT: {
    name: '账号输入框',
    xpath:
      '//android.widget.EditText[@resource-id="com.tencent.mm:id/ji"][@password="false"]'
  },
  PASSWORD_INPUT: {
    name: '密码输入框',
    xpath:
      '//android.widget.EditText[@resource-id="com.tencent.mm:id/ji"][@password="true"]'
  },
  DO_LOGIN_BTN: {
    name: '登录',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/ch6"]'
  },
  AB_YES: {
    name: '通讯录弹窗',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/au_"]'
  },
  TAB_1: {
    name: 'tab: 微信',
    xpath:
      '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bh"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[1]'
  },
  TAB_4: {
    name: 'tab: 我',
    xpath:
      '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bh"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[4]'
  },
  WX_USERNAME: {
    name: '微信号',
    xpath: '//android.widget.TextView[@resource-id="com.tencent.mm:id/czz"]'
  },
  THE_MORE_BTN: {
    name: '右上角加号',
    xpath: '//android.widget.RelativeLayout[@content-desc="更多功能按钮"]'
  },
  THE_SCAN_BTN: {
    name: '扫一扫',
    xpath:
      '//android.widget.LinearLayout[@resource-id="com.tencent.mm:id/jr"][@index=2]'
  },
  IDE_AFTER_SCAN: {
    name: 'ide扫码后确认',
    xpath: '//android.view.View[@content-desc="确认登录"]'
  },
  MP_AFTER_SCAN: {
    name: 'mp扫码后确认',
    xpath: '//android.view.View[@index=2]'
  }
};
