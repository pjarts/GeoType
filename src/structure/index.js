/* @flow */

export interface Structure {
  value: any,
  getChildren(): Array<any>,
  map(transform: Function): void,
  render(): any
}

/**
 * Structures are transport objects that carries data through the
 * decode/transform/encode process. Their purpose is for Transforms and Types
 * to be able to target and replace specific parts of the data tree. Structures
 * know two things about themselves their containers (attachment points) for
 * sub-structures and what they will render into.
 * @typedef {object} Structure
 * @property {function} getContainers - Returns all present containers in the structure
 * @property {function} render - Renders the structure recursively
 */
export { default as Simple } from './Simple'
export { default as BBox } from './BBox'
export { default as List } from './List'
