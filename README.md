# node-koa

####  项目目录结构


```
node-koa
├─ .gitignore
├─ app                     
│  ├─ api                     #api层
│  │  └─ v1                 
│  │     └─ book.js
│  ├─ config                  #配置文件目录
│  │  ├─ code-message.js      #返回成功码错误码和返回信息配置
│  │  └─ config.js            #项目信息配置
│  ├─ core                    #项目核心代码目录
│  │  ├─ http-exception.js    #继承Error的自定义HttpException
│  │  ├─ init.js              #core初始化
│  │  ├─ lin-validator.js     #参数校验工具
│  │  └─ util.js              #工具函数
│  ├─ exception               #自定义异常模块
│  │  └─ exception.js       
│  ├─ middlewares             #中间件目录
│  │  └─ global-exception.js  #全局处理异常
│  └─ validator               #校验器模块
│     └─ common.js
├─ app.js                     #启动文件
├─ LICENSE
├─ package-lock.json
├─ package.json
└─ README.md

```

#### 项目功能

- 全局异常处理
- 路由系统
- 参数校验

#### 扩展

- node.js热重启 npm -i nodemon -g