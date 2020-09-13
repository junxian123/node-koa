const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async(ctx, next) => {
  ctx.body = {
    message: 'helloWorld'
  }
})

module.exports = router