export default Move

import { bitAdd } from '../helper'
import { LAT, LON } from '../constants'

function Move(bits, pos) {
    bits = bits.slice(0)

    bitAdd(bits, pos[0], LAT)
    bitAdd(bits, pos[1], LON)

    return bits
}
