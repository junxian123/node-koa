
const codeMessage = require('../config/code-message')

/**
 * 扩展context对象
 */
module.exports = async (ctx, next) => {
  ctx.success = ({message, code=0} = {}) => {
    let msg = codeMessage.getMessage(code) || message
    if(!msg) {
      throw new Error('[code-message]没有找到相应code的配置项；也没有主动传入message')
    }
    const request = `${ctx.request.method} ${ctx.request.path}`
    ctx.body = {
      code,
      message: msg,
      request
    }
  }

  ctx.json = (data) => {
    ctx.body = data
  }
  await next()
}