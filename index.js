var SecretStack = require('secret-stack')
var SSB = require('ssb-db')

module.exports = function(config) {
  const createSbot = SecretStack()
    .use(SSB)
    .use(require('ssb-unix-socket'))
    .use(require('ssb-master'))
    .use(require('ssb-conn'))
    .use(require('ssb-replicate'))
    .use(require('ssb-friends'))
    .use(require('ssb-blobs'))
    .use(require('ssb-invite'))
    .use(require('ssb-lan'))
    .use(require('ssb-logging'))
    .use(require('ssb-query'))
    .use(require('ssb-links'))
    .use(require('ssb-ws'))
    .use(require('ssb-ebt'))
    .use(require('ssb-ooo'))
    .use(require('ssb-revisions'))


  const ret = function(config, keys, cb) {
    const merged = Object.assign({}, config, {keys})
    const ssb = createSbot(merged)

    // wait for the server to listen
    const timeout = setTimeout( ()=>{
      cb(new Error('timeout while waiting for multiserver:listening event'))
    }, 2000)

    ssb.once('multiserver:listening', e=>{
      clearTimeout(timeout)
      cb(null, ssb)
    })
  }
  ret.use = function(x) {
    createSbot.use(x)
    return ret
  }
  return ret
}
