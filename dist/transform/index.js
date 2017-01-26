'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cover = exports.Move = exports.Spread = exports.Adjacent = undefined;

var _Move = require('./Move');

var Move = _interopRequireWildcard(_Move);

var _Spread = require('./Spread');

var Spread = _interopRequireWildcard(_Spread);

var _Adjacent = require('./Adjacent');

var Adjacent = _interopRequireWildcard(_Adjacent);

var _Cover = require('./Cover');

var Cover = _interopRequireWildcard(_Cover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Adjacent = Adjacent;
exports.Spread = Spread;
exports.Move = Move;
exports.Cover = Cover;