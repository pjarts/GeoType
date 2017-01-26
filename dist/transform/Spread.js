'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transform = undefined;

var _Move = require('./Move');

var Move = _interopRequireWildcard(_Move);

var _structure = require('../structure');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.transform = Spread;


function Spread(cell, positions) {
    positions = positions || [];
    return (0, _structure.List)(positions.map(function (pos) {
        return Move.transform((0, _structure.Cell)().from(cell), pos);
    }));
}