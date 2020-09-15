
class HttpException extends Error{
  statusCode = 500
  code = '999'
  message = '服务器错误'
  // constructor(statusCode=500, code='999', message = '服务器异常') {
  //   super()
  //   this.statusCode = statusCode
  //   this.code = code
  //   this.message = message
  // }
}

module.exports = HttpException