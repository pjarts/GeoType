import { expect } from 'chai'

import * as Helper from '../helper'

import { LAT, LON } from '../constants'

describe('Helper', () => {

    describe('bitAdd', () => {
        it('should add the given value to an array of bits', () => {
            let bits = [0, 0, 0, 1, 1, 0]
            Helper.bitAdd(bits, 13)
            expect(bits).to.deep.equal([0, 1, 0, 0, 1, 1])
        })
    })
})
