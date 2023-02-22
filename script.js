document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart); // quando inicio o drag
    item.addEventListener('dragend', dragEnd); // quando solto o item
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver); // fn roda quando estiver arrastando o item e o item passar por cima da area selecionada
    area.addEventListener('dragleave', dragLeave); //
    area.addEventListener('drop', drop); //
})


// Funções item
function dragStart(e) {
    e.currentTarget.classList.add('dragging'); // classe dragging dá opacidade via css
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Funções área
function dragOver(e) {
    console.log('Passou por cima')
}

function dragLeave() {
    
}

function drop() {
    
}

//36:01