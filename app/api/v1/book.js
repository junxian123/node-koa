const Router = require('koa-router')
const { PositiveIdValidator } = require('../../validator/common')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async ctx => {
  // const v = await new PositiveIdValidator().validate(ctx)
  const data = {
    id: 1,
    name: 'ccc',
    create_time: '12312'
  }
  ctx.json(data,['create_time'])
  // throw new global.errs.UnAuthorization()
})


module.exports = {router}