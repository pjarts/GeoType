export default List

import Container from './Container'

function List(value) {
    let list = Object.create(List.proto)
    list.value = value ? value.map(v => Container(v)) : []
    Object.defineProperty(list, '_type', {
        get() { return List }
    })
    return list
}
List.proto = {
    getContainers() {
        return this.value
    },
    addCell(cell) {
        this.value.push(Container(cell))
        return this
    },
    render() {
        return this.value.map(container => container.render())
    }
}
