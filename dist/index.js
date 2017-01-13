'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var type = require('./type');
var transform = require('./transform');

exports.type = type;
exports.transform = transform;
exports.default = GeoType;

/**
 * Some transform functions may output an array of bit arrays.
 * This function looks deep into nested arrays and runs a callback
 * on all arrays that looks like bit arrays
 * @param  {Array} output
 * @param  {Function} cb
 * @param  {Mixed} opts
 * @return {Array}
 */

function runDeep(output, cb, opts) {
    return Array.isArray(output[0]) ? output.map(function (val) {
        return runDeep(val, cb, opts);
    }) : cb(output, opts);
}

function GeoType(toType, toBits) {
    if (!toType || !toType.encode) {
        throw new Error("Cannot convert to type '" + (typeof toType === 'undefined' ? 'undefined' : _typeof(toType)) + "'");
    }
    var transforms = [];
    var fromType = toType,
        fromBits = toBits;
    return {
        transform: function transform(tFunc, opts) {
            if (typeof tFunc !== 'function') {
                throw new Error("Expected a transform function, got " + (typeof tFunc === 'undefined' ? 'undefined' : _typeof(tFunc)));
            }
            transforms.push({ func: tFunc, opts: opts });
            return this;
        },
        from: function from(type, bits) {
            if (!type || !type.decode) {
                throw new Error("Cannot convert from type '" + (typeof type === 'undefined' ? 'undefined' : _typeof(type)) + "'");
            }
            fromType = type;
            fromBits = bits || fromBits;
            return this;
        },
        convert: function convert(value) {
            if (!fromType.canDecode(value)) {
                throw new Error("Cannot decode value using type '" + fromType.decode.name + "'. " + "Please specify the correct from type using the .from() method");
            }
            var output = fromType.decode(value, fromBits);
            transforms.forEach(function (trans) {
                output = runDeep(output, trans.func, trans.opts);
            });
            output = runDeep(output, toType.encode, toBits || fromBits);
            return output;
        }
    };
}