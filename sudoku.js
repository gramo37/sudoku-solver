let N = 9;
function solveSudoku(grid, row, col) {
    if (row == N - 1 && col == N)
        return true;

    if (col == N) {
        row++;
        col = 0;
    }

    if (grid[row][col] != 0)
        return solveSudoku(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {

        if (isSafe(grid, row, col, num)) {

            grid[row][col] = num;

            if (solveSudoku(grid, row, col + 1))
                return true;
        }

        grid[row][col] = 0;
    }
    return false;
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;

    for (let x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;

    let startRow = row - row % 3,
        startCol = col - col % 3;

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num)
                return false;

    return true;
}