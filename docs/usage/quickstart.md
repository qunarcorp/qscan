# 快速起步

确定你已经 [验证环境](./index.html#验证环境) 之后，这里是一个最简案例：使用 QScan 扫码登录微信开发者工具，使用命令行的方式调用扫码服务，请安装 微信开发者工具，

### 填写配置
编辑 ~/.qscanrc 文件，填写[配置](../documents/course.html#配置)
``` bash
vi ~/.qscanrc
```
``` json
{
    "wx-default": { // key 值为 Modal 名称
        "udid": "HICMHMZTTW8DFI59", // 安卓设备 id，通过 adb service 命令查看
        "port": "4723", // 端口号，这里设置为 4723
        "opts": {
            "user": "xxx", // 微信用户名
            "pass": "xxx" // 微信密码
        },
        "checkApp": true // 校验是否安装微信 APP 及其版本 
    }
}
```

### 检查运行环境

全局安装 QScan 后，执行 ``` qscan doctor ``` 检测上面的配置，确保所有的输出都是 ```✔ SUCCESS```

### 打开微信开发者工具

打开微信开发者工具的登录页，调整好位置，等待被扫码


### 执行扫码服务

执行下列代码，分别是指定的 Model 为 QScan 提供的微信扫码服务，type 类型为 ide-login-scan (微信开发者工具)

``` bash
qscan scan -m wx-default -t ide-login-scan
```

可以看到手机上面自动登录并扫码成功，同时你可以在终端中看到对应的输出日志。

一个最简单的扫码服务就跑起来了，除了使用命令行，你还可以使用 node 模块调用 QScan，由于 QScan 的核心代码比较纯粹，因此你可以发挥想象力，将它应用在你的业务场景中。

我们结合 Qunar 的实际应用场景，提供了一些[使用方案](./scheme.html)，你可以在这里了解 QScan 的使用思路。