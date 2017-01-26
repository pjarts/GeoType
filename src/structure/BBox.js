export default BBox

import Container from './Container'

function BBox(value) {
    let bbox = Object.create(BBox.proto)
    bbox.value = {
        sw: Container(value.sw),
        ne: Container(value.ne)
    }
    Object.defineProperty(bbox, '_type', {
        get() { return BBox }
    })
    return bbox
}
BBox.proto = {
    getContainers() {
        return [ this.value.sw, this.value.ne ]
    },
    render() {
        return {
            sw: this.value.sw.render(),
            ne: this.value.ne.render()
        }
    }
}
