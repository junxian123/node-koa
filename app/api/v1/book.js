const Router = require('koa-router')
const { ParameterException } = require('../../exception/exception')
const router1 = new Router({
  prefix:'/v1/book'
})

router1.get('/', async(ctx, next) => {
  throw new global.errs.ParameterException()
})

const router2 = new Router({
  prefix: '/v1/classic'
})

router2.get('/', async(ctx, next) => {
  ctx.body = "helloworld"
})

module.exports = {router1,router2,a:2}