
const HttpException = require('../core/http-exception')

class ParameterException extends HttpException{
  constructor({message, code=10001} = {}) {
    super()
    this.statusCode = 400
    this.code = code
    this.message = message
  }
}

module.exports =  {
  ParameterException
}