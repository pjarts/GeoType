/* @flow */

import TypeFactory from './TypeFactory'
import Cell from '../Cell'
import { getBit } from '../helper'

import type { Type } from './'

const CHAR_MAP = '0123456789bcdefghjkmnpqrstuvwxyz'
const CHAR_BITS = 5

/**
 * Decoder/Encoder for Base32
 * @memberOf module:type
 * @static Base32
 * @type {Type}
 */
const Base32: Type<string, Cell> = TypeFactory({
  /**
   * Encodes a `Cell` into a base 32 hash
   * @param {Cell} cell [Cell] to encode
   * @param {number} [numBits] Number of bits to use for the encoding
   * @returns {string} Base64 hash
   */
  encode: (cell: Cell, numBits) => {
    let hash = ''
    let charVal = 0
    let i = 1
    cell.forEachBit((bit) => {
      charVal = (charVal * 2) + bit
      if (i % 5 === 0) {
        hash += CHAR_MAP[charVal]
        charVal = 0
      }
      i += 1
    }, numBits)
    return hash
  },
  /**
   * Decodes a base 32 hash into a `Cell`
   * @param {string} [hash] Base64 hash to decode
   * @returns {Cell}
   */
  decode: (hash: string) => {
    const cell = new Cell()
    let val
    let curBit
    hash.split('').forEach((char) => {
      val = CHAR_MAP.indexOf(char)
      curBit = CHAR_BITS - 1
      while (curBit >= 0) {
        cell.addBit(getBit(val, curBit))
        curBit -= 1
      }
    })
    return cell
  },

  canDecode: (value) => value && typeof value === 'string'
})

export default Base32
