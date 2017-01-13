import { expect } from 'chai'

import * as Helper from '../src/helper'

import { LAT, LON } from '../src/constants'

describe('Helper', () => {

    describe('bitAdd', () => {
        it('should add the given value to an array of bits', () => {
            let bits = [0, 0, 0, 1, 1, 0]
            Helper.bitAdd(bits, 13)
            expect(bits).to.deep.equal([0, 1, 0, 0, 1, 1])
        })
    })

    describe('getLastBitIdx', () => {
        it('should return the index of the last bit for the given angle', () => {
            const bits = [1, 0, 1, 1, 0, 1, 0]
            expect(Helper.getLastBitIdx(bits, LAT)).to.equal(5)
            expect(Helper.getLastBitIdx(bits, LON)).to.equal(6)
        })
    })
})
