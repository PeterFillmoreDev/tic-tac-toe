let ticTacToe = {

    data: {
        gameArray: [  
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
        
        turn : { 
            turn: 'X',
            turnChange: function(){
                if(this.turn == 'X'){
                    this.turn = 'O';
                }
                else if(this.turn == 'O'){
                    this.turn = 'X';
                };
            },
        },

        retreiveSquareData: function(position){
            index = this.squareIndexFinder(position);
            return this.gameArray[index];
        },

        squareIndexFinder: function(pos){
            return this.gameArray.map(square => square.position).indexOf(pos);
        },

        addMark: function(position){
            let index = this.squareIndexFinder(position); 
            this.gameArray[index].mark = this.turn.turn;
            this.turn.turnChange();
        },
    },
    
    coreGame: {
        cacheDom: function(){
            this.gameBoard = document.querySelector('#game-board');
            this.domSquares = this.gameBoard.querySelectorAll('.square');
            this.player1Winner = document.querySelector('#winner1');
            this.player2Winner = document.querySelector('#winner2');
        },

        domFunctions:{
            winnerHider: function(winnerTag){
                winnerTag.style.display = 'none';
            },
            winnerRevealer: function(winnerTag){
                winnerTag.style.display = '';
            },
        },
    
        render: function() {
            while (this.gameBoard.firstChild) {
                this.gameBoard.firstChild.remove()
            };
            ticTacToe.data.gameArray.forEach(square => {
                const template = `<div class="square" id="pos${square.position}">${square.mark}</div>`;
                const element = document.createElement('div');
                element.innerHTML = template;
                this.gameBoard.appendChild(element.lastChild);
            });
            this.cacheDom();
        },

        bindEvents: function(){
            this.domSquares.forEach(square => {ticTacToe.squareMarkEvent(square)});
        },

        refresh: function(){
            this.cacheDom();
            this.render();
            this.bindEvents();
        },
    },

    squareMarkEvent: function(square){
        let squarePosition = square.id.substring(3);
        if(this.data.retreiveSquareData(squarePosition).mark == ''){
            square.addEventListener('click', e => { 
                this.data.addMark(squarePosition);
                this.meta.isWon();
                ticTacToe.coreGame.refresh();
            });
        };

    },

    init: function(){
        this.coreGame.refresh();
        this.coreGame.domFunctions.winnerHider(this.coreGame.player1Winner);
        this.coreGame.domFunctions.winnerHider(this.coreGame.player2Winner);
    },

    meta:{
        isWon: function(){
            let winArray = ['x','x','x',];
            let gameArray = ticTacToe.data.gameArray;
            
            
            let isWin = function([mark1, mark2, mark3,]){
                if(mark1 == mark2 && mark1 == mark3){
                    console.log("w");
                    return true;
                }else{
                    console.log("nw");
                    return false;
                };
            };
            if(isWin(winArray) == true){
                ticTacToe.coreGame.domFunctions.winnerRevealer(ticTacToe.coreGame.player1Winner);
            };
            
        },
    },



};

ticTacToe.init();
