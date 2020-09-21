const Router = require('koa-router')
const { PositiveIdValidator } = require('../../validator/common')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async ctx => {
  // const v = await new PositiveIdValidator().validate(ctx)
  const a = global.errs
  throw new global.errs.UnAuthorization()
})


module.exports = {router}