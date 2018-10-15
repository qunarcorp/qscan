
## 安装依赖
### 安装 Node.js

Qscan 依赖 Node.js , 请安装不低于 7.6 版本的 Node.js

### 安装 Node.js

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

### 使用 NPM 安装 Qscan

```
npm install qscan [-g]
```

## 启动

``` bash
mkdir project && cd project
Qscan init
Qscan build
```

`Qscan init` 执行初始化操作，这将会在当前目录生成一个 `'docs'` 目录，用于存放文档(markdown)文件。

`Qscan build` 执行构建操作，这将会使用 `'docs'` 目录中的文件进行文档站的构建，构建成功后会在当前目录生成一个 `'_site'` 目录，打开 `'_site'` 目录中的  `index.html` 文件即可访问构建的文档站首页 🎉🎉
