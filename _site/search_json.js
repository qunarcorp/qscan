window.ydoc_plugin_search_json = {
  "文档": [
    {
      "title": "简介",
      "content": "QScan 是一个高度可定制的扫码工具，基于 Appium，可灵活配置。QScan 提供了一个纯粹的自动扫码功能，它可以直接使用命令行调用，也可以作为一个 Node 模块使用，，因此使用起来非常灵活。",
      "url": "/documents/index.html",
      "children": [
        {
          "title": "如何使用",
          "url": "/documents/index.html#如何使用",
          "content": "如何使用安装依赖: 使用 QScan 需要预先准备若干设备并安装一些工具\n使用教程: 具体的使用方式\n"
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
          "content": "使用 NPM 安装 QScan全局安装npm install qscan [-g]安装完成后即可通过命令行调用，执行 qscan -v 查看 QScan 版本项目中安装npm install qscan [--save-dev]作为项目依赖安装，可以通过模块方式引入"
        }
      ]
    },
    {
      "title": "教程",
      "content": "为了保证核心代码的纯粹，我们只提供最纯粹的自动扫码功能。QScan 可以直接使用命令行调用，也可以作为一个 Node 模块使用，使用起来非常灵活 ~",
      "url": "/documents/course.html",
      "children": [
        {
          "title": "配置",
          "url": "/documents/course.html#配置",
          "content": "配置QScan 扫码需要一个配置，这个配置可以写在 ~/.qscanrc 文件中，也可以写在代码中，这个配置的格式如下：{    \"wx-default\": { // key 值为 Modal 名称\n        \"udid\": \"HICMHMZTTW8DFI59\", // 安卓设备 id，通过 adb service 命令查看\n        \"port\": \"4723\", // 端口号\n        \"opts\": {\n            \"user\": \"xxx\", // 微信用户名\n            \"pass\": \"xxx\" // 微信密码\n        },\n        \"checkApp\": false // 校验是否安装微信 APP 及其版本\n    }\n}\n注意：微信用户名必需使用微信号，禁止使用手机号QScan 官方提供 Modal，指定 扫码模式，目前只支持微信扫码："
        },
        {
          "title": "wx-default (微信扫码)",
          "url": "/documents/course.html#配置-wx-default-微信扫码",
          "content": "wx-default (微信扫码)\n\ntype 名称\n功能\n\n\n\n\nide-login-scan\n开发者工具登录\n\n\nbackstage-login-scan\n微信后台登录\n\n\n除此之外，你还可以开发自己的 扫码模式： 自定义模式"
        },
        {
          "title": "调用方式",
          "url": "/documents/course.html#调用方式",
          "content": "调用方式"
        },
        {
          "title": "命令行调用",
          "url": "/documents/course.html#调用方式-命令行调用",
          "content": "命令行调用全局安装 QScan 后即可使用命令行调用，现在支持三个命令：Commands:  doctor [options]  检查运行环境\n  scan [options]    扫描二维码\n1. qscan doctor 检查运行环境Options:  -c, --customModel   自定义模式路径，默认为空\n  -r, --runConfig       运行配置绝对路径，默认为 ~/.qscanrc\n  -h, --help                       output usage information\n配置好 ~/.qscanrc 后，执行：qscan doctor2. qscan scan 扫描二维码Options:  -c, --customModel   自定义模式路径，默认为空\n  -r, --runConfig       运行配置，默认为 ~/.qscanrc\n  -m, --model               使用的扫码模式\n  -t, --type                 使用的扫码类型\n  -h, --help                       output usage information\n配置好 ~/.qscanrc 后，执行：qscan scan -m 'wx-default' -t 'ide-login-scan'"
        },
        {
          "title": "作为 node 模块使用",
          "url": "/documents/course.html#调用方式-作为-node-模块使用",
          "content": "作为 node 模块使用const QScan = require('qscan'); // 引入 qscan 工具\n// 实例化一个 scan 对象\nconst scan = new QScan({\n    // model 配置\n    modelOpts: {\n        'wx-default': { // model 名称\n            udid: 'HICMHMZTTW8DFI59', // 安卓设备 id，通过 adb service 命令查看\n            port: '4723', // 端口号\n            opts: {\n                user: 'xxx', // 微信用户名\n                pass: 'xxx' // 微信密码\n            }\n        }\n    }\n});\n我们实例化一个 QScan 对象，取名为 scan，这个对象有如下方法：scan.run({ modelName, type }, cb) 扫描二维码:scan.run(    {\n        modelName: 'wx-default', // model 名称\n        type: 'ide-login-scan' // 扫码类型\n    },\n    err => {\n        if (err) {\n            console.log(err); // 错误信息处理\n        }\n    }\n);\nscan.doctor(cb) 检查环境:scan.doctor(err => {    if (err) {\n        console.log(err);\n    }\n});\nscan.clone({ newModelName, oldModelName, opts }) 拷贝一份 Model，可以用 opts 对象覆盖一部分属性:scan.clone({    newModelName: 'another-model',\n    oldModelName: 'wx-default',\n    opts: {}\n});\nscan.loadModel({ model, udid, port, opts }) 自定义传入的 Model：const myModel = require('./myModel.js');scan.loadModel({\n    model: myModel,\n    udid: '3HX0217705004280',\n    port: '4723',\n    opts: {\n        user: 'xxx',\n        pass: 'xxx'\n    }\n});\n"
        },
        {
          "title": "自定义模式",
          "url": "/documents/course.html#自定义模式",
          "content": "自定义模式QScan 提供了自定义模式，用户可以参考 QScan 的微信扫码 Model 编写自己的模式 (Model)看完了教程后，你对 QScan 已经有了大致的了解，可以开始尝试使用了：方案"
        }
      ]
    }
  ],
  "方案": [
    {
      "title": "开始之前",
      "content": "在开始之前，请确定已经准备好了下列设备和账号：一台 macOS 的设备，苹果电脑\n一台安卓设备，推荐使用红米5\n一个懒人支架，或者其他能够固定扫码设备的装置\n一个微信账号，由于用于扫码，因此最好是不常用的账号或小号（微信号首次登录新设备时，需要手动进行身份验证）\n",
      "url": "/usage/index.html",
      "children": [
        {
          "title": "验证环境",
          "url": "/usage/index.html#验证环境",
          "content": "验证环境设备准备好之后，请 务必 准备好下列软硬件环境：1. 手机状态 关闭锁屏，关闭自动息屏，息屏状态无法唤起 Appium 扫码\n 开启开发者模式\n 将手机与电脑相连，并将手机固定在电脑前\n2. 微信状态 确认账号是可登陆状态，首次登陆需要进行身份验证\n 禁用 X5 内核: 在微信中打开 debugtbs.qq.com, 在 tbs 调试页面中禁用内核（这是因为 Appium 无法获取基于 X5 内核页面中的元素，也就无法完成点击操作）\n3. 物理环境 确保扫码的环境不会出现强烈的光照或其他遮挡物，光照会引起反光影响扫码\n 尽量保证扫码设备不被人为干扰，例如使用围栏、警示标语等\n4. QScan 环境 阅读 配置 ，写好配置后使用 doctor 命令检查运行环境\n"
        }
      ]
    },
    {
      "title": "快速起步",
      "content": "确定你已经 验证环境 之后，这里是一个最简案例：使用 QScan 扫码登录微信开发者工具，使用命令行的方式调用扫码服务，请安装\b 微信开发者工具，",
      "url": "/usage/quickstart.html",
      "children": [
        {
          "title": "填写配置",
          "url": "/usage/quickstart.html#填写配置",
          "content": "填写配置编辑 ~/.qscanrc 文件，填写配置vi ~/.qscanrc{    \"wx-default\": { // key 值为 Modal 名称\n        \"udid\": \"HICMHMZTTW8DFI59\", // 安卓设备 id，通过 adb service 命令查看\n        \"port\": \"4723\", // 端口号，这里设置为 4723\n        \"opts\": {\n            \"user\": \"xxx\", // 微信用户名\n            \"pass\": \"xxx\" // 微信密码\n        },\n        \"checkApp\": true // 校验是否安装微信 APP 及其版本 \n    }\n}\n"
        },
        {
          "title": "检查运行环境",
          "url": "/usage/quickstart.html#检查运行环境",
          "content": "检查运行环境全局安装 QScan 后，执行 qscan doctor 检测上面的配置，确保所有的输出都是 ✔ SUCCESS"
        },
        {
          "title": "打开微信开发者工具",
          "url": "/usage/quickstart.html#打开微信开发者工具",
          "content": "打开微信开发者工具打开微信开发者工具的登录页，调整好位置，等待被扫码"
        },
        {
          "title": "执行扫码服务",
          "url": "/usage/quickstart.html#执行扫码服务",
          "content": "执行扫码服务执行下列代码，分别是指定的 Model 为 QScan 提供的微信扫码服务，type 类型为 ide-login-scan (微信开发者工具)qscan scan -m wx-default -t ide-login-scan可以看到手机上面自动登录并扫码成功，同时你可以在终端中看到对应的输出日志。一个最简单的扫码服务就跑起来了，除了使用命令行，你还可以使用 node 模块调用 QScan，由于 QScan 的核心代码比较纯粹，因此你可以发挥想象力，将它应用在你的业务场景中。我们结合 Qunar 的实际应用场景，提供了一些使用方案，你可以在这里了解 QScan 的使用思路。"
        }
      ]
    },
    {
      "title": "使用方案",
      "content": "这里列举一些使用方案的案例，你可以在这里了解 QScan 的使用思路。",
      "url": "/usage/scheme.html",
      "children": [
        {
          "title": "多台手机扫码",
          "url": "/usage/scheme.html#多台手机扫码",
          "content": "多台手机扫码单台设备扫码使用场景：单台设备进行无人值守的扫码，多人调用的时候 QScan 程序将多次调用组成队列。使用方式：见 快速起步多台手机扫各自的码使用场景：多台设备扫码，每台设备可以专门扫各自的码，避免混乱。使用方式：需要配置多个配置文件，或者多个对象。分别调用，互不影响"
        },
        {
          "title": "搭建扫码服务器",
          "url": "/usage/scheme.html#搭建扫码服务器",
          "content": "搭建扫码服务器搭建扫码服务，在 Node 服务中，以模块的形式引入 QScan 使用。服务接收网络请求后，并通过 api 的方式调用手机扫码。"
        }
      ]
    }
  ],
  "常见问题": [
    {
      "title": "常见问题",
      "content": "",
      "url": "/experience/index.html",
      "children": [
        {
          "title": "超时问题",
          "url": "/experience/index.html#超时问题",
          "content": "超时问题请使用使用较新的安卓手机：由于市场上的安卓设备碎片化严重，建议使用 Android 4.4版本以上的、性能较好的安卓手机，性能差的手机打开微信速度较慢，Appium 调用设备的时候可能经常遇到超时问题。如果你在使用中遇到问题，请在 github 上面提出 Issue"
        }
      ]
    }
  ]
}