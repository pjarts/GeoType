import { expect } from 'chai'

import { getBit, transformStructure } from '../src/helper'
import { LAT, LON } from '../src/constants'
import Cell from '../src/Cell'
import { List, BBox, Simple } from '../src/structure'

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
      new BBox({
        sw: new Cell([5, 2]),
        ne: new Cell([5, 3])
      }),
      new BBox({
        sw: new List([
          new Cell([2, 1]),
          new Cell([3, 2])
        ]),
        ne: new List([
          new Cell([0, 1]),
          new Cell([2, 0])])
      })
    ])

    it('should be possible to run transform functions on cells', () => {
      let structure = getStructure();
      structure = transformStructure(
        structure,
        (struct) => struct.constructor === Cell,
        (cell) => cell.lat() + cell.lon()
      )
      expect(structure.render()).to.deep.equal([
        { sw: 7, ne: 8 },
        {
          sw: [ 3, 5 ],
          ne: [ 1, 2 ]
        }
      ])
    })

    it('should be possible to run transform functions on any matching structure hierarchy', () => {
      let root = getStructure()
      transformStructure(
          root,
          (struct) => struct.constructor === BBox && struct.value.sw.constructor === List,
          (bbox) => "where's the bbox?"
      )
      let result = root.render()
      expect(result[0]).to.include.keys(['sw', 'ne'])
      expect(result[1]).to.equal("where's the bbox?")
    })

    it('should be unchanged if no stuctures match', () => {
      let structure = getStructure()
      transformStructure(
          structure,
          () => false,
          () => 'change nothing'
      )
      expect(structure).to.deep.equal(getStructure())
    })
  })
})
