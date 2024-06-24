const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 30; // Size of each square block
const rows = canvas.height / boxSize;
const cols = canvas.width / boxSize;

// Initialize a grid to keep track of filled positions
const grid = Array(rows).fill().map(() => Array(cols).fill(null));

// Definitions for different Tetris pieces and their colors
const tetrominoes = [
    {shape: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], color: 'blue'},  // Square
    {shape: [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], color: 'red'},    // Line
    {shape: [{x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], color: 'green'}, // T
    {shape: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], color: 'yellow'},// L
];

function getRandomTetromino() {
    return {...tetrominoes[Math.floor(Math.random() * tetrominoes.length)]};
}

let currentTetromino = getRandomTetromino();
let position = {x: 5, y: 0}; // Starting position for the tetromino
let counter = 0; // Frame counter for dropping the tetromino
const speed = 60; // Frames to wait before dropping the tetromino one level
let dropSpeed = 1; // Drop speed multiplier

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
}

function rotate(shape) {
    const pivot = shape[1]; // Pivot is the second block in the shape array
    return shape.map(p => ({
        x: pivot.x + (p.y - pivot.y),
        y: pivot.y - (p.x - pivot.x)
    }));
}

// Handle continuous movement with mouse hover
let moveInterval; // Interval for continuous movement

function setupControl(buttonId, action) {
    const button = document.getElementById(buttonId);
    button.addEventListener('mouseenter', () => {
        moveInterval = setInterval(action, 100); // Trigger action every 100ms
    });
    button.addEventListener('mouseleave', () => {
        clearInterval(moveInterval);
    });
}

setupControl('leftBtn', () => {
    if (canMove(currentTetromino.shape, {x: -1, y: 0})) {
        position.x--;
        updateGameArea();
    }
});

setupControl('rightBtn', () => {
    if (canMove(currentTetromino.shape, {x: 1, y: 0})) {
        position.x++;
        updateGameArea();
    }
});

setupControl('downBtn', () => {
    if (canMove(currentTetromino.shape, {x: 0, y: 1})) {
        position.y++;
        updateGameArea();
    }
});

function canMove(shape, offset) {
    return shape.every(p =>
        p.x + position.x + offset.x >= 0 &&
        p.x + position.x + offset.x < cols &&
        p.y + position.y + offset.y < rows &&
        !grid[p.y + position.y + offset.y][p.x + position.x + offset.x]
    );
}

function placeTetromino() {
    currentTetromino.shape.forEach(block => {
        grid[block.y + position.y][block.x + position.x] = currentTetromino.color;
    });
    position = {x: 5, y: 0};
    currentTetromino = getRandomTetromino();
}

function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the filled positions from the grid
    grid.forEach((row, y) => {
        row.forEach((color, x) => {
            if (color) {
                drawBlock(x, y, color);
            }
        });
    });

    // Draw the current tetromino
    currentTetromino.shape.forEach(block => {
        drawBlock(block.x + position.x, block.y + position.y, currentTetromino.color);
    });

    counter += dropSpeed;
    if (counter >= speed) {
        if (canMove(currentTetromino.shape, {x: 0, y: 1})) {
            position.y++;
        } else {
            placeTetromino();
        }
        counter = 0;
    }

    requestAnimationFrame(updateGameArea);
}

updateGameArea();
