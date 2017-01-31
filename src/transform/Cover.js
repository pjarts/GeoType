import { Cell, List, BBox } from '../structure';

const Cover = {
  transform(bbox) {
    const swCell = bbox.value.sw.structure;
    const neCell = bbox.value.ne.structure;
    const cell = swCell.clone();
    const list = new List();
    while (cell.lon <= neCell.lon && cell.lat <= neCell.lat) {
      list.addCell(cell.clone());
      cell.lon += 1;
      if (cell.lon > neCell.lon) {
        cell.lon = swCell.lon;
        cell.lat += 1;
      }
    }
    return list;
  },
  canTransform(struct) {
    return struct.constructor === BBox
      && struct.value.sw.structure.constructor === Cell
      && struct.value.ne.structure.constructor === Cell;
  },
};

export default Cover;
