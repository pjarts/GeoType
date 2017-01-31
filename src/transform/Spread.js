import Move from './Move';
import { List } from '../structure';

const Spread = {
  transform(cell, positions = []) {
    return new List(
      positions.map(pos => Move.transform(cell.clone(), pos)),
    );
  },
};

export default Spread;
