/* @flow */
import BBox from './BBox'
import Base32 from './Base32'
import Integer from './Integer'
import LatLonDec from './LatLonDec'

export interface Type<E, D> {
  encode: (decoded: D, numBits: ?number) => E,
  decode: (encoded: E, numBits: ?number) => D,
  canEncode: (val: any) => boolean,
  canDecode: (val: any) => boolean
}

export type Bit = 1 | 0

/**
 * Types are responsible for decoding data into a [Structure] object and encoding
 * in the reverse direction.
 * @interface Type
 */

/**
 * @function
 * @name  Type#encode
 * @param {Cell} cell Cell to encode
 * @returns {any} Encoded value
*/

/**
 * @function
 * @name  Type#decode
 * @param {any} value Value to decode
 * @returns {Cell}
*/

/**
 * @function
 * @name Type#canDecode
 * @param {Structure | Cell} structure
 * @returns {boolean}
 */

/**
 * Type Module
 * @module type
 */

export {
  BBox,
  Base32,
  Integer,
  LatLonDec
}

export default {
  BBox,
  Base32,
  Integer,
  LatLonDec
}
