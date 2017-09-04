/* @flow */

import TransformFactory from './TransformFactory'
import { List, BBox } from '../structure'
import Cell from '../Cell'

import type { Transform } from './'

/**
 * Transforms a BBox structure into a list of cells that covers it
 * @static
 */
const Cover: Transform<BBox, List> = TransformFactory({
  transform: (bbox: BBox) => {
    const [ swCell, neCell ] = bbox.getChildren()
    let lon = swCell.lon()
    let lat = swCell.lat()
    const list = new List()
    let cell
    while (lon <= neCell.lon() && lat <= neCell.lat()) {
      cell = swCell.clone()
      cell.value = [ lon, lat ]
      list.push(cell)
      lon = lon + 1
      if (lon > neCell.lon()) {
        lon = swCell.lon()
        lat = lat + 1
      }
    }
    return list
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

export default Cover
