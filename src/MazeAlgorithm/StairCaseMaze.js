const boundaryMaker = (grid) => {
  const row = grid.length;
  const col = grid[0].length;

  for (let i = 0; i < row; i++) grid[i][0] = true;

  for (let i = row - 1; i >= 0; i--) grid[i][col - 1] = true;

  for (let i = 0; i < col; i++) grid[0][i] = true;

  for (let i = col - 1; i >= 0; i--) grid[row - 1][i] = true;
};
const stairMaker = (grid, i, j) => {
  const row = grid.length;
  const col = grid[0].length;

  let count = 2;
  while (i < row - 2 && j < col - 2) {
    grid[i][j] = true;

    if (count > 0) {
      j++;
      count--;
    } else {
      i++;
      count--;
      if (count === -2) count = 2;
    }
  }
};

export function StairCaseMaze(grid) {
  const row = grid.length;
  const col = grid[0].length;

  boundaryMaker(grid);

  for (let i = 2; i < row; i += 6) stairMaker(grid, i, 2);

  for (let i = 2; i < col; i += 6) stairMaker(grid, 2, i);

  return grid;
}