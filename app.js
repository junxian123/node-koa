const koa = require('koa')
const InitManager = require('./app/core/init')

const app = new koa()

InitManager.initCore(app)

app.listen(5000)