decode.bytes = encode.bytes = 8

exports.decode = decode
exports.encode = encode
exports.encodingLength = encodingLength

function decode (buf, offset) {
  if (!offset) offset = 0
  return buf.readInt32BE(offset) * 4294967296 + buf.readUInt32BE(offset + 4)
}

function encode (n, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(8)
  if (!offset) offset = 0
  buf.writeInt32BE(Math.floor(n / 4294967296), 0)
  buf.writeUInt32BE((n & 0xffffffff) >>> 0, 4)
  return buf
}

function encodingLength () {
  return 8
}
