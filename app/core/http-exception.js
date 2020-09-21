class HttpException extends Error {
  statusCode = 500
  code = '999'
  message = '服务器错误'
}

class Parameter extends HttpException {
  constructor({
    message,
    code = 10000
  } = {}) {
    super()
    this.statusCode = 400
    this.code = code
    this.message = message
  }
}

class UnAuthorization extends HttpException {
  constructor({
    message,
    code = 10001
  } = {}) {
    super()
    this.statusCode = 401
    this.code = code
    this.message = message
  }
}

class Forbidden extends HttpException {
  constructor({
    message,
    code = 10002
  } = {}) {
    super()
    this.statusCode = 403
    this.message = message
    this.code = code
  }
}

class NotFound extends HttpException {
  constructor({
    message,
    code = 10003
  } = {}) {
    super()
    this.statusCode = 404
    this.code = code
    this.message = message
  }
}

module.exports = {
  HttpException,
  Parameter,
  UnAuthorization,
  Forbidden,
  NotFound
}