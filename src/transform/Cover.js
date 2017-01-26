export {
    Cover as transform,
    canTransform
}

import { Cell, List, BBox } from '../structure'

function Cover(bbox) {
    const swCell = bbox.value.sw.structure
    const neCell = bbox.value.ne.structure
    let cell = Cell().from(swCell)
    let list = List()
    while (cell.lon <= neCell.lon && cell.lat <= neCell.lat) {
        list.addCell(Cell().from(cell))
        cell.lon++
        if (cell.lon > neCell.lon) {
            cell.lon = swCell.lon
            cell.lat++
        }
    }
    return list
}

function canTransform(structure) {
    return structure._type === BBox
        && structure.value.sw.structure._type === Cell
        && structure.value.ne.structure._type === Cell
}
