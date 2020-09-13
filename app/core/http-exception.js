
class HttpException extends Error{
  statusCode
  code
  message
  constructor(statusCode=500, code='9999', message = '服务器异常') {
    super()
    this.statusCode = statusCode
    this.code = code
    this.message = message
  }
}

module.exports = HttpException