export {
    Move as transform
}

function Move(cell, pos) {
    cell.value[0] += pos[0]
    cell.value[1] += pos[1]
    return cell
}
