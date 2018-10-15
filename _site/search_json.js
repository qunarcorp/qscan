window.ydoc_plugin_search_json = {
  "文档": [
    {
      "title": "简介",
      "content": "QScan 是一个高度可定制的扫码工具，基于 appium 的扫码方案，可灵活配置",
      "url": "/documents/index.html",
      "children": [
        {
          "title": "使用方式",
          "url": "/documents/index.html#使用方式",
          "content": "使用方式"
        },
        {
          "title": "下一步我可以做什么",
          "url": "/documents/index.html#下一步我可以做什么",
          "content": "下一步我可以做什么简单学习即可轻松使用下面的基本功能，这不会花费你很长时间：目录: 了解 Qscan 的目录结构\n导航: 页面顶部的链接\n页面: 编写首页、文档页目录和内容\n"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/documents/install.html",
      "children": [
        {
          "title": "安装依赖",
          "url": "/documents/install.html#安装依赖",
          "content": "安装依赖"
        },
        {
          "title": "安装 Node.js",
          "url": "/documents/install.html#安装依赖-安装-node.js",
          "content": "安装 Node.js方案一: 从 Node.js 官网下载安装包方案二: 使用 Node Version Manager(NVM) 安装 Node.js，你可以通过以下命令安装 NVM :cURL:$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bashWget:$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bashNVM 安装好以后，重启终端并运行以下命令来安装 Node.js :nvm install stable"
        },
        {
          "title": "使用 NPM 安装 Qscan",
          "url": "/documents/install.html#安装依赖-使用-npm-安装-qscan",
          "content": "使用 NPM 安装 Qscannpm install qscan [-g]"
        },
        {
          "title": "启动",
          "url": "/documents/install.html#启动",
          "content": "启动mkdir project && cd projectQscan init\nQscan build\nQscan init 执行初始化操作，这将会在当前目录生成一个 'docs' 目录，用于存放文档(markdown)文件。Qscan build 执行构建操作，这将会使用 'docs' 目录中的文件进行文档站的构建，构建成功后会在当前目录生成一个 '_site' 目录，打开 '_site' 目录中的  index.html 文件即可访问构建的文档站首页 🎉🎉"
        }
      ]
    },
    {
      "title": "env",
      "content": "env",
      "url": "/documents/env.html",
      "children": [
        {
          "title": "title",
          "url": "/documents/env.html#title",
          "content": "titlecontent"
        },
        {
          "title": "sub-title",
          "url": "/documents/env.html#title-sub-title",
          "content": "sub-titlecontent"
        }
      ]
    }
  ]
}