export default Adjacent

import Spread from './Spread'

const positions = [
    [1, 0] ,     // north
    [1, 1],      // north east
    [0, 1],      // east
    [-1, 1],     // south east
    [-1, 0],     // south
    [-1, -1],    // south west
    [0, -1],     // west
    [1, -1]      // north west
]

/**
 * Returns all adjacent geo cells for a given array of bits
 * @param {Array} bits
 */
function Adjacent(bits) {
    return Spread(bits, positions)
}
