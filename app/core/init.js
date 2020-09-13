const requireDirectory = require('require-directory')
const Router = require('koa-router')
const catchException = require('../middlewares/exception')
class InitManager {

  static initCore(app) {
    InitManager.app = app
    InitManager.registerCatchException()
    InitManager.registerRouters(app)
    InitManager.loadConfig()
    InitManager.loadExceptions()
  }

  static registerCatchException() {
    InitManager.app.use(catchException)
  }

  static registerRouters() {
    const path = `${process.cwd()}/app/api`
    requireDirectory(module,path,{
      visit: whenLoadModule
    })
    function whenLoadModule(router) {
      if(router instanceof Router) {
        console.log(router.routes)
        InitManager.app.use(router.routes())
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