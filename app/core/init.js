const requireDirectory = require('require-directory')
const Router = require('koa-router')
const catchException = require('../middlewares/global-exception')
const extendContext = require('../middlewares/extend-context')
class InitManager {

  static initCore(app) {
    InitManager.app = app
    InitManager.registerCatchException()
    InitManager.registerExtendContext()
    InitManager.loadConfig()
    InitManager.registerRouters(app)
    InitManager.loadExceptions()
  }

  static registerCatchException() {
    InitManager.app.use(catchException)
  }

  static registerExtendContext() {
    InitManager.app.use(extendContext)
  }

  static registerRouters() {
    const path = `${process.cwd()}/app/api`
    requireDirectory(module,path,{visit: whenLoadModule})
    function whenLoadModule(router) {
      if(router instanceof Router) {
        InitManager.app.use(router.routes())
        return
      }
      for(const key in router) {
        whenLoadModule(router[key])
      }
    }
  }

  static loadConfig() {
    const path = `${process.cwd()}/app/config/config.js`
    const config = require(path)
    global.config = config
  }

  static loadExceptions() {
    const path = `${process.cwd()}/app/exception/exception.js`
    const exceptions = require(path)
    global.errs = exceptions
  }
}

module.exports = InitManager