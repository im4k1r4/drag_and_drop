let areas = { // vai armazenar quem estará dentro das áreas de drop
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart); // quando inicio o drag
    item.addEventListener('dragend', dragEnd); // quando solto o item
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver); // fn roda quando estiver arrastando o item e o item passar por cima da area selecionada
    area.addEventListener('dragleave', dragLeave); // roda quando sai da área dropável
    area.addEventListener('drop', drop); // roda quando eu "libero" do dragover
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral); 
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// Funções item
function dragStart(e) {
    e.currentTarget.classList.add('dragging'); // classe dragging dá opacidade via css
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Funções área
function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) { // se nao encontrar nenhum item com a classe item dentro da área, área tá vazia
        e.preventDefault(); // é default o dragOver nao deixar soltar, por isso o prevent
        e.currentTarget.classList.add('hover'); // classe do css que altera visualmente a cor do target
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    e.currentTarget.classList.remove('hover');

       
    if(e.currentTarget.querySelector('.item') === null) { // se nao encontrar nenhum item com a classe item dentro da área, área tá vazia
        let dragItem = document.querySelector('.item.dragging'); // reaproveitando a classe dragging pra identificar quem eu estou arrastando
        e.currentTarget.appendChild(dragItem); // entra no elemento e adiciona mais um item no final (no caso o item e remove da outra área)
        updateAreas();
    }

}

// Funções da área neutra (de cima):
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover'); // add efeito hover na area neutra
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover'); // remove efeito hover na area neutra
}


function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging'); // reaproveitando a classe dragging pra identificar quem eu estou arrastando
    e.currentTarget.appendChild(dragItem); // entra no elemento e adiciona mais um item no final (no caso o item e remove da outra área)
    updateAreas();
}

// Funções de lógica:
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => { // ver quem está no a, b e c
        let name = area.getAttribute('data-name');
        if(area.querySelector('.item') !== null) { // se a area possuir algum item
            areas[name] = area.querySelector('.item').innerHTML; // vai pegar o 1, 2 ou 3 e vai preencher no meu objeto areas
        } else {
            areas[name] = null;
        }
    });

    if(areas.a === '1' && areas.b === '2' && areas.c === '3') { // se a b e c estiverem na ordem (1, 2,3)
        document.querySelector('.areas').classList.add('correct'); // adiciona a classe correct para mudar a cor da borda
    } else {
        document.querySelector('.areas').classList.remove('correct'); // caso contrario, remove
    }
}