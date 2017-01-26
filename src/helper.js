import { LAT, LON } from './constants'

export function getBit(value, bit) {
    if (bit > 30) {
        return getBit(value / Math.pow(2, bit - 30), 30)
    }
    return (value & 1 << bit) === 0 ? 0 : 1
}

export function getInitRanges() {
    return [ [-180, 180], [-90, 90] ]
}

/**
 * Run callback on all structures in a tree where test returns true
 * @param  {Object}   root
 * @param  {Function}   test
 * @param  {Function} cb
 * @return {Mixed}
 */
export function transformStructure(root, matchStruct, cb) {
    if (matchStruct(root) === true) {
        return cb(root)
    }
    if (typeof root.getContainers === 'function') {
        root.getContainers().forEach(container => {
            container.structure = transformStructure(container.structure, matchStruct, cb)
        })
    }
    return root
}
