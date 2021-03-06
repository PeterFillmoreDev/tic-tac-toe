//main function
//includes game data coregame and meta

let ticTacToe = {
  //data contains all stored information and functions that interact with them
  data: {
    //stores the positions and there marks
    //the position abc defining what row from top to bottom
    //the position 123 defines what column from left to right
    gameArray: [
      { position: "a1", mark: "" },
      { position: "a2", mark: "" },
      { position: "a3", mark: "" },
      { position: "b1", mark: "" },
      { position: "b2", mark: "" },
      { position: "b3", mark: "" },
      { position: "c1", mark: "" },
      { position: "c2", mark: "" },
      { position: "c3", mark: "" },
    ],
    //stores the current turn and a function to switch
    turn: {
      turn: "X",
      turnChange: function () {
        if (this.turn == "X") {
          this.turn = "O";
        } else if (this.turn == "O") {
          this.turn = "X";
        }
      },
    },
    //retreives the mark for a given postition
    retreiveSquareData: function (position) {
      index = this.squareIndexFinder(position);
      return this.gameArray[index];
    },
    //retruns the array index for the given position
    //gives this to retreiveSquareData and addMark
    squareIndexFinder: function (pos) {
      return this.gameArray.map((square) => square.position).indexOf(pos);
    },
    //places a mark in game array for a given postion
    addMark: function (position) {
      let index = this.squareIndexFinder(position);
      this.gameArray[index].mark = this.turn.turn;
      this.turn.turnChange();
    },
  },

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
      ticTacToe.data.gameArray.forEach((square) => {
        const template = `<div class="square" id="pos${square.position}">${square.mark}</div>`;
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
  },

  meta: {
    //functon to check if the game has been won
    isWon: function () {
      // an array of possible win cobinations of squares
      let winArray = [];
      //pulls in the arya from the data obj
      let gameArray = ticTacToe.data.gameArray;
      //makes an array of marks in columns rows and, diagonals and pushes them to the win array
      arrayBuilder = (function () {
        //makes the array with the given inputs for the rows and columns
        //substringStart and substringEnd designate whether or not to pull the row or the column
        //it decidides this from the first char or last char, the letter or number respectivly
        //the target is the provided letter or number that is the column or row that we dont want to filter out
        let arrayMaker = function (substringStart, substringEnd, target) {
          let newArray = gameArray
            .filter((square) => {
              let squareColumn = square.position.substring(
                substringStart,
                substringEnd
              );
              if (squareColumn == target) {
                return true;
              }
            })
            .map((square) => {
              return square.mark;
            });
          winArray.push(newArray);
        };
        //self executing functions that contains every thing that needs to be done when isWon() is called
        (function () {
          //loops three times for each column
          //target column coresponds to second char in position
          //feeds this target column for this loop, and position axis to array builder which pushes an array winArray[]
          for (let i = 0; i < 3; i++) {
            let targetColumn = 1 + i;
            arrayMaker(1, 2, targetColumn);
          }
          //loops three times for each row
          //target row coresponds to first char in position
          //feeds this target row for this loop, and position axis to array builder which pushes an array winArray[]
          for (let i = 0; i < 3; i++) {
            let targetRow = String.fromCharCode(97 + i);
            arrayMaker(0, 1, targetRow);
          }
          // the diagonal array filter for positions that are located in the up and down arrays
          let upArray = ["c1", "b2", "a3"];
          let downArray = ["a1", "b2", "c3"];
          let newArray = gameArray
            .filter((square) => upArray.includes(square.position))
            .map((square) => square.mark);
          winArray.push(newArray);
          newArray = gameArray
            .filter((square) => downArray.includes(square.position))
            .map((square) => square.mark);
          winArray.push(newArray);
        })();
      })();
      arrayBuilder;

      //a check to see if all marks in a win condition(a row, diagnal etc.) are the same indicating win
      let isWin = function ([mark1, mark2, mark3]) {
        if (mark1 === mark2 && mark1 === mark3 && mark1 !== "") {
          return true;
        } else {
          return false;
        }
      };

      //calls is Win for each condition (a row, diagnal etc.)
      //if iswin is true it calls a revealer for the winne rtag
      winArray.forEach((condition) => {
        if (isWin(condition) === true) {
          if (condition[1] == "X") {
            ticTacToe.coreGame.domFunctions.winnerRevealer(
              ticTacToe.coreGame.player1Winner
            );
          }
          if (condition[1] == "O") {
            ticTacToe.coreGame.domFunctions.winnerRevealer(
              ticTacToe.coreGame.player2Winner
            );
          }
        }
      });
    },
  },
};
ticTacToe.init();
