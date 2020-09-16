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
│  ├─ middleware              #中间件目录
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

- 路由系统

- 全局异常处理
- 项目配置
- 参数校验

#### 路由系统

​	在前后端分离中，每一个后端都离不开一个路由系统。路由相当于你访问的一个路径。<code>koa</code>框架本身是没有路由的，需要借助第三方的库集成路由系统，这个第三方库是<code>koa-router</code>。

​	下面具体演示一下具体用法。

```js
const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async(ctx, next) => {
  ctx.body = {
  	message: 'hello koa-router'
  }
})

module.exports = router
```

​	上面代码定义了一个路由，路径为<code>/v1/book</code>。启动服务器发现<code>Not Found</code>，是因为我们还没有将路由注册到koa中间件中。如果你使用的是本项目，默认会自动将路由注册到koa中间件中，只要你把模块（路由）导出去就可以了。

```js
// 支持两种方式导出去
module.exports = router
module.exports = {
    router
}
```

我们通常用模块的方式把路由分离到多个文件，例如上面写的模块是<code>book</code>，那么与book模块相关的路由都写在这个文件，所以我是比较推荐<code>module.exports = router</code> 方式导出模块。虽然在一个文件中可以写多个模块，但是也不建议这么干。

> 实际上路由api上还有其他一些参数，可以参考官方提供的文档。
>
> https://github.com/ZijianHe/koa-router

#### 全局异常处理

每一个后端项目几乎都要有全局异常处理，全局捕获整个项目中的所有发生的异常错误。<code>koa</code>框架本身也没有提供全局处理异常的机制，所以要自己写一个处理异常的机制，我把全局异常处理机制写成一个中间件，具体参考代码<code>middleware/global-exception</code>。全局异常处理中间件一定要注册为第一个中间件，可以参考<code>core/init.js</code>，不建议随意改动<code>core</code>目录下的代码。

下面具体演示一下具体用法。支持两种方式的用法，看个人喜欢。

```js
const Router = require('koa-router')
const {ParameterException} = require('../../exception/exception')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async(ctx, next) => {
  // 第一种方式用法，省了导入模块，较为方便
  throw new global.errs.ParameterException()
  // 第二种方式用法，需要导入模块
  throw new ParameterException()
})
module.exports = router
```

可以看到上面我们使用<code>ParameterException</code>。探究一下个东西，这个ParameterException写在<code>exception/exception.js</code>文件中，以后向追加其他异常处理建议集中写在这个文件中。

```js
const HttpException = require('../core/http-exception')
class ParameterException extends HttpException{
  constructor({message, code=10001} = {}) {
    super()
    this.statusCode = 400
    this.code = code
    this.message = message
  }
}
module.exports =  {
  ParameterException
}
```

我们可以看到<code>ParameterException</code>继承了<code>HttpException基类</code>，其实HttpException也继承了<code>Error</code>，因为这样我们才能通过<code>try..catch</code>捕获到异常。ParameterException编写了一个构造函数，如果以后想自己写自定义异常，请务必写成这个传参格式，如果不这样写，有可能会报错。参数列表中有<code>code</code>和<code>message</code>这两个参数，实际上还有个statusCode，但是它是几乎不需要改变，代表一种类型的异常。

- <code>code</code>代表自定异常的错误码，这个code是有具体意义的，而且非常方便于前端的处理。
- <code>message</code> 代表异常错误的信息。
- <code>statusCode</code> 代表Http状态码。

ParameterException构造函数中参数列表<code>code</code>有个默认参数<code>10001</code>，刚才说了这个<code>code</code>是有具体的意义的，那它代表什么？

可以看到项目目录有<code>config/code-message.js</code>这个文件记录着这个项目所有的错误码以及对应的错误信息，建议所有的错误码都集中写在这个文件。

```js
function getMessage(code) {
  return this[code] || ''
}
module.exports = {
  getMessage,
  0: 'ok',
  1: '创建成功',
  2: '删除成功',
  3: '更新成功',
  999: '服务器错误',
  10001: '参数错误'
}
```

上面代码就是<code>config/code-message.js</code>中的代码，可以把错误码追加在<code>module.exports</code>中。<code>getMessage方法</code>一般来说都不用管，主要用于处理全局异常中间件使用的一个通过code码获取message的一个方法。

我们继续回到这个异常调用这里<code>throw new global.errs.ParameterException()</code>，刚刚说了这个对象是可以传入两个参数的。下面代码演示并解释传参方式。

```js
//第一种不传入参数，会采用默认code以及message
throw new global.errs.ParameterException()
//如果需要传入参数，请务必传入的是一个对象。
//第二种方式只传入一个code码，这个code码必须要求code-message.js文件存在，如果不存在会报错提示你配置code码
throw new global.errs.ParameterException({
    code: 10002,
})
//第三种方式只传入message，它会采用默认的code码，而message是采用你传入的message
throw new global.errs.ParameterException({
    message: ‘传入参数错误拉拉’,
})
//第四种方式传入code码和message，自然code和message都是采用你传入的。
throw new global.errs.ParameterException({
    code: 10002,
    message: '传入参数错误拉拉'
})
```

虽然支持四种不同参数抛出异常，我个人比较建议你把所有的code码以及对应message都配置<code>config/code-message.js</code>文件中。配置在文件中你可以享受几个优点。

- 集中，方便管理、维护（零散的洒落在各个角落，可能会死翘翘）。
- 国际化处理的一种方案。

#### 项目配置

项目配置集中写在<code>config/config.js</code>这个文件中

下面代码是这个项目默认的一个环境配置，在<code>dev模式</code>下会打印非HttpException的异常错误信息到控制台，方便开发阶段调式。

```
module.exports = {
  environment: 'dev'
}
```

#### 参数校验

参数校验每个后端项目中必须做的一个安全措施。可能有些人会想，我前端已经校验了呀，为什么后端还要校验呢。这样告诉你吧，你前端可以不校验，但是后端**一定**要校验。前端校验只不过可以减少一些不必要的请求，提高了一下用户体验。koa框架本身也没有参数校验的功能，然而市面上好像也没有比较好用的<code>与koa相关的校验库</code>，这个项目是集成了一个开源项目中内置的一个<code>校验模块</code>，这个开源项目是<code>Lin-cms-koa</code>。

> Lin-cms-koa文档 https://doc.cms.talelin.com/server/
>
> 参数校验模块文档 https://doc.cms.talelin.com/server/koa/validator.html