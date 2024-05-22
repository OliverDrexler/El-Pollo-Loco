let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    

    console.log('my character is', world.character)
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        console.log('Left was pressed');
    } else if (event.key === 'ArrowRight') {
        console.log('Right was pressed');
    } else if (event.key === 'ArrowUp') {
        console.log('Up was pressed');
    } else if (event.key === 'ArrowDown') {
        console.log('Down was pressed');
    } else if (event.key === ' ') {
        console.log('Space was pressed');
    }
});
