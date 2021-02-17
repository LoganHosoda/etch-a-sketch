const gridContainer = document.querySelector('.grid-container');
window.onload = createGrid(16);


// The current color applied on mouseover
var color = 'black';


// Creating/resizing/resetting the canvas
function createGrid(gridSize) {
    gridContainer.setAttribute(`style`, `grid-template-columns: repeat(${gridSize}, auto);`)
    for (let i = 0; i < gridSize * gridSize; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'pixels');
        gridContainer.appendChild(div);
    }
    var pixels = gridContainer.querySelectorAll('div');
    pixels.forEach(pixels => pixels.addEventListener('mouseover', drawColor));
}
function resizeGrid(gridSize) {
    removeGrid();
    createGrid(gridSize);
}
function reset() {
    const change = document.querySelectorAll('.pixels');
    change.forEach(item => {
        item.setAttribute('style', 'background-color: white');
    })
}
function removeGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}


// Coloring pixels on mouseover
function drawColor() {
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
        case 'shade':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity >= 0.9) {
                    break;
                } else if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                } 
            } else if (!this.style.backgroundColor.match(/rgba/)) {
                this.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
            }
        default:
            this.style.backgroundColor = color;
    }
}

// Updates color variable to new color when buttons are clicked
function changeColor(newColor) {
    color = newColor;
}