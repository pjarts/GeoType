/* @flow */

import { getBit } from './helper'

import type { Bit } from './'

/**
   * @callback BitIterator
   * @param {Bit} bit
   * @param {number} idx bit index
   */
type BitIterator = (bit: Bit, idx: number) => void

/**
 * Class representing a geographical cell
 */
class Cell {
  value: [number, number]
  numBits: number
  /**
   * Create a Cell instance
   * @param {Array<number>} [value=[0, 0]] Pair of integer values representing the longitude and latitude values of the cell
   * @param {number} [numBits=0] Number of bits used for interpreting the value
   */
  constructor (val?: [number, number] = [0, 0], numBits?: number = 0) {
    this.value = val
    this.numBits = numBits
  }
  /**
   * Get/set the cell's longitude value
   * @param {number} [value]
   * @return {number}`
   */
  lon (value: number): number {
    if (typeof value !== 'undefined') {
      this.value[0] = value
    }
    return this.value[0]
  }
  /**
   * Get/set the cell's latitude value
   * @param {number} [value]
   * @return {number}
   */
  lat (value: number): number {
    if (typeof value !== 'undefined') {
      this.value[1] = value
    }
    return this.value[1]
  }
  /**
   * Add a single bit to the cell.
   * @param {Bit} bit Bit to add
   * @returns {Cell} `this`
   */
  addBit (bit: Bit): Cell {
    if (this.numBits === 52) {
      throw new Error('Cannot store more than 52 bits')
    }
    const i = this.numBits % 2 ? 1 : 0
    this.value[i] = (this.value[i] << 1) + bit
    this.numBits += 1
    return this
  }
  /**
   * Add multiple bits to the cell
   * @param {Array<Bit>} bits Array of bits to add
   * @returns {Cell} `this`
   */
  addBits (bits: Array<Bit>): Cell {
    bits.forEach(bit => this.addBit(bit))
    return this
  }
  /**
   * Get the cell's n:th bit
   * @param {number} nBit n:th bit
   * @returns {Bit}
   */
  getBit (nBit: number): Bit {
    const i = (this.numBits - 1 - nBit) % 2
    const numBit = Math.floor(nBit / 2)
    return getBit(this.value[i], numBit)
  }
  /**
   * Run a callback function on the cell's bits, starting from the leftmost bit
   * ending at the rightmost or when the specified count limit is reached
   * @param {BitIterator} cb
   * @param {number} limit Number of bits to iterate over
   * @returns {void}
   */
  forEachBit (cb: BitIterator, limit: number) {
    const endBit = limit ? this.numBits - limit : 0
    let nBit: number = this.numBits - 1
    while (nBit >= endBit) {
      cb(this.getBit(nBit), nBit)
      nBit -= 1
    }
  }

  /**
   * Creates a new Cell instance and copies the current config to it
   * @returns {Cell}
   */
  clone (): Cell {
    return new Cell([this.value[0], this.value[1]], this.numBits)
  }
}

export default Cell
