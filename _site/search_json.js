window.ydoc_plugin_search_json = {
  "文档": [
    {
      "title": "简介",
      "content": "QScan 是一个高度可定制的扫码工具，基于 appium，可灵活配置。QScan 提供了一个纯粹的自动扫码功能，它可以作为 node 的一个模块使用、作为 koa/express 的一个中间件使用，因此使用起来非常灵活。",
      "url": "/documents/index.html",
      "children": [
        {
          "title": "案例",
          "url": "/documents/index.html#案例",
          "content": "案例"
        }
      ]
    },
    {
      "title": "安装",
      "content": "使用 QScan 需要预先准备若干设备并安装一些工具",
      "url": "/documents/install.html",
      "children": [
        {
          "title": "安装工具",
          "url": "/documents/install.html#安装工具",
          "content": "安装工具QScan 依赖以下设备和工具：\n\n设备\n版本\n\n\n\n\nmacOS 设备\n>=v8.0\n\n\nAndroid 设备\n>=v4.4\n\n\n\n\n工具\n版本\n\n\n\n\nNode\n>=v8.0\n\n\nAppium\n最新版本\n\n\nAndroid 设备安装的微信应用\nv6.7.2\n\n\n"
        },
        {
          "title": "1. 安装 Node.js",
          "url": "/documents/install.html#安装工具-1.-安装-node.js",
          "content": "1. 安装 Node.js方案一: 从 Node.js 官网下载安装包方案二: 使用 Node Version Manager(NVM) 安装 Node.js，你可以通过以下命令安装 NVM :cURL:$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bashWget:$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bashNVM 安装好以后，重启终端并运行以下命令来安装 Node.js :nvm install stable"
        },
        {
          "title": "2. 安装 Appium",
          "url": "/documents/install.html#安装工具-2.-安装-appium",
          "content": "2. 安装 Appium请按照这篇教程进行安装：Mac 上安装 Appium 详解"
        },
        {
          "title": "3. Android 设备安装微信应用",
          "url": "/documents/install.html#安装工具-3.-android-设备安装微信应用",
          "content": "3. Android 设备安装微信应用安装 v6.7.2 版本的微信"
        },
        {
          "title": "安装 QScan",
          "url": "/documents/install.html#安装-qscan",
          "content": "安装 QScan"
        },
        {
          "title": "使用 NPM 安装 QScan",
          "url": "/documents/install.html#安装-qscan-使用-npm-安装-qscan",
          "content": "使用 NPM 安装 QScannpm install qscan [-g]安装完成后执行 qscan 即可查看命令：Usage: qscan [options] [command]\nOptions:\n  -v, --version     output the version number\n  -h, --help        output usage information\n\nCommands:\n  doctor [options]  检查运行环境\n  scan [options]    扫描二维码\n  serve [options]   启动自助二维码扫描服务\n"
        }
      ]
    },
    {
      "title": "使用教程",
      "content": "为了保证核心代码的纯粹，我们只提供最纯粹的自动扫码功能。QScan 可以作为一个 node 模块使用，也可以作为一个 koa/express 中间件使用，因此使用起来非常灵活 ~",
      "url": "/documents/usage.html",
      "children": [
        {
          "title": "作为 node 模块使用",
          "url": "/documents/usage.html#作为-node-模块使用",
          "content": "作为 node 模块使用const QScan = require('qscan'); // 引入 qscan 工具\n// 实例化一个 scan 对象\nconst scan = new QScan({\n    // model 配置\n    modelOpts: {\n        'wx-default': { // model 名称\n            udid: 'HICMHMZTTW8DFI59', // 安卓设备 id，通过 adb service 命令查看\n            port: '4723', // 端口号\n            opts: {\n                user: 'xxx', // 微信用户名\n                pass: 'xxx' // 微信密码\n            }\n        }\n    }\n});\n\n// 执行扫码\nscan.run(\n    {\n        modelName: 'wx-default', // model 名称\n        type: 'ide-login-scan' // 扫码类型\n    },\n    err => {\n        if (err) {\n            console.log(err); // 错误信息处理\n        }\n    }\n);\n\n"
        },
        {
          "title": "作为 koa/express 的中间件使用",
          "url": "/documents/usage.html#作为-koaexpress-的中间件使用",
          "content": "作为 koa/express 的中间件使用const Koa = require('Koa');const app = new Koa();\nconst QScan = require('qscan');\n\n// model 配置\nconst modelOpts = {\n    'wx-default': { // model 名称\n        udid: '3HX0217705004280',  // 安卓设备 id，通过 adb service 命令查看\n        port: '4723', // 端口号\n        opts: {\n            user: 'xxx', // 微信用户名\n            pass: 'xxx' // 微信密码\n        }\n    }\n}\n\n// 使用 QScan 的中间件，传入 model 名称与选项\napp.use(QScan.middleWare({\n    customModel: 'wx-default', // 配置 model 名称\n    modelOpts // 传入 model 选项\n}));\n\napp.listen(9001, function () {\n    console.log(`Port[9001] started! `);\n});\n"
        }
      ]
    }
  ]
}