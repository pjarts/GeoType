import Cell from '../Cell'

import type { Type } from './'
/**
 * Default type that all other types inherit from
 * @type {Type}
 */
const Default: Type<null, Cell> = {
  encode: (data) => null,
  decode: (value) => new Cell(),
  canEncode: (obj) => obj.constructor === Cell,
  canDecode: (value) => false
}

/**
 * Factory for creating Type objects
 * @param  {type} Type
 * @return {Type}
 */
const TypeFactory = (type: Type): Type => {
  return Object.assign({}, Default, type)
}

export default TypeFactory
