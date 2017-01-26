import { expect } from 'chai'

import { getBit, transformStructure } from '../src/helper'
import { LAT, LON } from '../src/constants'
import { Cell, List, BBox, Container } from '../src/structure'

describe('Helper', () => {

    describe('getBit', () => {
        it('should return the bit at a given position from an integer', () => {
            expect(getBit(16, 4)).to.equal(1)
            expect(getBit(Math.pow(2, 51), 51)).to.equal(1)
            expect(getBit(Math.pow(2, 51), 40)).to.equal(0)
        })
    })

    describe('transformStructure', () => {
        const getStructure = () => List([
            BBox({ sw: Cell([1,1,0,0,1]), ne: Cell([1,1,0,1,1])}),
            BBox({
                sw: List([Cell([0,0,1,1,0]), Cell([0,1,1,0,1])]),
                ne: List([Cell([0,0,0,1,0]), Cell([0,0,1,0,0])]),
            })
        ])

        it('should be possible to run transform functions on cells', () => {
            let container = Container(getStructure())
            container.structure = transformStructure(
                container.structure,
                (struct) => struct._type === Cell,
                (cell) => cell.getBits().reduce((prev, cur) => prev + cur)
            )
            expect(container.render()).to.deep.equal([
                { sw: 3, ne: 4 },
                {
                    sw: [ 2, 3 ],
                    ne: [ 1, 1 ]
                }
            ])
        })

        it('should be possible to run transform functions on any matching structure hierarchy', () => {
            let container = Container(getStructure())
            container.structure = transformStructure(
                container.structure,
                (struct) => struct._type === BBox && struct.value.sw.structure._type === List,
                (bbox) => "where's the bbox?"
            )
            let result = container.render()
            expect(result[0]).to.include.keys(['sw', 'ne'])
            expect(result[1]).to.equal("where's the bbox?")
        })

        it('should be unchanged if no stuctures match', () => {
            let structure = getStructure()
            structure = transformStructure(
                structure,
                () => false,
                () => 'change nothing'
            )
            expect(structure).to.deep.equal(getStructure())
        })
    })
})
