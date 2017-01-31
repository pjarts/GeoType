import Spread from './Spread';
import { DIR } from '../constants';

const positions = Object.keys(DIR).map(d => DIR[d]);

const Adjacent = {
  transform: cell => Spread.transform(cell, positions),
};

export default Adjacent;
