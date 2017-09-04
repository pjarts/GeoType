/* @flow */

import TypeFactory from './TypeFactory'
import type { BBoxLiteral, BBoxStructure } from '../structure/BBox'
import Cell from '../Cell'
import { BBox as BBoxStruct } from '../structure'

import type { Type } from './'

type BBoxType<E, D> = (type: Type<E, D>) => Type<BBoxLiteral<E>, BBoxStructure<D>>

/**
 * Takes a [Type] as argument and wraps its methods in order to work with
 * a bounding box object literal `{ sw: {*}, ne: {*} }`
 * @memberOf module:type
 * @param {Type} type The [Type] that should be used for encoding/decoding the sw and ne values
 * @returns {Type}
 */
const BBox: BBoxType<any, Cell> = (type) => TypeFactory({
  encode: (bbox: BBoxStruct, bits) => ({
    sw: type.encode(bbox.value.sw, bits),
    ne: type.encode(bbox.value.ne, bits)
  }),
  decode: (bbox: BBoxLiteral<any>, bits) => new BBoxStruct({
    sw: type.decode(bbox.sw, bits),
    ne: type.decode(bbox.ne, bits)
  }),
  canEncode: (struct) => struct.constructor === BBoxStruct &&
    struct.getChildren().every(child => child.constructor === Cell),
  canDecode: (value) => type.canDecode(value.sw) && type.canDecode(value.ne)
})

export default BBox
