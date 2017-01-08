export default Spread

import Move from './Move'

function Spread(bits, positions) {
    positions = positions || [
        [1, -1],  // top left
        [1, 0],   // top
        [1, 1],   // top right
        [0, 1],   // right
        [-1, 1],  // bottom right
        [-1, 0],  // bottom
        [-1, -1], // bottom left
        [ 0, -1]  // left
    ]

    return positions.map(pos => Move(bits, pos))
}
