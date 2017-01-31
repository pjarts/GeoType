import * as type from './type';
import * as transform from './transform';
import { Container } from './structure';
import * as constant from './constants';
import validate from './validate';
import { transformStructure, isCell } from './helper';

class GeoCell {
  constructor(config = {}) {
    this.config = config;
    this.config.transforms = config.transforms || [];
  }
  clone() {
    const clone = new GeoCell(Object.assign({}, this.config));
    clone.config.transforms = clone.config.transforms.slice();
    return clone;
  }
  from(fromType, fromBits) {
    const err = validate.type(fromType);
    if (err) {
      err.message = `Invalid from-type. ${err.message}`;
      throw err;
    }
    this.config.fromType = fromType;
    this.config.fromBits = fromBits;
    return this;
  }
  to(toType, toBits) {
    const err = validate.type(toType);
    if (err) {
      err.message = `Invalid to-type. ${err.message}`;
      throw err;
    }
    this.config.toType = toType;
    this.config.toBits = toBits;
    return this;
  }
  transform(trans, opts) {
    const err = validate.transform(trans);
    if (err) {
      err.message = `Invalid transform object. ${err.message}`;
      throw err;
    }
    this.config.transforms.push(Object.assign({ opts }, trans));
    return this;
  }
  convert(value) {
    const c = this.config;
    const fromType = c.fromType || c.toType;
    const fromBits = c.fromBits || c.toBits;
    const toType = c.toType || c.fromType;
    const toBits = c.toBits || c.fromBits;
    // decode
    let output = fromType.decode(value, fromBits);
    // transform
    c.transforms.forEach((t) => {
      output = transformStructure(
        output,
        t.canTransform || isCell,
        structure => t.transform(structure, t.opts),
      );
    });
    // encode
    output = transformStructure(
      output,
      toType.canEncode || isCell,
      structure => toType.encode(structure, toBits),
    );
    return new Container(output).render();
  }
}

export default GeoCell;

export {
  constant,
  type,
  transform,
};
