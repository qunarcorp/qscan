
# 安装

使用 QScan 需要预先准备若干设备并安装一些工具

## 安装工具

QScan 依赖以下设备和工具：

|设备          | 版本 |
|-----------|------ |
|macOS 设备  | >=v8.0  |
|Android 设备 | >=v4.4 |

|工具          | 版本 |
|-----------|------ |
|Node        | >=v8.0  |
|Appium | 最新版本 |
|Android 设备安装的微信应用 | v6.7.2 |

### 1. 安装 Node.js

方案一: 从 [Node.js](https://nodejs.org/en/) 官网下载安装包

方案二: 使用 [Node Version Manager(NVM)](https://github.com/creationix/nvm) 安装 Node.js，你可以通过以下命令安装 NVM :

cURL:
``` bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

Wget:
``` bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

NVM 安装好以后，重启终端并运行以下命令来安装 Node.js :

``` bash
nvm install stable
```

### 2. 安装 Appium

请按照这篇教程进行安装：[Mac 上安装 Appium 详解](https://www.jianshu.com/p/4d2770f90bed)

### 3. Android 设备安装微信应用

安装 v6.7.2 版本的微信

## 安装 QScan

### 使用 NPM 安装 QScan

#### 全局安装
```
npm install qscan [-g]
```
安装完成后即可通过命令行调用，执行 ```qscan -v``` 查看 QScan 版本

#### 项目中安装
```
npm install qscan [--save-dev]
```
作为项目依赖安装，可以通过模块方式引入