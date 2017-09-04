/* @flow */

import TransformFactory from './TransformFactory'
import Cell from '../Cell'

import type { Transform } from './'

/**
 * Transforms a cell by moving it to a specified relative position
 * @static
 */
const Move: Transform<Cell, Cell> = TransformFactory({
  transform: (cell: Cell, pos: [number, number]) => {
    const newCell = cell.clone()
    newCell.value[0] += pos[0]
    newCell.value[1] += pos[1]
    return newCell
  }
})

export default Move
