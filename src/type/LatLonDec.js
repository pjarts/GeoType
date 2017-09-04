/* @flow */

import Cell from '../Cell'
import { getInitRanges } from '../helper'
import TypeFactory from './TypeFactory'

import type { Range, Bit } from '../'
import type { Type } from './'

/**
 * @typedef LatLonDecimal
 * @property {number} lat Latitude decimal value
 * @property {number} lon Longitude decimal value
 */
type LatLonDecimal = {
  lat: number,
  lon: number
}

/**
 * @typedef LatLonCell
 * @property {number} lat Latitude decimal value
 * @property {number} lon Longitude decimal value
 * @property {error} error Calculated error
 */
type LatLonCell = LatLonDecimal & { error: LatLonDecimal }

function splitRange (range: Range, target: number): { range: Range, bit: Bit} {
  const avg: number = (range[0] + range[1]) / 2
  const updateEdge: Bit = target > avg ? 0 : 1
  const bit: Bit = 1 - updateEdge
  const newRange: Range = range.slice()
  newRange[updateEdge] = avg
  return {
    range: newRange,
    bit
  }
}

/**
 * Decoder/Encoder for [LatLonDecimal]
 * @memberOf module:type
 * @static LatLonDec
 * @type {Type}
 */
const LatLonDec: Type<LatLonCell, Cell> = TypeFactory({
  /**
   * Encodes a `Cell` into a [LatLonDecimal]
   * @param {Cell} cell The [Cell] to be encoded
   * @param {number} [numBits] Number of bits to use for the encoding
   * @returns {LatLonCell}
   */
  encode: (cell: Cell, numBits) => {
    const range: [Range, Range] = getInitRanges()
    let i = 0
    let which: Bit
    cell.forEachBit((bit: Bit) => {
      which = i % 2 ? 1 : 0
      range[which] = splitRange(range[which], range[which][bit]).range
      i += 1
    }, numBits)
    const lon = (range[0][0] + range[0][1]) / 2
    const lat = (range[1][0] + range[1][1]) / 2
    const error: LatLonDecimal = {
      lon: range[0][1] - lon,
      lat: range[1][1] - lat
    }
    return {
      lat,
      lon,
      error
    }
  },

  /**
   * Decodes a [LatLonDecimal] into a [Cell]
   * @param {LatLonDecimal} Value to decode
   * @param {number} [numBits] Number of bits to use for the decoding
   * @returns {Cell}
   */
  decode: (latLon, numBits) => {
    numBits = numBits || 52
    const range: [Range, Range] = getInitRanges()
    const target: Range = [latLon.lon, latLon.lat]
    const cell = new Cell()
    let which: number
    let split: { range: Range, bit: Bit }
    for (let i = 0; i < numBits; i += 1) {
      which = i % 2 ? 1 : 0
      split = splitRange(range[which], target[which])
      range[which] = split.range
      cell.addBit(split.bit)
    }
    return cell
  },

  canDecode: (value) => value &&
    typeof value.lon === 'number' &&
    typeof value.lat === 'number'
})

export default LatLonDec
