/* @flow */

import Move from './Move'
import Spread from './Spread'
import Adjacent from './Adjacent'
import Cover from './Cover'
import Contain from './Contain'

/**
 * Transforms are used to alter the raw data before it is encoded.
 * @interface Transform
 */

/**
 * @function
 * @name Transform#transform
 * @param {any} value The value to transform
 * @returns {any} Transformed value
 */

/**
 * @function
 * @name Transform#canTransform
 * @param {any} value
 * @returns {boolean}
 */
export interface Transform<I, O> {
  transform: (value: I, opts: any) => O,
  canTransform: any => boolean
}

export {
  Move,
  Spread,
  Adjacent,
  Cover,
  Contain
}

export default {
  Move,
  Spread,
  Adjacent,
  Cover,
  Contain
}
