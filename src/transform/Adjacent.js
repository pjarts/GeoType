/* @flow */

import TransformFactory from './TransformFactory'
import Spread from './Spread'
import { DIR } from '../constants'

import type { Transform } from './'
import type Cell from '../Cell'
import type { List } from '../structure'

const positions: Array<number> = Object.keys(DIR).map(d => DIR[d])

/**
 * Transforms a single cell into a list of all its surrounding neighbors
 */
const Adjacent: Transform<Cell, List> = TransformFactory({
  transform: (cell: Cell) => Spread.transform(cell, positions)
})

export default Adjacent
