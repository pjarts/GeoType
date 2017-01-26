'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.constant = exports.transform = exports.type = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _type = require('./type');

var type = _interopRequireWildcard(_type);

var _transform = require('./transform');

var transform = _interopRequireWildcard(_transform);

var _structure = require('./structure');

var structure = _interopRequireWildcard(_structure);

var _constants = require('./constants');

var constant = _interopRequireWildcard(_constants);

var _helper = require('./helper');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.type = type;
exports.transform = transform;
exports.constant = constant;
exports.default = GeoCell;


function GeoCell(toType, toBits) {
    if (!toType || !toType.encode) {
        throw new Error("Cannot convert to type '" + (typeof toType === 'undefined' ? 'undefined' : _typeof(toType)) + "'");
    }
    var transforms = [];
    var fromType = toType,
        fromBits = toBits;
    return {
        transform: function transform(trans, opts) {
            if (typeof trans.transform !== 'function') {
                throw new Error("Expected a transform object, got " + (typeof trans === 'undefined' ? 'undefined' : _typeof(trans)));
            }
            transforms.push({ trans: trans, opts: opts });
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
            var struct = fromType.decode(value, fromBits);
            var isCell = function isCell(struct) {
                return struct._type === structure.Cell;
            };

            transforms.forEach(function (t) {
                struct = (0, _helper.transformStructure)(struct, t.trans.canTransform || isCell, function (struct) {
                    return t.trans.transform(struct, t.opts);
                });
            });

            struct = (0, _helper.transformStructure)(struct, toType.canEncode || isCell, function (struct) {
                return toType.encode(struct, toBits);
            });

            return structure.Container(struct).render();
        }
    };
}