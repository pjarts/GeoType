/* @flow */

import Simple from './Simple'

export type BBoxStructure<T> = {
  sw: T,
  ne: T
}

export type BBoxLiteral<T> = {
  sw: T,
  ne: T
}

/** Bounding box structure **/
class BBox extends Simple {
  value: BBoxStructure<any>
  /**
   * Create a BBox instance
   */
  constructor (value: BBoxLiteral<any>) {
    super()
    const {sw, ne} = value
    this.value = { sw, ne }
  }
  /**
   * Get all containers in the structure
   */
  getChildren (): Array<any> {
    return [this.value.sw, this.value.ne]
  }

  map (transform: Function) {
    this.value.sw = transform(this.value.sw)
    this.value.ne = transform(this.value.ne)
  }
  /**
   * Render into an object literal
   */
  render (): BBoxLiteral<any> {
    return {
      sw: this.renderChild(this.value.sw),
      ne: this.renderChild(this.value.ne)
    }
  }
}

export default BBox
