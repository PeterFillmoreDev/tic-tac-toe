import data from /js/data.js;
import isWon from /js/isWon.js;

let ticTacToe = {

  coreGame: {
    //provides dom hooks for js interaction
    cacheDom: function () {
      this.gameBoard = document.querySelector("#game-board");
      this.domSquares = this.gameBoard.querySelectorAll(".square");
      this.player1Winner = document.querySelector("#winner1");
      this.player2Winner = document.querySelector("#winner2");
    },

    domFunctions: {
      //hides the winner tag of a given DOM element in cacheDom
      winnerHider: function (winnerTag) {
        winnerTag.style.display = "none";
      },
      //reveals the winner tag of a given DOM element in cacheDom
      winnerRevealer: function (winnerTag) {
        winnerTag.style.display = "";
      },
    },

    render: function () {
      //removes all squares from board
      while (this.gameBoard.firstChild) {
        this.gameBoard.firstChild.remove();
      }
      //crates a grid square for each postion and mark in game array
      //assigns postition for reference when clicked and a displays relitive mark
      //as well as class for css
      data.gameArray.forEach((square) => {
        const template = `<div class="square" id="pos${square.position}"><span>${square.mark}<span></div>`;
        const element = document.createElement("div");
        element.innerHTML = template;
        this.gameBoard.appendChild(element.lastChild);
      });
      //recaches the newly createdgrid squares
      this.cacheDom();
    },

    bindEvents: function () {
      //binds the click event to the specific dom squares
      this.domSquares.forEach((square) => {
        ticTacToe.squareMarkEvent(square);
      });
    },
    //redraws grid squares usually with updated game data
    refresh: function () {
      this.cacheDom();
      this.render();
      this.bindEvents();
    },
  },

  squareMarkEvent: function (square) {
    //pulls specific object from game array
    let squarePosition = square.id.substring(3);
    //stops event from firing if square has alredy been marked
    if (this.data.retreiveSquareData(squarePosition).mark == "") {
      //adds a mark to square then checks if the game is over then updates square
      square.addEventListener("click", (e) => {
        this.data.addMark(squarePosition);
        this.meta.isWon();
        ticTacToe.coreGame.refresh();
      });
    }
  },
  //startup sthat creates square and hides the tags designating a winner
  init: function () {
    this.coreGame.refresh();
    this.coreGame.domFunctions.winnerHider(this.coreGame.player1Winner);
    this.coreGame.domFunctions.winnerHider(this.coreGame.player2Winner);
    data();
  },

};
ticTacToe.init();
