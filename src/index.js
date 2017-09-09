/* @flow */

import type { Type } from './type'
import type { Transform } from './transform'
import { Simple } from './structure'

import * as type from './type'
import * as transform from './transform'
import * as constant from './constants'
import validate from './validate'
import { transformStructure } from './helper'

/**
 * @typedef {1|0} Bit
 */
export type Bit = 1 | 0

/**
 * @typedef {Array<number>} Range
 */
export type Range = Array<number>

/**
 * GeoCellConfig Type
 * @typedef {Object} GeoCellConfig
 * @property {number} [fromBits] Number of bits to use for decoding
 * @property {number} [toBits] Number of bits to use for encoding
 * @property {Type} [fromType] Type to use for decoding
 * @property {Type} [toType] Type to use for encoding
 * @property {Array<Transform>} [propName] [description]
 */
type GeoCellConfig = {
  fromBits?: number,
  toBits?: number,
  fromType?: Type<*, *>,
  toType?: Type<*, *>,
  transforms?: Array<Transform<*, *> & { opts: any }>
}
/**
 * Class for conversion and transformation of geo cell data
 */
class GeoCell {
  /**
   * @private
   * @type {GeoCellConfig}
   */
  config: GeoCellConfig
  /**
   * Create a new GeoCell instance
   * @param {GeoCellConfig} [config={}] - Configuration object to initialize the GeoCell with
   */
  constructor (config: GeoCellConfig = {}) {
    this.config = config
    this.config.transforms = config.transforms || []
  }
  /**
   * Create a new GeoCell instance with a copy of the config
   * @returns {GeoCell} new GeoCell instance
   */
  clone (): GeoCell {
    const clone: GeoCell = new GeoCell(Object.assign({}, this.config))
    if (this.config.transforms) {
      clone.config.transforms = this.config.transforms.slice()
    }
    return clone
  }
  /**
   * Set the [Type] that should decode the input and how many bits it should use
   * @param {Type} fromType Type to use for decoding
   * @param {number} [fromBits] Number of bits to use for the decoding
   * @returns {GeoCell} `this`
   */
  from (fromType: Type<*, *>, fromBits?: number): GeoCell {
    const err: Error | null = validate.type(fromType)
    if (err) {
      err.message = `Invalid from-type. ${err.message}`
      throw err
    }
    this.config.fromType = fromType
    this.config.fromBits = fromBits
    return this
  }
  /**
   * Set the [Type] that should encode the output and how many bits it should use
   * @param {Type} toType Type to use for encoding the decoded value
   * @param {number} [toBits] Number of bits to use for the encoding
   * @returns {GeoCell} `this`
   */
  to (toType: Type<*, *>, toBits?: number): GeoCell {
    const err: Error | null = validate.type(toType)
    if (err) {
      err.message = `Invalid to-type. ${err.message}`
      throw err
    }
    this.config.toType = toType
    this.config.toBits = toBits
    return this
  }
  /**
   * Add a transform to use in the conversion.
   * @param {Transform} transform Transformation to add
   * @param {any} opts Extra options that will be sent to the transform when processing
   * @returns {GeoCell} `this`
   */
  transform (trans: Transform<*, *>, opts: any): GeoCell {
    const err: Error | null = validate.transform(trans)
    if (err) {
      err.message = `Invalid transform object. ${err.message}`
      throw err
    }
    this.config.transforms = this.config.transforms || []
    this.config.transforms.push(Object.assign({}, trans, { opts }))
    return this
  }
  /**
   * Convert a value using the configured [Type]s and [Trransformation]s
   * @param {mixed} [value] Value to convert
   * @returns {mixed} Converted value
   */
  convert (value: mixed): mixed {
    const c = this.config
    const fromType = c.fromType || c.toType
    const fromBits = c.fromBits || c.toBits
    const toType = c.toType || c.fromType
    const toBits = c.toBits || c.fromBits
    if (!(fromType && toType)) {
      throw new Error('Cannot convert since neither `fromType` or `toType` is set')
    }
    // build array of value modifiers
    const modifiers = [
      // decoder
      {
        process: (value) => fromType.decode(value, fromBits),
        canProcess: fromType.canDecode
      },
      // transforms
      ...(c.transforms || []).map((t) => ({
        process: (value) => t.transform(value, t.opts),
        canProcess: t.canTransform
      })),
      // encoder
      {
        process: (value) => toType.encode(value, toBits),
        canProcess: toType.canEncode
      }
    ]
    // modify decoded value
    let output = value
    modifiers.forEach(m => {
      output = transformStructure(output, m.canProcess, m.process)
    })
    return new Simple(output).render()
  }
}

export default GeoCell

export {
  constant,
  type,
  transform
}
