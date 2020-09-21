
function getMessage(code) {
  return this[code] || ''
}

module.exports = {
  getMessage,
  0: 'ok',
  1: '创建成功',
  2: '删除成功',
  3: '更新成功',
  9999: '服务器错误',
  10000: '参数错误',
  10001: '授权失败',
  10002: '禁止访问',
  10003: '资源不存在'
}