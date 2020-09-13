const HttpException = require("../core/http-exception")

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
    ctx.status = error.statusCode
    ctx.body = {
      code: error.code,
      message: error.message,
      request
    }
  }
}