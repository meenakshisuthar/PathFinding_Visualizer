const boundaryMaker = (grid) => {
  const row = grid.length;
  const col = grid[0].length;

  for (let i = 0; i < row; i++) grid[i][0] = true;

  for (let i = row - 1; i >= 0; i--) grid[i][col - 1] = true;

  for (let i = 0; i < col; i++) grid[0][i] = true;

  for (let i = col - 1; i >= 0; i--) grid[row - 1][i] = true;
};
export function SimpleMaze(grid) {
  const row = grid.length;
  const col = grid[0].length;

  boundaryMaker(grid);

  for (let i = 3; i + 2 < row; i += 6) {
    for (let j = 0; j < (3 * col) / 4; j++) grid[i][j] = true;
  }

  for (let i = 6; i + 2 < row; i += 6) {
    for (let j = col - 1; j >= col / 4; j--) grid[i][j] = true;
  }

  return grid;
}
