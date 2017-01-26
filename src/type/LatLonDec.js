export {
    latLonDecEncode as encode,
    latLonDecDecode as decode,
    canDecode
}

import { Cell } from '../structure'
import { getInitRanges } from '../helper'

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
function latLonDecEncode(cell, numBits) {
    numBits = numBits || cell.numBits
    let range = getInitRanges(),
        i = 0, which

    while (--numBits >= 0) {
        which = i++ % 2
        splitRange(range[which], range[which][cell.getBit(numBits)] )
    }

    let res = {
        lon: (range[0][0] + range[0][1]) / 2,
        lat: (range[1][0] + range[1][1]) / 2
    }
    res.error = {
        lon: range[0][1] - res.lon,
        lat: range[1][1] - res.lat
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

    const target = [latLon.lon, latLon.lat]

    let cell = Cell(), which

    for (var i = 0; i < numBits; i++) {
        which = i % 2
        cell.addBit(splitRange(range[which], target[which]))
    }

    return cell
}

function splitRange(range, target) {
    const avg = (range[0] + range[1]) / 2
    const updateEdge = target > avg ? 0 : 1
    const producedBit = updateEdge === 0 ? 1 : 0
    range[updateEdge] = avg
    return producedBit
}

function canDecode(value) {
    return value
        && typeof value.lat === 'number'
        && typeof value.lon === 'number'
}
