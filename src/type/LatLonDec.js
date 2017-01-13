export {
    latLonDecEncode as encode,
    latLonDecDecode as decode,
    canDecode
}

import { LAT, LON, R_MIN, R_MAX } from '../constants'

import {
    which,
    getInitRanges
} from '../helper'

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
    let range = getInitRanges()

    bits.forEach((bit, i) => splitRange(
        range[which(i)],
        range[which(i)][bit]
    ))

    let res = {}
    for (let r in range) {
        res[r] = (range[r][R_MIN] + range[r][R_MAX]) / 2
        res.error = res.error || {}
        res.error[r] = range[r][R_MAX] - res[r]
    }

    return res
}

/**
* Decode latitude and longitude decimal values into
* an array of bits
* @param  {Object} latLon  { lat: number, lon: number }
* @param  {Number} numBits
* @return {Array}
*/
function latLonDecDecode(latLon, numBits) {
    if (!canDecode(latLon)) {
        throw "Cannot decode '" + latLon + "'. "
            + "Expected an object with `lat` and `lon` properties"
    }
    numBits = numBits || 52

    let range = getInitRanges()

    const target = {
        [LAT]: latLon.lat,
        [LON]: latLon.lon
    }

    var bits = [], bit

    for (var i = 0; i < numBits; i++) {
        bit = splitRange(range[which(i)], target[which(i)])
        bits.push(bit)
    }

    return bits
}

function splitRange(range, target) {
    const avg = (range[R_MIN] + range[R_MAX]) / 2
    const updateEdge = target > avg ? R_MIN : R_MAX
    const producedBit = updateEdge === 0 ? 1 : 0
    range[updateEdge] = avg
    return producedBit
}

function canDecode(value) {
    value = value || {}
    return typeof value[LAT] === 'number'
        && typeof value[LON] === 'number'
}
