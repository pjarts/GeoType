GeoCell
=======

Swiss army knife for geocell calculation and type conversion.

## Usage

Convert decimal latlon into a 30 bit base 32 hash string
```JavaScript
import GeoCell, { type } from 'geocell'
GeoCell().to(type.Base32)
  .from(type.LatLonDec, 30)
  .convert({ lat: 32.5471, lon: 12.4263})
```

Reduce 40 bit integer hash to 20 bit
```JavaScript
import GeoCell, { type } from 'geocell'
GeoCell().to(type.Integer, 20)
  .from(type.Integer, 40)
  .convert(9248612465)
```

Get all adjacent base 32 hashes for a 30 bit decimal latlon value
```JavaScript
import GeoCell, { type, transform } from 'geocell'
GeoCell().to(type.Base32)
  .from(type.LatLonDec, 30)
  .transform(transform.Adjacent)
  .convert({ lat: 123.1274823, 11.7236252 })
```

### GeoCell(_config_)
The constructor function takes one optional config argument. Usually this is omitted and the config set through the prototype methods instead.

### GeoCell.config
<dl>
  <dt>**fromType**</dt>
  <dd>The type to use for decoding the input value. Defaults to `toType` if undefined.</dd>
</dl>
__fromType__: The type to use for decoding the input value. Defaults to `toType` if undefined.
__fromBits__: Number of bits to use for decoding. Defaults to `toBits` if undefined.
__toType__: The type to use for encoding the final value. Defaults to `fromBits` if undefined.
__toBits__: Number of bits to use for encoding. Defaults to `fromBits` if undefined.
__transforms__: An array of transforms to run the input value through. Will be applied in ascending order.

### GeoCell.prototype.clone()
Returns a new GeoCell instance with a copy of the config

### GeoCell.prototype.convert(_value_)
Takes an input value and decodes it using the from type, runs it through all configured transforms and encodes it using the selected to type. Returns the result.

### GeoCell.prototype.from(_fromType_, [, _fromBits_])
Sets `fromType` and `fromBits` on the config object.
Returns `this`

### GeoCell.prototype.transform(Object transform [, Mixed opts])
Appends a transform to the config's `transforms` array together with an optional second argument that will be passed to the transform function on runtime.


## Types
Each type is responsible for decoding from its preferred format to a Structure object (usually a `Cell`) and encoding in the reverse direction.
There are a few built in types but if they don't fit your purpose you can easily use your own.

### LatLonDec
An object with latitude and longitude in decimal format. When encoded, adds an error property.
example: `{ lat: 23.456, lon: 45.567, error: { lat: 0.002, lon: 0.002 }}`

### Integer
A geohash in the form of an integer number. Needs to know the number of bits used (max 52).
example: `27098558`

### Base32
A geohash compiled of characters from a base 32 alphabet. Each character represents 5 bits so the decode function will know how many bits to use even if you don't specify it specifically.
example: `tuzey`

### BBox
This is a wrapper type that doesn't do any encoding/decoding by itself. Instead it takes a basic type as an argument and uses that to encode/decode a boundary box object
example: `type.BBox(type.Base32)` will decode `{ sw: 'u0jp', ne: 'u0qs' }`

## Transforms
Transforms are used to transform the output of a decoded type before it reaches the output type that finally encodes the value.

### Move
Move to a cell at a given relative position
`GeoCell().to(type.Integer, 20).transform(transform.Move, [1, 1]).convert(27098558)` move to the cell north east of 27098558

### Spread
Get a list of cells from a list of relative positions.
e.g. Get the north west and west adjacent cells for `tuzey`:
`GeoCell().(type.Base32).transform(transform.Spread, [[-1, 1], [-1, 0]]).convert('tuzey')`

### Cover
Get a list of cells that cover a given boundary box.
example: `GeoCell(type.Base32).from(type.BBox(type.Base32)).transform(transform.Cover).convert({ sw: 'u0we4', ne: 'u0wu5' })`

## Structures
Structures are used to carry data through the conversion/transform process and provide a way for transforms and types to work on specific parts of the output. For example the special type BBox will output a BBox structure on decoding, containing two Cell objects (sw, ne). If this is encoded using the Integer type the structure will still be a BBox but with the cells replaced by integer values.

### Cell
The Cell object is the leaf in the structure tree and represents a single geographical cell. It is different from the other structures as it can not hold any sub-structures and doen't have a render() method. All other structures are basically wrappers around this one.

### List
As the name reveals this structure will carry a list of sub-structures and renders into an array.

### BBox
Carries two sub-structures in its `sw` and `ne` properties. Renders into an object like `{ sw: [sub-struct], ne: [sub-struct]}`

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
    .from(type.Integer, 35)
    .transform(transform.Adjacent)
    .convert(hash)
```

From a Base32 hash, get the northern and western neighbors of the fifth cell to the east. Convert the output to LatLon decimal.
```JavaScript
import GeoCell, { type, transform, constant } from 'geocell'

const hash = 'c9b32e'
const { N, W } = constant.DIR

let cells = GeoCell(type.LatLonDec) // same number of bits as the input
    .from(type.Base32) // The Base32 type always uses 5 bits per character, so you don't need to specify the number of bits
    .transform(transform.Move, [5, 0])
    .transform(transform.Spread, [N, W])
    .convert(hash)
```

Get a list of base32 hashes (20 bits) that cover the given decimal LatLon boundary box.
```JavaScript
import GeoCell, { type, transform } from 'geocell'

const bbox = {
    sw: { lat: 48.180738, lon: 10.338135 },
    ne: { lat: 49.185294, lon: 14.309692 }
}

let cells = GeoCell(type.Base32)
    .from(type.BBox(type.LatLonDec), 20)
    .transform(transform.Cover)
    .convert(bbox)
```
