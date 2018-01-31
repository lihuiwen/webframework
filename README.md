
# 说明

> 项目是基于 koa2 + swig + awilix + awilix-koa

## 项目运行

```source-shell
# 克隆到本地
git clone https://github.com/lihuiwen/webframework.git

# 进入文件夹
cd webframework/

# 安装依赖
npm install

# 开启本地服务器 localhost:3000/users/123
npm run build:dev  // 监听 webpack
gulp //  监听 gulp
cd build 
node app.js

# 发布环境
npm run build

# 发布环境
npm run test
```
## 项目结构
```
├── .babelrc
├── .eslintignore
├── .eslintrc.js
├── .stylelintcache
├── .stylelintignore
├── .stylelintrc.js
├── README.md
├── config
│   ├── htmlafteplugin.js                            // webpack 自定义插件处理swig
│   ├── webpack.base.js                              // 基础webpack文件 
│   ├── webpack.dev.js                               // webpack开发文件
│   └── webpack.prod.js                              // webpack上线文件
├── gulpfile.js                                      // gulp 打包node
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── nodeuii                                      // node文件
│   │   ├── app.js
│   │   ├── assets                                   // 静态文件
│   │   ├── config
│   │   │   ├── config.js                            // server配置文件
│   │   │   └── local.js                             // 本地配置文件
│   │   ├── libs
│   │   │   └── safeRequest.js                       // 封装请求 axios
│   │   ├── meddleware
│   │   │   ├── authenticate.js                      // 路由守护
│   │   │   └── errorHandler.js                      // 错误处理中间件
│   │   ├── routers
│   │   │   └── UasersController.js                  // 路由
│   │   └── servers
│   │       └── UserService.js                       // servers
│   └── webapp                                       // 页面
│       ├── views
│       │   ├── common
│       │   │   ├── common.entry.js
│       │   │   └── pages
│       │   │       └── layout.html                  // 模板
│       │   ├── error
│       │   │   ├── error.entry.js
│       │   │   └── pages
│       │   │       ├── 404.html                     // 404 页面
│       │   │       └── 500.html                     // 500 页面
│       │   └── index
│       │       ├── index.entry.js
│       │       └── pages
│       │           └── index.html                   // index 页面
│       └── widget
│           └── main                                 // widget 组件
│               ├── images
│               │   └── 3.png
│               ├── main.css
│               ├── main.html
│               └── main.js
└── webpack.config.js                                // webpack打包页面
```