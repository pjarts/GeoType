import { expect } from 'chai'

import * as LatLonDec from '../src/type/LatLonDec'
import * as Base32 from '../src/type/Base32'
import * as Integer from '../src/type/Integer'

describe('Types', () => {
    describe('LatLonDec', () => {
        const bits = [1,1,0,0,1,0,1,0,0,1,1,1,1,1,1]
        const latLon = {
            lat: 10.546875,
            lon: 78.046875,
            error: {
                lat: 0.703125,
                lon: 0.703125
            }
        }

        it('should decode a latLon object', () => {
            expect(LatLonDec.decode(latLon, bits.length)).to.deep.equal(bits)
        })

        it('should encode into a latLon obect', () => {
            expect(LatLonDec.encode(bits)).to.deep.equal(latLon)
        })
    })

    describe('Base32', () => {
        const bits = [1,1,0,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0]
        const hash = 'tuzey'

        it('should decode a Base32 hash string', () => {
            expect(Base32.decode(hash)).to.deep.equal(bits)
        })
        it('should encode into a base 32 string', () => {
            expect(Base32.encode(bits)).to.equal(hash)
        })
    })

    describe('Integer', () => {
        const bits = [1,1,0,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0]
        const val = 27098558
        it('should decode an integer', () => {
            expect(Integer.decode(val, bits.length)).to.deep.equal(bits)
        })
        it('should encode into an integer', () => {
            expect(Integer.encode(bits)).to.equal(val)
        })
    })

})
