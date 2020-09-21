const Router = require('koa-router')
const { PositiveIdValidator } = require('../../validator/common')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/', async ctx => {
  const obj = {
    id: 1,
    title: 'koa',
    create_time
  }
  ctx.json(obj,['create_time']) 
})


module.exports = {router}