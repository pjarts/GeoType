'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canDecode = exports.decode = exports.encode = undefined;

var _constants = require('../constants');

var _helper = require('../helper');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.encode = latLonDecEncode;
exports.decode = latLonDecDecode;
exports.canDecode = canDecode;


/**
* Encode an array of bits into latitude and longitude
* decimal values
* @param  {Array} bits
* @return {Object} [{
*     lat: Number,
*     lon: Number,
*     error: {
*         lat: Number,
*         lon: Number
*     }
* }]
*/
function latLonDecEncode(bits) {
    var range = (0, _helper.getInitRanges)();

    bits.forEach(function (bit, i) {
        return splitRange(range[(0, _helper.which)(i)], range[(0, _helper.which)(i)][bit]);
    });

    var res = {};
    for (var r in range) {
        res[r] = (range[r][_constants.R_MIN] + range[r][_constants.R_MAX]) / 2;
        res.error = res.error || {};
        res.error[r] = range[r][_constants.R_MAX] - res[r];
    }

    return res;
}

/**
* Decode latitude and longitude decimal values into
* an array of bits
* @param  {Object} latLon  { lat: number, lon: number }
* @param  {Number} numBits
* @return {Array}
*/
function latLonDecDecode(latLon, numBits) {
    var _target;

    if (!canDecode(latLon)) {
        throw "Cannot decode '" + latLon + "'. " + "Expected an object with `lat` and `lon` properties";
    }
    numBits = numBits || 52;

    var range = (0, _helper.getInitRanges)();

    var target = (_target = {}, _defineProperty(_target, _constants.LAT, latLon.lat), _defineProperty(_target, _constants.LON, latLon.lon), _target);

    var bits = [],
        bit;

    for (var i = 0; i < numBits; i++) {
        bit = splitRange(range[(0, _helper.which)(i)], target[(0, _helper.which)(i)]);
        bits.push(bit);
    }

    return bits;
}

function splitRange(range, target) {
    var avg = (range[_constants.R_MIN] + range[_constants.R_MAX]) / 2;
    var updateEdge = target > avg ? _constants.R_MIN : _constants.R_MAX;
    var producedBit = updateEdge === 0 ? 1 : 0;
    range[updateEdge] = avg;
    return producedBit;
}

function canDecode(value) {
    value = value || {};
    return typeof value[_constants.LAT] === 'number' && typeof value[_constants.LON] === 'number';
}