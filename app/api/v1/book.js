const Router = require('koa-router')
const { PositiveIdValidator } = require('../../validator/common')
const router1 = new Router({
  prefix:'/v1/book'
})

router1.get('/:id', async(ctx, next) => {
  const v = await new PositiveIdValidator().validate(ctx)
  
  // 异常用法
  throw new global.errs.ParameterException({
    code:1,
  })
})

const router2 = new Router({
  prefix: '/v1/classic'
})

router2.get('/', async(ctx, next) => {
  ctx.body = "helloworld"
})

module.exports = {router1,router2,a:2}