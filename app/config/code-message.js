
function getMessage(code) {
  return this[code] || ''
}

module.exports = {
  getMessage,
  1: '创建成功',
  2: '删除成功',
  3: '删除成功',
  999: '服务器错误',
  10001: '参数错误'
}