import { expect } from 'chai'
import GeoCell, { type, transform } from '../src'

describe('Interface', () => {
    it('should be possible to convert from one type to another', () => {
        const latLon = {
            lat: 10.546875,
            lon: 78.046875,
        }
        const converted = new GeoCell().to(type.Integer, 25).from(type.LatLonDec).convert(latLon)
        expect(converted).to.be.a('number')
    })

    it('should throw an error if trying to convert to an invalid type', () => {
        expect(() => new GeoCell().to({})).to.throw(Error, 'Invalid to-type')
    })

    it('should throw an error if trying to convert from an invalid type', () => {
        expect(() => new GeoCell().to(type.Integer).from()).to.throw(Error, 'Invalid from-type')
    })

    it('should be possible to transform data from a single cell', () => {
        expect(new GeoCell().to(type.Base32)
            .transform(transform.Spread, [[2,4], [-3,-1]])
            .convert('u8zz')
        ).to.deep.equal(['uc07', 'u8zn'])
    })

    it('should be possible to create converters that extend from the same instance but are independant from each other', () => {
        const toInteger = new GeoCell().to(type.Integer, 24)
        const base32ToInt = toInteger.clone().from(type.Base32)
        const latLonToInt = toInteger.clone().from(type.LatLonDec)
        expect(latLonToInt).to.not.equal(base32ToInt)
        expect(latLonToInt.config).to.not.equal(base32ToInt.config)
        expect(base32ToInt.config.fromType).to.not.equal(latLonToInt.config.fromType)
    })

    it('should be possible to create transformers that extend from the same instance but are independant from each other', () => {
        const getE = new GeoCell().to(type.Base32).transform(transform.Move, [1, 0])
        const getNE = getE.clone().transform(transform.Move, [0, 1])
        expect(getE.config.transforms).to.not.equal(getNE.config.transforms)
    })



})
