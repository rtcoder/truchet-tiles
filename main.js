function generateGrid(rowsCount, columnsCount, size) {
    const rowsContainer = document.querySelector('.rows-container');

    for (let i = 0; i < rowsCount; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let j = 0; j < columnsCount; j++) {
            const svg = createSvg(i, j, size);
            rowDiv.appendChild(svg);
        }
        rowsContainer.appendChild(rowDiv);
    }
}

function createSvgCircle(size) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', size / 2);
    circle.setAttribute('stroke', '#000');
    circle.setAttribute('stroke-width', 4);
    circle.setAttribute('fill', 'none');
    return circle;
}

function createSvg(rowIndex, columnIndex, size) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);

    const circle1 = createSvgCircle(size);
    const circle2 = createSvgCircle(size);
    circle1.setAttribute('cx', columnIndex % 2 === 0 ? size : 0);
    circle1.setAttribute('cy', rowIndex % 2 === 0 ? size : 0);

    circle2.setAttribute('cx', columnIndex % 2 !== 0 ? size : 0);
    circle2.setAttribute('cy', rowIndex % 2 !== 0 ? size : 0);

    svg.setAttribute('data-rotation', 0);
    svg.appendChild(circle1);
    svg.appendChild(circle2);

    return svg;
}

function rotateSvg(svg) {
    let rotation = parseInt(svg.getAttribute('data-rotation')) || 0;
    rotation = rotation > 0 ? 0 : 90;
    svg.setAttribute('data-rotation', rotation);
    svg.style.transform = `rotate(${rotation}deg)`;
}

function rotateRandomSVGs() {
    Array.from(document.querySelectorAll('svg'))
        .sort(() => Math.random() - 0.5)
        .slice(0, 150)
        .forEach(rotateSvg);

    setTimeout(() => {
        requestAnimationFrame(rotateRandomSVGs);
    }, 1000);
}

function calculateGridSize(size) {
    const rowsCount = Math.ceil(window.innerHeight / size);
    const columnsCount = Math.ceil(window.innerWidth / size);
    return {rowsCount, columnsCount};
}

function init() {
    const size = 64;
    const {rowsCount, columnsCount} = calculateGridSize(size);

    generateGrid(rowsCount, columnsCount, size);

    rotateRandomSVGs();
}

document.body.addEventListener('click', (event) => {
    const svg = event.target.closest('svg');
    if (svg) {
        rotateSvg(svg);
    }
});

window.addEventListener('resize', () => {
    const size = 64;
    const {rowsCount, columnsCount} = calculateGridSize(size);

    generateGrid(rowsCount, columnsCount, size);
});

init();
