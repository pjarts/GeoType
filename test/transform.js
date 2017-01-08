import { expect } from 'chai'
import GeoType, { type, transform } from '../'

describe('Transform functions', function() {

    describe('Move', function() {
        var center = "spbpb"
        var adjacent = {
            u0000: [1, 0],
            u0001: [1, 1],
            spbpc: [0, 1],
            spbpd: [-1, 2],
            spbp8: [-1, 0],
            ezzzx: [-1, -1],
            ezzzz: [0, -1],
            gbpbp: [1, -1]
        }
        it('should return the geo box at the given relative position', function() {
            for (var h in adjacent) {
                expect(GeoType(type.Base32)
                    .transform(transform.Move, adjacent[h])
                    .convert(center)
                ).to.equal(h)
            }
        })
    })

    describe('Spread', function() {
        it('should return all geo boxes at the given positions', function() {
            var center = 'sxbpbp'
            var position = [[1, 0], [-1, 1], [-1, -1], [1, -1]]
            var adjacent = ['u80000', 'sxbpbq', 'srzzzy', 'u2pbpb']
            expect(GeoType(type.Base32)
                .transform(transform.Spread, position)
                .convert(center)
            ).to.deep.equal(adjacent)
        })

    })
})
