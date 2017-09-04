/* @flow */

import type { Transform } from './transform'
import type { Type } from './type'

const expected = (descr: string, value: any): TypeError => new TypeError(`Expected ${descr}, got ${typeof value}`)

const validate = {
  transform: (trans: Transform<*, *>): Error | null => {
    if (typeof trans !== 'object') {
      return expected('object', trans)
    }
    if (typeof trans.transform !== 'function') {
      return expected('.transform to be a function', trans.transform)
    }
    return null
  },
  type: (type: Type<*, *>): Error | null => {
    if (typeof type !== 'object') {
      return expected('object', type)
    }
    if (typeof type.encode !== 'function') {
      return expected('.encode property to be a function', type.encode)
    }
    if (typeof type.decode !== 'function') {
      return expected('.decode property to be a function', type.decode)
    }
    return null
  }
}

export default validate
