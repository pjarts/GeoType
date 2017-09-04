import { expect } from 'chai'

import * as type from '../src/type'

import Cell from '../src/Cell'
import { BBox } from '../src/structure'

describe('Types', () => {
  describe('LatLonDec', () => {
    const latLon = {
      lat: 10.546875,
      lon: 78.046875,
      error: {
        lat: 0.703125,
        lon: 0.703125
      }
    }
    let cell, bits = 15

    it('should decode a latLon object to a cell', () => {
      cell = type.LatLonDec.decode(latLon, bits)
      expect(cell.constructor).to.equal(Cell)
    })

    it('should encode a cell into a latLon obect', () => {
      expect(type.LatLonDec.encode(cell)).to.deep.equal(latLon)
    })
  })

  describe('Base32', () => {
    const bits = 25
    const hash = 'tuzey'
    let cell

    it('should decode a Base32 hash string into a cell', () => {
      cell = type.Base32.decode(hash)
      expect(cell.constructor).to.equal(Cell)
    })
    it('should encode back to the same hash', () => {
      expect(type.Base32.encode(cell)).to.equal(hash)
    })
  })

  describe('Integer', () => {
    const bits = 25
    const val = 27098558
    let cell
    it('should decode an integer into a cell', () => {
      cell = type.Integer.decode(val, bits)
      expect(cell.constructor).to.equal(Cell)
    })
    it('should encode back to the same value', () => {
      expect(type.Integer.encode(cell)).to.equal(val)
    })
  })

  describe('BBox', () => {
    const value = { sw: 2612486, ne: 7124571 }
    const bits = 40
    let bbox
    it('should decode a bounding box object', () => {
      bbox = type.BBox(type.Integer).decode(value, bits)
      expect(bbox.constructor).to.equal(BBox)
    })
    it('should encode back to the same value', () => {
      expect(type.BBox(type.Integer).encode(bbox)).to.deep.equal(value)
    })
  })
})
