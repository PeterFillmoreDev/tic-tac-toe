//functon to check if the game has been won
    const isWon= function () {
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
    };