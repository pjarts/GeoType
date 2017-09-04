import Cell from '../Cell'

/**
 * Default transform type that all other transforms inherit from
 * @type {Transform}
 */
const Default = {
  transform: structure => structure,
  canTransform: structure => structure.constructor === Cell
}

/**
 * Factory function for creating new Transform objects
 * @param  {transform} Transform
 * @return {Transform}
 */
const TransformFactory = (transform) => {
  return Object.assign({}, Default, transform)
}

export default TransformFactory
