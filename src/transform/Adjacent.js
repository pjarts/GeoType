export {
    Adjacent as transform
}

import * as Spread from './Spread'
import { DIR } from '../constants'

const positions = Object.keys(DIR).map(d => DIR[d])

/**
 * Returns all adjacent geo cells for a given array of bits
 * @param {Array} bits
 */
function Adjacent(cell) {
    return Spread.transform(cell, positions)
}
