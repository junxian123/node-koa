
const codeMessage = require('../config/code-message')
const { Success, HttpException } = require('../core/http-exception')
const { unset } = require('lodash')
/**
 * 扩展context对象
 */
module.exports = async (ctx, next) => {
  ctx.success = (data) => {
    const success = new Success(data)
    // 优先采用config message
    const message = codeMessage.getMessage(success.code) || success.message
    if(!message) {
      throw new Error('[code-message]没有找到相应code的配置项；也没有主动传入message')
    }
    const request = `${ctx.request.method} ${ctx.request.path}`
    ctx.status = success.status
    ctx.body = {
      code: success.code,
      message,
      request
    }
  }

  ctx.json = (obj,hide=[]) => {
    hide.forEach(h => unset(obj,h))
    ctx.body = obj
  }
  await next()
}