import { expect } from 'chai'
import GeoType, { type, transform } from '../src'

describe('Transform functions', () => {

    describe('Move', () => {
        const center = "spbpb"
        const adjacent = {
            u0000: [1, 0],
            u0001: [1, 1],
            spbpc: [0, 1],
            spbpd: [-1, 2],
            spbp8: [-1, 0],
            ezzzx: [-1, -1],
            ezzzz: [0, -1],
            gbpbp: [1, -1]
        }
        it('should return the geo box at the given relative position', () => {
            for (let h in adjacent) {
                expect(GeoType(type.Base32)
                    .transform(transform.Move, adjacent[h])
                    .convert(center)
                ).to.equal(h)
            }
        })
    })

    describe('Spread', () => {
        it('should return all geo boxes at the given positions', () => {
            const center = 'sxbpbp'
            const position = [[1, 0], [-1, 1], [-1, -1], [1, -1]]
            const adjacent = ['u80000', 'sxbpbq', 'srzzzy', 'u2pbpb']
            expect(GeoType(type.Base32)
                .transform(transform.Spread, position)
                .convert(center)
            ).to.deep.equal(adjacent)
        })

    })

    describe('Adjacent', () => {
        it('should return all adjacent cells for a given cell', () => {
            const center = 'spczzz'
            const adjacent = [
                'u01bpb',
                'u04000',
                'spfpbp',
                'spfpbn',
                'spczzy',
                'spczzw',
                'spczzx',
                'u01bp8'
            ]
            expect(GeoType(type.Base32)
                .transform(transform.Adjacent)
                .convert(center)
            ).to.deep.equal(adjacent)
        })
    })
})
