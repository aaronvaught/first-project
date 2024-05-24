// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const rows = 50;
const cols = 50;
const cellSize = 10;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let grid = createGrid();

function createGrid() {
    return new Array(rows).fill(null)
        .map(() => new Array(cols).fill(null)
        .map(() => Math.floor(Math.random() * 2)));
}

function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.beginPath();
            ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid[row][col] ? '#00FF00' : '#000000';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function updateGrid() {
    const nextGrid = grid.map(arr => [...arr]);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = grid[row][col];
            let numNeighbors = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) continue;
                    const x = row + i;
                    const y = col + j;
                    if (x >= 0 && x < rows && y >= 0 && y < cols) {
                        numNeighbors += grid[x][y];
                    }
                }
            }

            if (cell === 1 && (numNeighbors < 2 || numNeighbors > 3)) {
                nextGrid[row][col] = 0;
            } else if (cell === 0 && numNeighbors === 3) {
                nextGrid[row][col] = 1;
            }
        }
    }

    grid = nextGrid;
}

function gameLoop() {
    drawGrid();
    updateGrid();
    requestAnimationFrame(gameLoop);
}

gameLoop();
