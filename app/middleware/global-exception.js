const HttpException = require("../core/http-exception")
const codeMessage = require('../config/code-message')
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const environment = global.config.environment
    const isHttpException = error instanceof HttpException
    if(environment === 'dev' && !isHttpException) {
      throw error
    }
    const request = `${ctx.request.method} ${ctx.request.path}`
    const message = error.message || codeMessage.getMessage(error.code)
    if(!message) {
      throw new Error('[code-message]没有找到相应code的配置项；也没有主动传入message')
    }
    ctx.status = error.statusCode
    ctx.body = {
      code: error.code,
      message,
      request
    }
  }
}