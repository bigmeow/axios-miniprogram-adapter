var expect = require('expect.js');
var axios = require('axios');
var wxEnv = require('./wx-env-fake')
var mpAdapter = require('../dist/index.js');


describe('单元测试', function() {

  before(function () {
    global.wx = wxEnv
    axios.defaults.adapter = mpAdapter
  })
  this.timeout(3000);

  describe('功能1', function() {
    it('请求方式', function(done) {
      axios.get('https://api.github.com/users/mzabriskie').then(data => {
        console.log(data)
        done()
      })
    })
    it('请求迸发', function(done) {
      axios.all([
        axios.get('https://api.github.com/users/mzabriskie'),
        axios.get('https://api.github.com/users/mzabriskie/orgs')
      ]).then(axios.spread(function (user, orgs) {
        // console.log('接口1数据:', user.data.avatar_url, user.data.name)
        // console.log('接口2数据:', orgs.data)
        done()
        //expect(orgs.data == true).to.equal(true);
      }))
      // expect(base.name).to.equal('base');
    });
  });

    // describe('功能2', function() {
    //     it('不相等', function() {
    //         expect(base.name).not.to.equal(1);
    //     });
    // });
});
