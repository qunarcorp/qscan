# 使用教程

为了保证核心代码的纯粹，我们只提供最纯粹的自动扫码功能。

QScan 可以作为一个 Node 模块使用，也可以作为一个 koa/express 中间件使用，因此使用起来非常灵活 ~

## 配置

QScan 扫码需要一个配置，这个配置可以写在 ```~/.qscanrc``` 文件中，也可以写在代码中，这个配置的格式如下：

``` json
{
    "wx-default": { // key 值为 Modal 名称
        "udid": "HICMHMZTTW8DFI59", // 安卓设备 id，通过 adb service 命令查看
        "port": "4723", // 端口号
        "opts": {
            "user": "xxx", // 微信用户名
            "pass": "xxx" // 微信密码
        },
        "checkApp": false // 校验是否安装微信 APP
    }
}
```

QScan 官方提供 Modal，指定 **扫码模式**，目前只支持微信扫码：

### wx-default (微信扫码)
|type 名称   | 功能 |
|-----------|------ |
|ide-login-scan | 开发者工具登录 |
|backstage-login-scan | 微信后台登录 |

除此之外，你还可以开发自己的 **扫码模式**： [自定义模式](usage.md#自定义模式)

## 调用方式

### 命令行调用
全局安装 QScan 后即可使用命令行调用，现在支持三个命令：

``` bash
Commands:
  doctor [options]  检查运行环境
  scan [options]    扫描二维码
  serve [options]   启动自助二维码扫描服务
```

#### 1. qscan doctor 检查运行环境
``` bash
Options:
  -c, --customModel <customModel>  自定义模式路径，默认为空
  -r, --runConfig <runConfig>      运行配置绝对路径，默认为 ~/.qscanrc
  -h, --help                       output usage information
```
配置好 ```~/.qscanrc``` 后，执行：

``` js
qscan doctor
```

#### 2. qscan scan 扫描二维码
``` bash
Options:
  -c, --customModel <customModel>  自定义模式路径，默认为空
  -r, --runConfig <runConfig>      运行配置，默认为 ~/.qscanrc
  -m, --model <model>              使用的扫码模式
  -t, --type <type>                使用的扫码类型
  -h, --help                       output usage information
```

配置好 ```~/.qscanrc``` 后，执行：

``` js
qscan scan -m 'wx-default' -t 'ide-login-scan'
```


### 作为 node 模块使用

``` js
const QScan = require('qscan'); // 引入 qscan 工具

// 实例化一个 scan 对象
const scan = new QScan({
    // model 配置
    modelOpts: {
        'wx-default': { // model 名称
            udid: 'HICMHMZTTW8DFI59', // 安卓设备 id，通过 adb service 命令查看
            port: '4723', // 端口号
            opts: {
                user: 'xxx', // 微信用户名
                pass: 'xxx' // 微信密码
            }
        }
    }
});
```

我们实例化一个 QScan 对象，取名为 scan，这个对象有如下方法：

#### scan.run({ modelName, type }, cb) 扫描二维码:
``` js
scan.run(
    {
        modelName: 'wx-default', // model 名称
        type: 'ide-login-scan' // 扫码类型
    },
    err => {
        if (err) {
            console.log(err); // 错误信息处理
        }
    }
);
```

#### scan.doctor(cb) 检查环境:
``` js
scan.doctor(err => {
    if (err) {
        console.log(err);
    }
});
```

#### scan.clone({ newModelName, oldModelName, opts }) 拷贝一份 Model，可以用 ```opts``` 对象覆盖一部分属性:
``` js
scan.clone({
    newModelName: 'another-model',
    oldModelName: 'wx-default',
    opts: {}
});
```

#### scan.loadModel({ model, udid, port, opts }) 自定义传入的 Model：
``` js
const myModel = require('./myModel.js');
scan.loadModel({
    model: myModel,
    udid: '3HX0217705004280',
    port: '4723',
    opts: {
        user: 'xxx',
        pass: 'xxx'
    }
});
```

### 作为 koa/express 的中间件使用

``` js
const Koa = require('Koa');
const app = new Koa();
const QScan = require('qscan');

// model 配置
const modelOpts = {
    'wx-default': { // model 名称
        udid: '3HX0217705004280',  // 安卓设备 id，通过 adb service 命令查看
        port: '4723', // 端口号
        opts: {
            user: 'xxx', // 微信用户名
            pass: 'xxx' // 微信密码
        }
    }
}

// 使用 QScan 的中间件，传入 model 名称与选项
app.use(QScan.middleWare({
    modelOpts // 传入 model 选项
}));

app.listen(9001, function () {
    console.log(`Port[9001] started! `);
});
```

## 自定义模式

QScan 提供了自定义模式