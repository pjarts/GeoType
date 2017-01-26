export default Cell

import { getBit } from '../helper'

function Cell(bits) {
    let cell = Object.create(Cell.proto)
    Object.defineProperty(cell, '_type', {
        get() { return Cell }
    })
    cell.value = [0, 0]
    cell.numBits = 0
    if (bits && bits instanceof Array) {
        cell.addBits(bits)
    }
    return cell
}
Cell.proto = {
    get lon() { return this.value[0] },
    set lon(val) { this.value[0] = val },
    get lat() { return this.value[1] },
    set lat(val) { this.value[1] = val },
    addBit(bit) {
        if (this.numBits === 52) {
            throw new Error('Cannot store more than 52 bits')
        }
        var i = this.numBits % 2
        this.value[i] = (this.value[i] << 1) + bit
        this.numBits++
        return this
    },
    addBits(bits) {
        bits.forEach(bit => this.addBit(bit))
        return this
    },
    getBit(n) {
        var i = (this.numBits - 1 - n) % 2
        n = Math.floor(n / 2)
        return getBit(this.value[i], n)
    },
    getBits() {
        let bits = [], numBits = this.numBits
        while(--numBits >= 0) {
            bits.push(this.getBit(numBits))
        }
        return bits
    },
    from(cell) {
        this.value = cell.value.slice()
        this.numBits = cell.numBits
        return this
    }
}
