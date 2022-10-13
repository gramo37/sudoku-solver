let inputGrid = document.getElementById("input-grid");
let outputGrid = document.getElementById("output-grid");

// Solve the sudoku
document.getElementById("submit").addEventListener("click", () => {
    let grid = getSudokuValue();
    console.log(isValidBoard(grid));
    if (!isValidBoard(grid)) {
        alert("Not a valid sudoku board");
    }
    else if (solveSudoku(grid, 0, 0))
        createOutputBoard(grid);
    else
        alert("No Solution Exists !!");
});

// Create the Input Board
window.onload = function () {
    createInputBoard();
}

function createInputBoard() {
    for (let i = 0; i < 81; i++) {
        // Create input tag
        let x = document.createElement("INPUT");
        x.setAttribute("type", "number");
        if (i <= 9) x.setAttribute("id", `input-board-id0${i}`);
        else x.setAttribute("id", `input-board-id${i}`);
        x.setAttribute("maxlength", 5);

        // Create grid item and add ip in it
        let gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.appendChild(x);

        // Append to main grid
        inputGrid.appendChild(gridItem);
    }
}

function createOutputBoard(grid) {
    // Clear the Output
    while (outputGrid.firstChild) {
        outputGrid.removeChild(outputGrid.lastChild);
    }

    let k = 0;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            // Create input tag
            let x = document.createElement("div");
            x.setAttribute("id", `output-board-id${k}`);
            x.innerHTML = grid[i][j];

            // Create grid item and add ip in it
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.appendChild(x);

            // Append to main grid
            outputGrid.appendChild(gridItem);
            k += 1;
        }
    }
}

function getSudokuValue() {
    let grid = new Array(9);
    for (let i = 0; i < 9; i++) {
        grid[i] = new Array(9);
    }
    let k = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let temp;
            if (k <= 9) temp = document.getElementById(`input-board-id0${k}`).value;
            else temp = document.getElementById(`input-board-id${k}`).value;
            console.log(temp);
            if (temp === "") temp = 0;
            else temp = parseInt(temp);
            grid[x][y] = temp;
            k += 1;
        }
    }
    console.log(grid);
    return grid;
}

let board = document.getElementsByClassName("board")[0];
inputGrid.onkeyup = function (e) {
    var target = e.srcElement || e.target;

    var maxLength = 1;
    var myLength = target.value.length;
    if (myLength >= maxLength) {
        var next = target;

        let index = next.id.slice(-2);

        let idx = parseInt(index);
        console.log(idx);
        if (idx == 80) idx = -1;
        if (idx < 9) document.getElementById(`input-board-id0${idx + 1}`).focus();
        else document.getElementById(`input-board-id${idx + 1}`).focus();
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
        var previous = target;
        while (previous = previous.previousElementSibling) {
            if (previous == null)
                break;
            if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
            }
        }
    }
}

function isValidBoard(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let num = grid[i][j];

            if (grid[i][j] == 0) continue;

            for (let x = 0; x <= 8; x++) {
                if (x == j) continue;
                if (grid[i][x] == num)
                    return false;
            }

            for (let x = 0; x <= 8; x++) {
                if (x == i) continue;
                if (grid[x][j] == num)
                    return false;
            }

            let startRow = i - i % 3,
                startCol = j - j % 3;

            for (let x = 0; x < 3; x++)
                for (let y = 0; y < 3; y++) {
                    if (x + startRow == i && y + startCol == j) continue;
                    if (grid[x + startRow][y + startCol] == num)
                        return false;
                }

        }
    }
    return true;
}
