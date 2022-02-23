let turn = 'X';

let gameBoard = document.querySelector('#game-board');
let gameplay = [{position: 'a1', mark:''},
                {position: 'a2', mark:''},
                {position: 'a3', mark:''},
                {position: 'b1', mark:''},
                {position: 'b2', mark:''},
                {position: 'b3', mark:''},
                {position: 'c1', mark:''},
                {position: 'c2', mark:''},
                {position: 'c3', mark:''},
            ];

function render(){
    gameplay.forEach(square => {
        const squareHTML = `<div class="square" id="pos${square.position}" data-is-marked="unMarked">${square.mark}</div>`

        const element = document.createElement('div');

        element.innerHTML = squareHTML; 

        element.dataset.isMarked = 'unMarked'; 

        gameBoard.appendChild(element.lastChild);
        
    });

    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('click', e => {
            if(square.dataset.isMarked === 'unMarked'){
                square.innerHTML = turn;
                square.dataset.isMarked = 'Marked';
                if(turn == 'X'){
                    turn = 'O';
                }
                else if(turn == 'O'){
                    turn = 'X';
                }
            };  
        });
    });
};

render();
