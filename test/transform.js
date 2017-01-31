import { expect } from 'chai'
import { Adjacent, Cover, Move, Spread } from '../src/transform'

import { Cell, BBox, List } from '../src/structure'

import { DIR } from '../src/constants'

describe('Transform functions', () => {

    describe('Move', () => {
        let center = new Cell()
        center.value = [123, 456]
        center.numBits = 15
        let newCell
        it('should return a cell', () => {
            newCell = Move.transform(center, [2, -5])
            expect(newCell.constructor).to.equal(Cell)
        })
        it('should add position values to the current cell value', () => {
            expect(newCell.value).to.deep.equal([125, 451])
        })
    })

    describe('Spread', () => {
        let center = new Cell()
        center.value = [356, 832]
        center.numBits = 40
        const position = [[0, 1], [1, -1], [-1, -1], [-1, 1]]
        let list
        it('should return a list containing cells with values equal to the sum of the center cell and the position diff', () => {
            list = Spread.transform(center, position)
            expect(list.constructor).to.equal(List)
            list.value.forEach((struct, i) => {
                expect(struct.structure.value)
                    .to.deep.equal(mergeValues(center.value, position[i]))
            })
        })

    })

    describe('Adjacent', () => {
        it('should return all adjacent cells for a given cell', () => {
            let center = new Cell()
            center.value = [1234, 4567]
            center.numBits = 30
            const adjacent = Object.keys(DIR).map(d => DIR[d])
            let list = Adjacent.transform(center)
            expect(list.constructor).to.equal(List)
            list.value.forEach((struct, i) => {
                expect(struct.structure.value)
                    .to.deep.equal(mergeValues(center.value, adjacent[i]))
            })
        })
    })

    describe('Cover', () => {
        it('should return a list of cells that covers the given boundary box', () => {
            const sw = new Cell(), ne = new Cell()
            sw.value = [123, 456]
            sw.numBits = 30
            ne.value = [125, 458]
            ne.numBits = 30
            const expected = [
                [123, 456], [124, 456], [125, 456],
                [123, 457], [124, 457], [125, 457],
                [123, 458], [124, 458], [125, 458],
            ]

            const bbox = new BBox({ sw, ne })
            let list = Cover.transform(bbox)
            expect(list.value.map(struct => struct.structure.value))
                .to.deep.equal(expected)

        })
    })
})

function mergeValues(arr1, arr2) {
    return arr1.map((val, i) => val + arr2[i])
}
