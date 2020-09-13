const Router = require('koa-router')
const { ParameterException } = require('../../exception/exception')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async(ctx, next) => {
  throw new global.errs.ParameterException()
  // ctx.body = {
  //   message: 'helloWorld'
  // }
})

module.exports = router