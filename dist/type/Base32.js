'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canDecode = exports.decode = exports.encode = undefined;

var _Integer = require('./Integer');

var Integer = _interopRequireWildcard(_Integer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.encode = base32Encode;
exports.decode = base32Decode;
exports.canDecode = canDecode;


var CHAR_MAP = '0123456789bcdefghjkmnpqrstuvwxyz';
var CHAR_BITS = 5;

/**
* Encode an array of bits into a base 32 string
* @param  {Array} bits
* @return {String}
*/
function base32Encode(bits) {
    var hash = '';

    for (var i = 0, len = bits.length; i < len; i += CHAR_BITS) {
        hash += CHAR_MAP[Integer.encode(bits.slice(i, i + CHAR_BITS))];
    }

    return hash;
}

/**
* Decode a base 32 string into an array of bits
* @param  {String} hash
* @return {Array}
*/
function base32Decode(hash) {
    if (!canDecode(hash)) {
        throw "Cannot decode '" + hash + "'. " + "Expected a string containing only characters " + "from the base 32 character map";
    }
    var bits = [],
        val = void 0;
    for (var i = 0; i < hash.length; i++) {
        val = CHAR_MAP.indexOf(hash[i]);
        bits = bits.concat(Integer.decode(val, CHAR_BITS));
    }
    return bits;
}

/**
 * Check if value can be decoded
 * @param  {mixed} value
 * @return {Boolean}
 */
function canDecode(value) {
    if (typeof value !== 'string') return false;
    var len = value.length;
    while (--len >= 0) {
        if (CHAR_MAP.indexOf(value[len]) < 0) return false;
    }
    return true;
}