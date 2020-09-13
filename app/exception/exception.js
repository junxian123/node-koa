
const HttpException = require('../core/http-exception')

class ParameterException extends HttpException{
  constructor(code=40000,message='参数错误') {
    super()
    this.statusCode = 400
    this.code = code
    this.message = message
  }
}

module.exports =  {
  ParameterException
}