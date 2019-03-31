function Tspin() {
  var oppType = 0;
  var oppRow = 0;
  var oppCol = 0;
};

var leftPoss = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 1]
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [1, 1]
  ],
  [
    [0, 0],
    [0, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 0],
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 1]
  ]
];
var rightPoss = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [1, 0]
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [1, 1]
  ],
  [
    [0, 0],
    [0, 0],
    [0, 1],
    [1, 1]
  ],
  [
    [0, 0],
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 1]
  ]
];
var leftAnswers = [
  [
    ['J', 1, -1, 1]
  ],
  [
    ['S', 1, -1, 0],
    ['T', 0, -1, 1],
    ['T', 0, -1, 2],
    ['Z', 0, -1, 1]
  ],
  [
    ['I', 0, -2, 0],
    ['J', 0, -1, 0],
    ['J', -1, 0, 3],
    ['L', 0, -1, 0],
    ['L', 0, -1, 2],
    ['O', 0, 0, 0],
    ['T', 0, -1, 0],
    ['Z', 0, -1, 0]
  ],
  [
    ['J', -1, -1, 2],
    ['S', -1, -1, 1],
    ['T', -1, 0, 3]
  ],
  [
    ['L', -1, 0, 3]
  ]
];
var rightAnswers = [
  [
    ['L', 1, 3, 3]
  ],
  [
    ['Z', 1, 3, 0],
    ['T', 0, 3, 3],
    ['T', 0, 3, 2],
    ['S', 0, 3, 3]
  ],
  [
    ['I', 0, 3, 0],
    ['J', 0, 3, 0],
    ['J', -1, 3, 3],
    ['L', -1, 2, 1],
    ['L', 0, 3, 0],
    ['O', 0, 3, 0],
    ['T', 0, 3, 0],
    ['S', 0, 3, 0]
  ],
  [
    ['L', -1, 3, 2],
    ['Z', -1, 3, 3],
    ['T', -1, 2, 1]
  ],
  [
    ['J', -1, 2, 1]
  ]
];

checkWalls = function(grid, workingPieces) {

  var r = 0;
  for(r = 1; r < grid.rows - 3; r++) {
      // check the 4 x 4 window

      // check the middle column for left
      var failedMiddle = false;
      for(var middle = 0; middle < 4; middle++) {
        if(grid.cells[r + middle][1] != 0) {
          failedMiddle = true;
          break;
        }
      }
      if(failedMiddle) {
        continue;
      }

      var not_case = false;

      // left side
      var wallPoss = [0, 0, 0, 1];
      for(var i = 0; i < wallPoss.length; i++) {

        not_case = false;
        if(wallPoss[i] == 0) {
          if(grid.cells[r + i][0] != 0) {
            not_case = true;
            break;
          }
        }
        else {
          if(grid.cells[r + i][0] == 0) {
            not_case = true;
            break;
          }
        }

      }
      if(not_case) {
        continue;
      }

      // if reaches here then left side is okay

      // right side
      var right_case = -1;
      for(var i = 0; i < rightPoss.length; i++) {
        not_case = false;
        for(var j = 0; j < 4; j++) {
          for(var k = 0; k < 2; k++) {

            if(rightPoss[i][j][k] == 0) {
              if(grid.cells[r + j][k + 2] != 0) {
                not_case = true;
                break;
              }
            }
            else {
              if(grid.cells[r + j][k + 2] == 0) {
                not_case = true;
                break;
              }
            }

          }
          if(not_case) {
            break;
          }
        }
        if(!not_case) {
          right_case = i;
          break;
        }
      }
      if(right_case == -1) {
        continue;
      }

      // check answers
      for(var i = 0; i < rightAnswers[right_case].length; i++) {

        var rAnswer = rightAnswers[right_case][i];
        var rGhost = Piece.ghostPiece(rAnswer[0], r + rAnswer[1], -1 + rAnswer[2], rAnswer[3]);
        if(r + rAnswer[1] < 0 || r + rAnswer[1] >= grid.rows || -1 + rAnswer[2] < 0 || -1 + rAnswer[2] >= grid.columns) {
          continue;
        }
        //console.log("0: " + rAnswer[0] + " 1: " + r + " + " + rAnswer[1] + " 2: " + c + " + " + rAnswer[2] + " 3: " + rAnswer[3]);
        if(grid.valid(rGhost)) {
          if(right_case == 0) { // fix for right case 0
            if(r + 4 < grid.rows && grid.cells[r + 4][2] == 0) { // if block is not under the L block
              continue;
            }
          }
          grid.addPiece(rGhost);
          return true;
        }

      }

      // check the middle column for right
      failedMiddle = false;
      for(var middle = 0; middle < 4; middle++) {
        if(grid.cells[r + middle][8] != 0) {
          failedMiddle = true;
          break;
        }
      }
      if(failedMiddle) {
        continue;
      }

      not_case = false;

      // right side
      for(var i = 0; i < wallPoss.length; i++) {

        not_case = false;
        if(wallPoss[i] == 0) {
          if(grid.cells[r + i][9] != 0) {
            not_case = true;
            break;
          }
        }
        else {
          if(grid.cells[r + i][9] == 0) {
            not_case = true;
            break;
          }
        }

      }
      if(not_case) {
        continue;
      }

      // if reaches here then right side is okay

      // left side
      var left_case = -1;
      for(var i = 0; i < leftPoss.length; i++) {
        not_case = false;
        for(var j = 0; j < 4; j++) {
          for(var k = 0; k < 2; k++) {

            if(leftPoss[i][j][k] == 0) {
              if(grid.cells[r + j][k + 6] != 0) {
                not_case = true;
                break;
              }
            }
            else {
              if(grid.cells[r + j][k + 6] == 0) {
                not_case = true;
                break;
              }
            }

          }
          if(not_case) {
            break;
          }
        }
        if(!not_case) {
          left_case = i;
          break;
        }
      }
      if(left_case == -1) {
        continue;
      }

      // check answers
      for(var i = 0; i < leftAnswers[left_case].length; i++) {

        var lAnswer = leftAnswers[right_case][i];
        var lGhost = Piece.ghostPiece(lAnswer[0], r + lAnswer[1], 6 + lAnswer[2], lAnswer[3]);
        if(r + lAnswer[1] < 0 || r + lAnswer[1] >= grid.rows || 6 + lAnswer[2] < 0 || 6 + lAnswer[2] >= grid.columns) {
          continue;
        }
        //console.log("0: " + lAnswer[0] + " 1: " + r + " + " + lAnswer[1] + " 2: " + c + " + " + lAnswer[2] + " 3: " + lAnswer[3]);
        if(grid.valid(lGhost)) {
          if(left_case == 0) { // fix for right case 0
            if(r + 4 < grid.rows && grid.cells[r + 4][5] == 0) { // if block is not under the L block
              continue;
            }
          }
          grid.addPiece(lGhost);
          return true;
        }

      }


      return false;

  }
  return false;

};

