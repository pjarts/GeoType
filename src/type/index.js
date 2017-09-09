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

/**
 * @module types
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
