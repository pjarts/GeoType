import { LAT, LON } from './constants'

export function getBit(value, bit) {
    return (value & 1 << bit) === 0 ? 0 : 1
}

export function getInitRanges() {
    return {
        [LAT]: [-90, 90],
        [LON]: [-180, 180]
    }
}

export function which(bit) {
    return bit % 2 === 0 ? LON : LAT
}

export function getLastBit(bits, angle) {
    const bitLengthIsEven = bits.length % 2 === 0
    let lastBit = bits.length - 1
    if (bitLengthIsEven && angle === LON || !bitLengthIsEven && angle === LAT) {
        lastBit--
    }
    return lastBit
}

export function bitAdd(bits, value, angle) {
    const changeBit = value > 0 ? 1 : 0
    const dir = value > 0 ? 1 : -1
    const lastBit = angle ? getLastBit(bits, angle) : bits.length - 1
    const step = angle ? 2 : 1
    let curBit = lastBit
    while (value && curBit >= 0) {
        if (bits[curBit] !== changeBit) {
            bits[curBit] = 1 - bits[curBit]
            value -= dir
            curBit = lastBit
        } else {
            bits[curBit] = 1 - bits[curBit]
            curBit -= step
        }
    }
}
