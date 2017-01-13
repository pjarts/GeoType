GeoCell
=======

JavaScript geographical position encoder/decoder library


## Types
Each type is responsible for decoding from its preferred format to an array of bits and encoding in the reverse direction.
There are a few built in types but if they don't fit your purpose you can easily use your own.


### LatLonDec
An object with latitude and longitude in decimal format. When encoded, adds an error property.
example: `{ lat: 23.456, lon: 45.567, error: { lat: 0.002, lon: 0.002 }}`


### Integer
A geohash in the form of an integer number. Needs to know the number of bits used (max 52).
example: `27098558`


### Base32
A geohash compiled of characters from a base 32 alphabet. Each character represents 5 bits
example: `tuzey`



## Transforms
Transforms data from a decoded type to get adjacent geohashes etc.


### Move
Move to a cell at a given relative position
`GeoCell(type.Integer).transform(transform.Move, [1, 1]).convert(27098558)` move to the cell north east of 27098558


### Spread
Get a list of cells from a list of relative positions.
e.g. Get the north west and west adjacent cells for `tuzey`:
`GeoCell(type.Base32).transform(transform.Spread, [[1, -1], [0, -1]]).convert('tuzey')`



## API
The API is composed of a chain of methods exposed on a GeoCell instance object. The `.convert` method triggers the chain and returns the resulting value.

### GeoCell(Object toType [, Number numBits])
Constructor function that returns an object with methods described below.
`toType`: defines the output type. It can be one of the core types or any object that exposes the `.encode`, `.decode` and `.canDecode` methods
`numBits`: Number of bits to use for the encoding


### .from(Object fromType, [, Number numBits])
`fromType`: If the output and input types differ you need to specify the input type. Can be one of the core types or any object with `.encode`, `.decode` and `.canDecode` methods
`numBits`: Number of bits to use for the decoding


### .transform(Function tFunc [, Mixed opts])
Passes the output of GeoCell.convert to a transform function `tFunc` together with an optional `opts` argument that can contain any data the transform function needs for its processing. You can chain transforms by calling the method multiple times. The value will pass through the transforms from top to bottom.


### .convert(Mixed value)
Takes the input value as argument and triggers the API chain




## Examples

### Conversion
Convert a decimal latlon value to Base32 geohash using 25 bits
```JavaScript
import GeoCell, { type } from 'geocell'

const latLon = { lat: 35.216452, lon: 66.271257 }

let hash = GeoCell(type.Base32)
    .from(type.LatLonDec, 25)
    .convert(latLon)
```

Convert a 50 bit integer hash to 30 bit integer
```JavaScript
import GeoCell, { type } from 'geocell'

const intHash = 957261837123

let hash = GeoCell(type.Integer, 30)
    .from(type.Integer, 50) // integer type always needs to know the number of bits to use for encoding/decoding
    .convert(intHash)
```


### Transform

Get the north eastern neighbor of a base32 hash cell
```JavaScript
import GeoCell, { type, transform } from 'geocell'

const hash = 'c9b32e'

let neighbor = GeoCell(type.Base32)
    .transform(transform.Move, [1, 1])
    .convert(hash)
```

Get all adjacent cells for an integer hash
```JavaScript
import GeoCell, { type, transform } from 'geocell'

const hash = 6842736502

let neighbors = GeoCell(type.Integer)   // same number of bits as input
    .from(type.Integer, 25)
    .transform(transform.Adjacent)
    .convert(hash)
```

From a Base32 hash, get the northern and western neighbors of the fifth cell to the east. Convert the output to LatLon decimal.
```JavaScript
import GeoCell, { type, transform } from 'geocell'

const hash = 'ab302j25cj'

let cells = GeoCell(type.LatLonDec) // same number of bits as the input
    .from(type.Base32) // The Base32 type always uses 5 bits per character, so you don't need to specify the number of bits
    .transform(transform.Move, [0, 5])
    .transform(transform.Spread, [[1, 0], [-1, 0]])
    .convert(hash)
```