//RETURNS THE GHOST PIECE AND ITS LOCATION FOR THE TSPIN SUGGESTION (IF THERE IS ONE)
Tspin.prototype.checkOpp = function(grid, workingPieces) {

  if(checkWalls(grid, workingPieces)) {
    return true;
  }

  var r = 0;
  var c = 0;
  for(r = 1; r < grid.rows - 3; r++) { //20 x 10
    for(c = 0; c < grid.columns - 2; c++) {
      // check the 5 x 4 window

      // check the middle column
      var failedMiddle = false;
      for(var middle = 0; middle < 4; middle++) {
        if(grid.cells[r + middle][c + 2] != 0) {
          failedMiddle = true;
          break;
        }
      }
      if(failedMiddle) {
        continue;
      }

      var not_case = false;

      // left side
      var left_case = -1;
      for(var i = 0; i < leftPoss.length; i++) {
        not_case = false;
        for(var j = 0; j < 4; j++) {
          for(var k = 0; k < 2; k++) {

            if(leftPoss[i][j][k] == 0) {
              if(grid.cells[r + j][c + k] != 0) {
                not_case = true;
                break;
              }
            }
            else {
              if(grid.cells[r + j][c + k] == 0) {
                not_case = true;
                break;
              }
            }

          }
          if(not_case) {
            break;
          }
        }
        if(!not_case) {
          left_case = i;
          break;
        }
      }
      if(left_case == -1) {
        continue;
      }

      // right side
      var right_case = -1;
      for(var i = 0; i < rightPoss.length; i++) {
        not_case = false;
        for(var j = 0; j < 4; j++) {
          for(var k = 0; k < 2; k++) {

            if(rightPoss[i][j][k] == 0) {
              if(grid.cells[r + j][c + k + 3] != 0) {
                not_case = true;
                break;
              }
            }
            else {
              if(grid.cells[r + j][c + k + 3] == 0) {
                not_case = true;
                break;
              }
            }

          }
          if(not_case) {
            break;
          }
        }
        if(!not_case) {
          right_case = i;
          break;
        }
      }
      if(right_case == -1) {
        continue;
      }
      console.log("left case: " + left_case + " right case: " + right_case);

      // check answers
      for(var i = 0; i < leftAnswers[left_case].length; i++) {

        var lAnswer = leftAnswers[left_case][i];
        var lGhost = Piece.ghostPiece(lAnswer[0], r + lAnswer[1], c + lAnswer[2], lAnswer[3]);
        if(r + lAnswer[1] < 0 || r + lAnswer[1] >= grid.rows || c + lAnswer[2] < 0 || c + lAnswer[2] >= grid.columns) {
          continue;
        }
        console.log("0: " + lAnswer[0] + " 1: " + r + " + " + lAnswer[1] + " 2: " + c + " + " + lAnswer[2] + " 3: " + lAnswer[3]);
        if(grid.valid(lGhost)) {
          if(left_case == 0) { // fix for left case 0
            if(r + 4 < grid.rows && grid.cells[r + 4][c] == 0) { // if block is not under the J block
              continue;
            }
          }
          grid.addPiece(lGhost);
          return true;
        }

      }

      for(var i = 0; i < rightAnswers[right_case].length; i++) {

        var rAnswer = rightAnswers[right_case][i];
        var rGhost = Piece.ghostPiece(rAnswer[0], r + rAnswer[1], c + rAnswer[2], rAnswer[3]);
        if(r + rAnswer[1] < 0 || r + rAnswer[1] >= grid.rows || c + rAnswer[2] < 0 || c + rAnswer[2] >= grid.columns) {
          continue;
        }
        console.log("0: " + rAnswer[0] + " 1: " + r + " + " + rAnswer[1] + " 2: " + c + " + " + rAnswer[2] + " 3: " + rAnswer[3]);
        if(grid.valid(rGhost)) {
          if(right_case == 0) { // fix for right case 0
            if(r + 4 < grid.rows && c + 4 < grid.columns && grid.cells[r + 4][c + 4] == 0) { // if block is not under the L block
              continue;
            }
          }
          grid.addPiece(rGhost);
          return true;
        }

      }
      return false;

    }

  }
  return false;

};
