const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {

  static initCore(app) {
    InitManager.app = app
    InitManager.registerRouters(app)
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
}

module.exports = InitManager