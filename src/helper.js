/* @flow */
import Cell from './Cell'

import type { Bit, Range } from './'
import type { Structure } from './structure'

export const getBit = (value: number, bit: number): Bit => (value / (2 ** bit)) & 0x01
export const getInitRanges = (): [Range, Range] => [[-180, 180], [-90, 90]]

/**
* Run callback on all structures in a tree where test returns true
*/
export const transformStructure = (
  root: any,
  matchVal: (val: any) => boolean,
  processVal: (val: any) => mixed,
): mixed => {
  if (matchVal(root) === true) {
    return processVal(root)
  }
  if (typeof root.map === 'function') {
    root.map((child) => transformStructure(child, matchVal, processVal))
  }
  return root
}

export default {
  getBit,
  getInitRanges,
  transformStructure
}
