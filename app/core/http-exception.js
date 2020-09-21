class HttpException extends Error {
  status = 500
  code = '9999'
  message = '服务器错误'
}

class Success extends HttpException {
  constructor({
    message,
    code = 0
  } = {}) {
    super()
    this.status = 201
    this.code = code
    this.message = message
  }
}

class Parameter extends HttpException {
  constructor({
    message,
    code = 10000
  } = {}) {
    super()
    this.status = 400
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
    this.status = 401
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
    this.status = 403
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
    this.status = 404
    this.code = code
    this.message = message
  }
}

module.exports = {
  HttpException,
  Success,
  Parameter,
  UnAuthorization,
  Forbidden,
  NotFound
}