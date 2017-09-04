/* @flow */

import Move from './Move'
import { List } from '../structure'
import TransformFactory from './TransformFactory'

import type Cell from '../Cell'
import type { Transform } from './'

/**
 * Transforms a single cell into a list of cells matching the given
 * relative positions
 * @static
 */
const Spread: Transform<Cell, List> = TransformFactory({
  transform: (cell: Cell, positions: Array<Array<number>> = []) => new List(
    positions.map(pos => Move.transform(cell, pos))
  )
})

export default Spread
