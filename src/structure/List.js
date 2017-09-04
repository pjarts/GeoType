/* @flow */

import Simple from './Simple'

/** List structure **/
class List extends Simple {
  value: Array<any>
  constructor (value?: Array<any>) {
    super()
    this.value = Array.isArray(value) ? value.slice() : []
  }
  /**
   * Add a Cell to the list
   */
  push (structure: any): List {
    this.value.push(structure)
    return this
  }
  map (transform: Function) {
    this.value = this.value.map(transform)
  }
  getChildren (): Array<any> {
    return this.value
  }
  /**
   * Render into an array
   */
  render (): Array<any> {
    return this.getChildren().map(child => this.renderChild(child))
  }
}

export default List
