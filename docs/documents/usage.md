# 使用教程

为了保证核心代码的纯粹，我们只提供最纯粹的自动扫码功能。

QScan 可以作为一个 node 模块使用，也可以作为一个 koa/express 中间件使用，因此使用起来非常灵活 ~

## 作为 node 模块使用

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

// 执行扫码
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

## 作为 koa/express 的中间件使用

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
    customModel: 'wx-default', // 配置 model 名称
    modelOpts // 传入 model 选项
}));

app.listen(9001, function () {
    console.log(`Port[9001] started! `);
});
```