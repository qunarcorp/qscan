# 快速起步

确定你已经验证环境之后，这里是一个最简案例：使用 QScan 扫码登录微信开发者工具，使用命令行的方式调用扫码服务，请安装 微信开发者工具，

### 连接设备并启动

- 手机连接电脑，打开终端，执行 ```adb devices``` 查看该设备的 id
- 使用 Appium 启动一个进程，并设置端口 (这里设置为4723)，启动后 Appium 即可控制手机：
``` bash
appium -U 3HX0217705004280 -p 4723
```

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

### 

