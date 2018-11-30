const expect = require('expect.js');
const axios = require('axios');
const mpAdapter = require('../../dist/index.js');

describe('Adapter', function() {

  it('should support 微信小程序 adapter', function(done) {
    let called = false
    global.wx = {
      request: function (options) {
        called = true
      }
    }
    axios.defaults.adapter = mpAdapter
    axios.get('https://api.github.com/users/mzabriskie')
    setTimeout(() => {
      expect(called).to.equal(true);
      done()
    }, 100)
  })

  after(() => {
    global.wx = undefined
  })
})
