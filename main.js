const {innerWidth, innerHeight} = window;
const size = 64;
const rowsContainer = document.querySelector('.rows-container');
const rowsCount = Math.ceil(innerHeight / size);
const columnsCount = Math.ceil(innerWidth / size);

for (let i = 0; i < rowsCount; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.style.display = 'flex';

    for (let j = 0; j < columnsCount; j++) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', j % 2 === 0 ? size : 0);
        circle1.setAttribute('cy', i % 2 === 0 ? size : 0);

        circle2.setAttribute('cx', j % 2 !== 0 ? size : 0);
        circle2.setAttribute('cy', i % 2 !== 0 ? size : 0);

        [circle1, circle2].forEach(c => {
            c.setAttribute('r', size / 2);
            c.setAttribute('stroke', '#000');
            c.setAttribute('stroke-width', 4);
            c.setAttribute('fill', 'none');
        });

        svg.setAttribute('data-rotation', 0);
        svg.appendChild(circle1);
        svg.appendChild(circle2);
        rowDiv.appendChild(svg);
    }
    rowsContainer.appendChild(rowDiv);
}


document.body.addEventListener('click', (event) => {
    const svg = event.target.closest('svg');
    if (svg) {
        rotateSvg(svg)
    }
});
function rotateSvg(svg){
    let rotation = parseInt(svg.getAttribute('data-rotation')) || 0;
    rotation = rotation > 0 ? 0 : 90;
    svg.setAttribute('data-rotation', rotation);
    svg.style.transform = `rotate(${rotation}deg)`;
}

function rotateRandomSVGs() {
    const svgs = document.querySelectorAll('svg');
    const randomSVGs = Array.from(svgs)
        .sort(() => Math.random() - 0.5)
        .slice(0, 150);

    randomSVGs.forEach(rotateSvg);
    setTimeout(()=>{
        requestAnimationFrame(rotateRandomSVGs)
    },1000)
}
rotateRandomSVGs()