export {
    Spread as transform
}

import * as Move from './Move'
import { List, Cell } from '../structure'

function Spread(cell, positions) {
    positions = positions || []
    return List(positions.map(pos => Move.transform(Cell().from(cell), pos)))
}
