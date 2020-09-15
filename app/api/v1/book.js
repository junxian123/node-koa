const Router = require('koa-router')
const { PositiveIdValidator } = require('../../validator/common')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/:id', async(ctx, next) => {
  const v = await new PositiveIdValidator().validate(ctx)
<<<<<<< HEAD
  throw new global.errs.ParameterException()
=======
  throw new global.errs.ParameterException({code:10002})
>>>>>>> bug-100
})


module.exports = {router}