var SecretStack = require('secret-stack')
var SSB = require('ssb-db')

module.exports = function(config) {
  const createSbot = SecretStack()
    .use(SSB)
    .use(require('ssb-unix-socket'))
    .use(require('ssb-master'))
    .use(require('ssb-gossip'))
    .use(require('ssb-replicate'))
    .use(require('ssb-friends'))
    .use(require('ssb-blobs'))
    .use(require('ssb-invite'))
    .use(require('ssb-local'))
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

    // TODO: wait for the server to listen
    cb(null, ssb)
  }
  ret.use = function(x) {
    createSbot.use(x)
    return ret
  }
  return ret
}
