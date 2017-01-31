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
        const getStructure = () => new List([
            new BBox({ sw: new Cell([1,1,0,0,1]), ne: new Cell([1,1,0,1,1])}),
            new BBox({
                sw: new List([new Cell([0,0,1,1,0]), new Cell([0,1,1,0,1])]),
                ne: new List([new Cell([0,0,0,1,0]), new Cell([0,0,1,0,0])]),
            })
        ])

        it('should be possible to run transform functions on cells', () => {
            let container = new Container(getStructure())
            container.structure = transformStructure(
                container.structure,
                (struct) => struct.constructor === Cell,
                (cell) => cell.lat + cell.lon
            )
            expect(container.render()).to.deep.equal([
                { sw: 7, ne: 8 },
                {
                    sw: [ 3, 5 ],
                    ne: [ 1, 2 ]
                }
            ])
        })

        it('should be possible to run transform functions on any matching structure hierarchy', () => {
            let container = new Container(getStructure())
            container.structure = transformStructure(
                container.structure,
                (struct) => struct.constructor === BBox && struct.value.sw.structure.constructor === List,
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
