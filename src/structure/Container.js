export default Container

function Container(struct) {
    let container = Object.create(Container.proto)
    container.structure = struct
    Object.defineProperty(container, '_type', {
        get() { return Container }
    })
    return container
}
Container.proto = {
    render() {
        if (typeof this.structure.render === 'function') {
            return this.structure.render()
        }
        return this.structure
    }
}
