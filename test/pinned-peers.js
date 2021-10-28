const crypto = require('crypto')
const tape = require('tape')
const Factory = require('../')
const ssbKeys = require('ssb-keys')

const shs = crypto.randomBytes(32).toString('base64')
const config = {caps: {shs}, temp: 'test', host: '127.0.0.1', port: 9090}
const keys = ssbKeys.generate()

tape('has pinned-peers feature', function (t) {
  const createServer = Factory()

  createServer(config, keys, (err, ssb) => {
    t.error(err)
    const manifest = ssb.getManifest()

    t.notOk(manifest.connScheduler.pin, 'in manifest, connScheduler has no pin method')
    t.ok(ssb.connScheduler.pin, 'ssb.connScheduler has pin() method')
    ssb.close()
    console.log('NOTE: hangs due to ssb-revisions')
    t.end()
  })
})

