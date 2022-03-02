    let ticTacToe = {

        mark: 'X',

        squares: [  
            {position: 'a1', mark:''},
            {position: 'a2', mark:''},
            {position: 'a3', mark:''},
            {position: 'b1', mark:''},
            {position: 'b2', mark:''},
            {position: 'b3', mark:''},
            {position: 'c1', mark:''},
            {position: 'c2', mark:''},
            {position: 'c3', mark:''},
        ],

        init: function(){
            this.cacheDom();
            this.render();
            this.bindEvents();

        },

        refresh: function(){
            this.cacheDom();
            this.render();
            this.bindEvents();
            this.turn.turnChange();
        },

        cacheDom: function(){
            this.gameBoard = document.querySelector('#game-board');
            this.domSquares = this.gameBoard.querySelectorAll('.square');
        },

        render: function() {
            while (this.gameBoard.firstChild) {
                this.gameBoard.firstChild.remove()
            };
            this.squares.forEach(square => {
                const template = `<div class="square" id="pos${square.position}">${square.mark}</div>`;
                const element = document.createElement('div');
                element.innerHTML = template;
                this.gameBoard.appendChild(element.lastChild);
            });
            this.cacheDom();
        },

        bindEvents: function(){
            this.domSquares.forEach(square => {this.squareMarker(square)});
        },

        squareMarker: function(square){
            let index = this.squareIndexFinder(square); 
            if(this.squares[index].mark == ''){
                square.addEventListener('click', e => { 
                    this.squares[index].mark = this.turn.turn;
                    this.refresh();
                });
            };
        },

        turn: { 
            turn: 'X',
            turnChange: function(){
                if(this.turn == 'X'){
                    this.turn = 'O'
                }
                else if(this.turn == 'O'){
                    this.turn = 'X'
                };
            },
        },

        squareIndexFinder: function(square){
            let squareid = square.id;
            let squarePosition = squareid.substring(3);
            let index = this.squares.map(squares=> squares.position).indexOf(squarePosition);
            return(index);
        },

    };
    ticTacToe.init();
