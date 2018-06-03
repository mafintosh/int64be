# int64be

Encode / decode big endian unsigned 64 bit integers

```
npm install int64be
```

[![build status](http://img.shields.io/travis/mafintosh/int64be.svg?style=flat)](http://travis-ci.org/mafintosh/int64be)

## Usage

``` js
var int64be = require('int64be')

var buf = int64be.encode(-42) // returns a 8 byte buffer with -42 encoded
console.log(int64be.decode(buf)) // returns -42
```

## Notice

Javascript (currently) only supports integers up to `2^53 - 1` without any
loss of precision so beware of this if you encode / decode any integers larger than that.

## API

#### `buffer = int64be.encode(num, [buffer], [offset])`

Encode a number as a big endian 64 bit signed integer.
Optionally you can pass a buffer + offset as the 2nd and 3rd argument
and the number will be encoded into that buffer at the given offset.

#### `num = int64be.decode(buffer, [offset])`

Decode a number from a buffer.

#### `length = int64be.encodingLength(num)`

Always returns `8`. Added to comply with the standard encoding interface in node.
Similarly `int64be.encode.bytes` and `int64be.decode.bytes` is also set to `8`.

## License

MIT
