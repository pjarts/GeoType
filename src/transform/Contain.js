/* @flow */

import TransformFactory from './TransformFactory'
import { BBox } from '../structure'
import Cell from '../Cell'
import Cover from './Cover'
import Move from './Move'
import { DIR } from '../constants'

import type { Transform } from './'
import type { List } from '../structure'

/**
 * Transforms a BBox structure into a list of cells that it contains
 * @static
 */
const Contain: Transform<BBox, List> = TransformFactory({
  transform: (bbox: BBox) => {
    const [ sw, ne ] = bbox.getChildren()
    return Cover.transform(new BBox({
      sw: Move.transform(sw, DIR.NE),
      ne: Move.transform(ne, DIR.SW)
    }))
  },
  /**
   * Check if an object can be transformed.
   * Will only transform BBox structures containing Cells
   */
  canTransform: (obj) => {
    return obj.constructor === BBox &&
      obj.getChildren().every(obj => obj.constructor === Cell)
  }
})

export default Contain
