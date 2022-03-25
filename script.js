// number, string, boolean
/*
code a 2D array to fill out a grid completely and randomize the grid on click
create a duplicate before we change the grid to use as an answer key
erase numbers from grid randomly to begin making puzzle solvable
implement a limit to have the code stop taking a certain number when its' number count reaches zero
two settings of the game when you start, a setting where taking all of a number is allowed, and a setting where it isn't, can just make this a 50 50 random int to decide
when taking all of a number is allowed: set code to prevent removing numbers if number count is one
whenb taking all of a number is not allowed: set code to  check for zero in all number counts after each interation of a loop and go until required amount of numbers is taken (depends on difficulty) and do nested if to set negative number counts to a minimumCount variable (in this case it would be 0, but apt to change)
*/

// needed to display graphics
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let squareSize = 40;
canvas.width = squareSize * 9;
canvas.height = squareSize * 9;
  
let numberList = new Array(9).fill(9); //create our list of number amounts
// console.log(numberList);


function checkValidity(i, j, grid, temp) { //using the index of where we are in the grid, call this to find out if that index has a number in its row, column, or 3x3
  let tempCheck = temp;
  for(let a = i; a < 9; a++) {
    // array.includes(thing)
    if(grid.includes(tempCheck)) {
      console.log("checkValidity has determined that this row already has a" + tempCheck + " in it");
      return {
        canPutNumber: false,
        filled: false
      }
    }
    else if(grid[a].includes(tempCheck)) {
      console.log("checkValidity has determined that this column already has a" + tempCheck + " in it");
      return {
        canPutNumber: false,
        filled: false
      }
    }
    else{
      console.log("passed all the checks");
      return {
        canPutNumber: true,
        filled: true
      }
    }
  }
}
    /* else if(i%3 == 0 && j%3 == 0) {
      if(grid[i-1][j] == num || grid[i-2][j] == num || grid[i][j-1] == num || grid[i][j-2] == num || grid[i-1][j-1] == num || grid[i-2][j-1] == num || grid[i-1][j-2] == num || grid[i-2][j-2] == num) {
        return false;
      }
    }
    }
    }
  }
} */
let grid = []; //create an array
for(let i = 0; i < 9; i++) { //defines the length of rows of array
  let filled = false; //used for checking later
  grid[i] = []; //actually declares rows to undefined values
  for(let j = 0; j < 9; j++) { //defines the length of columns of array
    let temp = Math.floor((Math.random() * 9) + 1); //random number for our array
    while(filled == false) { //gonna keep calling check

      let result = checkValidity(i, j, grid, temp);
      console.log(result); // { canPutNumber: true, filled: true }
      if(result.canPutNumber) {
        grid[i][j] = temp;
        filled = true;
      }
      temp = Math.floor((Math.random() * 9) + 1);
    }
  }
    /*
      return of checkValdity call if(checkValidity) {
            grid[i][j] = temp;
            numberList[temp - 1] -= 1;
      } */
}




function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let row = 0; row < 9; row++) {
    for(let col = 0; col < 9; col++) {
      ctx.beginPath();
      // empty box
      ctx.rect(col * canvas.width / 9, row * canvas.height / 9, squareSize, squareSize);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      // border
      ctx.strokeSize = 1;
      ctx.strokeStyle = "black";
      ctx.stroke();
      // text
      ctx.fillStyle = "black";
      ctx.font = "30px Arial";
      if(grid[row][col] != undefined) {
        ctx.fillText(grid[row][col], (col * canvas.width / 9 + 9), (row * canvas.height / 9 + 32));
      }
      else {
        ctx.fillText("", (col * canvas.width / 9 + 9), (row * canvas.height / 9 + 32));
      }
      ctx.closePath();
    }

    if(row % 3 == 0) {
      // draw line
      ctx.beginPath();
      ctx.moveTo(0, row * squareSize);
      ctx.lineTo(canvas.width, row * squareSize);
      ctx.strokeWidth = 10;
      ctx.stroke();
      ctx.closePath();
    }
    
  }
}

draw();
console.log(grid);