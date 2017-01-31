const Move = {
  transform(cell, pos) {
    const newCell = cell.clone();
    newCell.value[0] += pos[0];
    newCell.value[1] += pos[1];
    return newCell;
  },
};

export default Move;
