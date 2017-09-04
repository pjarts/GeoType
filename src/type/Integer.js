/* @flow */

import TypeFactory from './TypeFactory'
import { getBit } from '../helper'
import Cell from '../Cell'

import type { Type } from './'

/**
 * Decoder/encoder for integer
 * @memberof module:type
 * @static Integer
 * @type {Type}
 */
const Integer: Type<number, Cell> = TypeFactory({
  /**
   * Encodes a `Cell` into an integer
   * @param {Cell} cell [Cell] to encode
   * @param {number} [numBits] Number of bits to use for the encoding
   * @returns {number} Integer
   */
  encode: (cell: Cell, numBits) => {
    let hash: number = 0
    cell.forEachBit((bit) => {
      hash = (hash * 2) + bit
    }, numBits)
    return hash
  },
  /**
   * Decodes an integer into a `Cell`
   * @param {number} hash integer to decode
   * @returns {Cell}
   */
  decode: (hash: number, numBits? = 52) => {
    let nBit: number = numBits - 1
    const cell: Cell = new Cell()
    while (nBit >= 0) {
      cell.addBit(getBit(hash, nBit))
      nBit -= 1
    }
    return cell
  },

  canDecode: (value) => typeof value === 'number' && value % 1 === 0
})

export default Integer
