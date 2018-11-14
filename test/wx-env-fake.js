const mockSuccessData = {
  data: { 'name': 'lizong' },
  statusCode: 200,
  header: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:18624',
    'Connection': 'keep-alive',
    'Content-Length': '52',
    'Content-Type': 'application/json; charset=utf-8'
  }
}
const wx = {
  request: function (option) {
    console.log(option)
    setTimeout(() => {
      option.success && option.success(mockSuccessData)
      option.complete && option.complete({ a: 1 })
    }, 1000)
  }
}
module.exports = wx
