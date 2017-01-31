import { expect } from 'chai'
import GeoCell, { type, transform, constant } from '../src'

describe('Examples', () => {
  describe('Conversion', () => {
    it('should "Convert a decimal latlon value to Base32 geohash using 25 bits"', () => {
      const latLon = { lat: 35.216452, lon: 66.271257 }

      let hash = new GeoCell().to(type.Base32)
      .from(type.LatLonDec, 25)
      .convert(latLon)

      expect(hash).to.equal('tqr0k')
    })

    it('should "Convert a 50 bit integer hash to 30 bit integer"', () => {
      const intHash = 957261837123

      let hash = new GeoCell().to(type.Integer, 30)
      .from(type.Integer, 50) // integer type always needs to know the number of bits to use for encoding/decoding
      .convert(intHash)

      expect(hash).to.equal(912916)
    })

    it('should "Get the north eastern neighbor of a base32 hash cell"', () => {
      const hash = 'c9b32e'

      let neighbor = new GeoCell().to(type.Base32)
      .transform(transform.Move, [1, 1])
      .convert(hash)

      expect(neighbor).to.equal('c9b32u')
    })

    it('should "Get all adjacent cells for an integer hash"', () => {
      const hash = 6842736502

      let neighbors = new GeoCell().to(type.Integer)   // same number of bits as input
      .from(type.Integer, 35)
      .transform(transform.Adjacent)
      .convert(hash)

      expect(neighbors).to.deep.equal([
        6842736508,
        6842736509,
        6842736503,
        6842736501,
        6842736500,
        6842736497,
        6842736499,
        6842736505
      ])
    })

    it('should "From a Base32 hash, get the northern and western neighbors of the fifth cell to the east. Convert the output to LatLon decimal."', () => {
      const hash = 'c9b32e'
      const { N, W } = constant.DIR

      let cells = new GeoCell().to(type.LatLonDec) // same number of bits as the input
      .from(type.Base32) // The Base32 type always uses 5 bits per character, so you don't need to specify the number of bits
      .transform(transform.Move, [5, 0])
      .transform(transform.Spread, [N, W])
      .convert(hash)

      expect(cells).to.deep.equal([
        {
          lon: -112.0660400390625,
          lat: 55.08819580078125,
          error: { lon: 0.0054931640625, lat: 0.00274658203125 }
        },
        {
          lon: -112.0770263671875,
          lat: 55.08270263671875,
          error: { lon: 0.0054931640625, lat: 0.00274658203125 }
        }
      ])
    })


    it('should "Get a list of base32 hashes (20 bits) that cover the given decimal LatLon boundary box."', () => {
      const bbox = {
        sw: { lat: 48.180738, lon: 10.338135 },
        ne: { lat: 49.185294, lon: 14.309692 }
      }

      let cells = new GeoCell().to(type.Base32)
      .from(type.BBox(type.LatLonDec), 20)
      .transform(transform.Cover)
      .convert(bbox)

      expect(cells).to.deep.equal([
        'u0x6',
        'u0xd',
        'u0xf',
        'u284',
        'u286',
        'u28d',
        'u28f',
        'u294',
        'u296',
        'u29d',
        'u29f',
        'u2d4',
        'u0x7',
        'u0xe',
        'u0xg',
        'u285',
        'u287',
        'u28e',
        'u28g',
        'u295',
        'u297',
        'u29e',
        'u29g',
        'u2d5',
        'u0xk',
        'u0xs',
        'u0xu',
        'u28h',
        'u28k',
        'u28s',
        'u28u',
        'u29h',
        'u29k',
        'u29s',
        'u29u',
        'u2dh',
        'u0xm',
        'u0xt',
        'u0xv',
        'u28j',
        'u28m',
        'u28t',
        'u28v',
        'u29j',
        'u29m',
        'u29t',
        'u29v',
        'u2dj',
        'u0xq',
        'u0xw',
        'u0xy',
        'u28n',
        'u28q',
        'u28w',
        'u28y',
        'u29n',
        'u29q',
        'u29w',
        'u29y',
        'u2dn',
        'u0xr',
        'u0xx',
        'u0xz',
        'u28p',
        'u28r',
        'u28x',
        'u28z',
        'u29p',
        'u29r',
        'u29x',
        'u29z',
        'u2dp'
      ])
    })
  })
})
