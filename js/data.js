
//data contains all stored information and functions that interact with them
let data = function() {
  //stores the positions and there marks
  //the position abc defining what row from top to bottom
  //the position 123 defines what column from left to right
  const gameArray = [
    { position: "a1", mark: "" },
    { position: "a2", mark: "" },
    { position: "a3", mark: "" },
    { position: "b1", mark: "" },
    { position: "b2", mark: "" },
    { position: "b3", mark: "" },
    { position: "c1", mark: "" },
    { position: "c2", mark: "" },
    { position: "c3", mark: "" },
  ];
  //stores the current turn and a function to switch
  let turn = {
    turn: "X",
    turnChange: function () {
      if (this.turn == "X") {
        this.turn = "O";
      } else if (this.turn == "O") {
        this.turn = "X";
      }
    },
  };

  //retreives the mark for a given postition
  const retreiveSquareData = function (position) {
    index = this.squareIndexFinder(position);
    return this.gameArray[index];
  };
  //retruns the array index for the given position
  //gives this to retreiveSquareData and addMark
  const squareIndexFinder = function (pos) {
    return this.gameArray.map((square) => square.position).indexOf(pos);
  };
  //places a mark in game array for a given postion
  const addMark = function (position) {
    let index = this.squareIndexFinder(position);
    this.gameArray[index].mark = this.turn.turn;
    this.turn.turnChange();
  };
  return({
    gameArray: gameArray,
    retreiveSquareData: retreiveSquareData,
    squareIndexFinder: squareIndexFinder,
    addMark: addMark,
  });
};
