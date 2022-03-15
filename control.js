let ticTacToe = {

    data: (function(){
        const gameArray = [  
            {position: 'a1', mark:''},
            {position: 'a2', mark:''},
            {position: 'a3', mark:''},
            {position: 'b1', mark:''},
            {position: 'b2', mark:''},
            {position: 'b3', mark:''},
            {position: 'c1', mark:''},
            {position: 'c2', mark:''},
            {position: 'c3', mark:''},
        ];
        
        const turn = { 
            turn: 'X',
            turnChange: function(){
                if(this.turn == 'X'){
                    this.turn = 'O'
                }
                else if(this.turn == 'O'){
                    this.turn = 'X'
                };
            },
        };

        const retreiveSquareData = function(position){
            index = squareIndexFinder(position);
            return gameArray[index];
        };

        const squareIndexFinder= function(pos){
            return this.gameArray.map(square => square.position).indexOf(pos);
        };

        const addMark = function(position){
            let index = this.squareIndexFinder(position); 
            this.gameArray[index].mark = this.turn.turn;
        };
        return{
            addMark: addMark,
            gameArray: gameArray,
            turn: turn,
            squareIndexFinder: squareIndexFinder,
        }
    })(),
    
    coreGame: (function(){
    
        const cacheDom = (function(){
            gameBoard = document.querySelector('#game-board');
            domSquares = this.gameBoard.querySelectorAll('.square');
            return{
                gameBoard: gameBoard,
                domSquares: domSquares,
            };
        })();
    
        const render = function() {
            while (this.gameBoard.firstChild) {
                this.gameBoard.firstChild.remove()
            };
            this.data.gameArray.forEach(square => {
                const template = `<div class="square" id="pos${square.position}">${square.mark}</div>`;
                const element = document.createElement('div');
                element.innerHTML = template;
                this.gameBoard.appendChild(element.lastChild);
            });
            cacheDom();
        };
        
        const refresh = function(){
            render();
            cacheDom();
            bindEvents();
        };

        const bindEvents = function(){
            this.domSquares.forEach(square => {ticTacToe.squareMarkEvent(square)});
        };

        return {
            refresh: refresh,
        }


    })(),

    squareMarkEvent: function(square){
        let squarePosition = square.id.substring(3);
        if(this.data.retreiveSquareData(squarePosition).mark == ''){
            square.addEventListener('click', e => { 
                this.data.addMark(squarePosition);
                this.data.turn.turnChange();
                this.refresh();
            });
        };
    },

    init: function(){
        this.data();
        this.coreGame.refresh() ;
    }
};

ticTacToe.init();
