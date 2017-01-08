import { expect } from 'chai'
import GeoType, { type, transform } from '../'

describe('Interface', () => {
    it('should be possible to convert from one type to another', () => {
        const latLon = {
            lat: 10.546875,
            lon: 78.046875,
        }
        const converted = GeoType(type.Integer, 25).from(type.LatLonDec).convert(latLon)
        expect(converted).to.be.a('number')
    })

    it('should throw an error if trying to convert to an invalid type', () => {
        expect(() => GeoType({})).to.throw(Error, /Cannot convert to type/)
    })

    it('should throw an error if trying to convert from an invalid type', () => {
        expect(() => GeoType(type.Integer).from()).to.throw(Error, /Cannot convert from type/)
    })
})
