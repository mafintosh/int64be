const tape = require('tape')
const int64be = require('./')

tape('encode', function (t) {
  t.same(int64be.encode(0), Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]))
  t.same(int64be.encode(1), Buffer.from([0, 0, 0, 0, 0, 0, 0, 1]))
  t.same(int64be.encode(-1), Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]))
  t.same(int64be.encode(0xffffffff), Buffer.from([0, 0, 0, 0, 0xff, 0xff, 0xff, 0xff]))
  t.same(int64be.encode.bytes, 8)
  t.end()
})

tape('encode', function (t) {
  t.same(int64be.decode(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0])), 0)
  t.same(int64be.decode(Buffer.from([0, 0, 0, 0, 0, 0, 0, 1])), 1)
  t.same(int64be.decode(Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])), -1)
  t.same(int64be.decode(Buffer.from([0, 0, 0, 0, 0xff, 0xff, 0xff, 0xff])), 0xffffffff)
  t.same(int64be.encode.bytes, 8)
  t.same(int64be.encodingLength(42), 8)
  t.end()
})

tape('extremes', function (t) {
  t.same(int64be.decode(int64be.encode(Number.MIN_SAFE_INTEGER)), Number.MIN_SAFE_INTEGER)
  t.same(int64be.decode(int64be.encode(Number.MAX_SAFE_INTEGER)), Number.MAX_SAFE_INTEGER)
  t.end()
})

tape('random', function (t) {
  for (var i = 0; i < 1000000; i++) {
    const n =
      Number.MIN_SAFE_INTEGER +
      Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) +
      Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

    if (int64be.decode(int64be.encode(n)) !== n) {
      t.fail('could not encode + decode ' + n)
    }
  }
  t.pass('encoded + decoded 1000000 random numbers')
  t.end()
})
