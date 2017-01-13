'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helper = require('../helper');

var _constants = require('../constants');

exports.default = Move;


function Move(bits, pos) {
    bits = bits.slice(0);

    (0, _helper.bitAdd)(bits, pos[0], _constants.LAT);
    (0, _helper.bitAdd)(bits, pos[1], _constants.LON);

    return bits;
}