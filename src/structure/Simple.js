/* @flow */

class Simple {
  value: any
  constructor (val: any) {
    this.value = val
  }

  getChildren () {
    return [this.value]
  }

  map (transform: Function) {
    this.value = transform(this.value)
  }

  render () {
    return this.renderChild(this.value)
  }

  renderChild (child: any) {
    return child && typeof child.render === 'function'
      ? child.render()
      : child
  }
}

export default Simple
