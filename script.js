// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let animationId;

const cellSize = 10;
const rows = Math.floor(window.innerHeight / cellSize);
const cols = Math.floor(window.innerWidth / cellSize);

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
            if (grid[row][col] === 1) {
                ctx.fillStyle = getRandomColor();
            } else {
                ctx.fillStyle = '#000000';
            }
            ctx.fill();
            ctx.strokeStyle = '#444';
            ctx.stroke();
        }
    }
}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F33FF5', '#F5A233', '#33FFF5'];
    return colors[Math.floor(Math.random() * colors.length)];
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
    animationId = requestAnimationFrame(gameLoop);
}

startBtn.addEventListener('click', () => {
    if (!animationId) {
        gameLoop();
    }
});

stopBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    animationId = null;
});

resetBtn.addEventListener('click', () => {
    grid = createGrid();
    drawGrid();
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
});

drawGrid();
