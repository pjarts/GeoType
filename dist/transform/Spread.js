'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Move = require('./Move');

var _Move2 = _interopRequireDefault(_Move);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Spread;


function Spread(bits, positions) {
    positions = positions || [[1, -1], // top left
    [1, 0], // top
    [1, 1], // top right
    [0, 1], // right
    [-1, 1], // bottom right
    [-1, 0], // bottom
    [-1, -1], // bottom left
    [0, -1] // left
    ];

    return positions.map(function (pos) {
        return (0, _Move2.default)(bits, pos);
    });
}