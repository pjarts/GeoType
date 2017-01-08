GeoType
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

## transforms
Transforms data from a decoded type to get adjacent geohashes etc. They can be infinitely chained.

### Move
Move to a cell at a given relative position
`GeoType(type.Integer).transform(transform.Move, [1, 1]).convert(27098558)` move to the cell north east of 27098558

### Spread
Get a list of cells from a list of relative positions.
e.g. Get the north west and west adjacent cells for `tuzey`:
`GeoType(type.Base32).transform(transform.Spread, [[1, -1], [0, -1]]).convert('tuzey')`

## Interface
```JavaScript
GeoType(type.LatLonDec) // defines the type to return
    .transform(transform.Move, [0, 2]) // Move two cells east
    .transform(transform.Spread, [[1, 0], [-1, 0]]) // Get the closest northern and southern cells
    .from(type.Integer, 25) // Specify the input if it differs from the output type
    .convert(27098558) // The input value to convert
```
