var tape = require('tape')

tape('createSsbServer method allows creating multiple servers with the same plugins', function (t) {
  var createSsbServer = require('../')

  var ssbServer1 = createSsbServer()
    //.use(require('ssb-replicate'))

  var ssbServer2 = createSsbServer()
    //.use(require('ssb-replicate'))
    //.use(require('ssb-conn'))

  t.pass()
  t.end()
})

