
require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');
function success() {
require('../..//app.js?appxworker=1');
require('../../pages/index/index.js?appxworker=1');
require('../../pages/search-tip/index.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
