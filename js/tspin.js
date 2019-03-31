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
    ['L', -1, 3, 1],
    ['L', 0, 3, 0],
    ['O', 0, 3, 0],
    ['T', 0, 3, 0],
    ['S', 0, 3, 0]
  ],
  [
    ['L', -1, 3, 2],
    ['Z', -1, -3, 3],
    ['T', -1, 2, 1]
  ],
  [
    ['J', -1, 3, 1]
  ]
];

// TODO: currently stuck on issue where you cannot have blank pixels even after securing the 3 blank in a row (intended?)

Tspin.prototype.goodOpportunity = function(grid) {
  var opp1BlankColOffset = [0, 1, 2, 1]; // required column offset for each empty space for opp1
  var opp1BlankRowOffset = [0, 0, 0, 1]; // required row offset for each empty space for opp1
  var opp1BlankIndex = 0; // index of last element in opp1
  var opp1Row = 0; // row of topLeft empty pixel
  var opp1Col = 0; // col of topLeft empty pixel

  var index = 0 // current index of grid
  for (var r = 1; r < grid.rows; r++) {
    for (var c = 0; c < grid.columns; c++) {
      if (grid.cells[r][c] == 0) { // empty space
        //console.log("empty row: " + r + " empty col: " + c);
        if (opp1BlankIndex == 0) {
          opp1Row = r;
          opp1Col = c;
          opp1BlankIndex ++;
        } else {
          if (r == opp1Row + opp1BlankRowOffset[opp1BlankIndex] && c == opp1Col + opp1BlankColOffset[opp1BlankIndex]) { // opp1 next index matches
            opp1BlankIndex ++;
            if (opp1BlankIndex == 4) { // opportunity found (opp1)
              this.oppType = 1;
              this.oppRow = opp1Row;
              this.oppCol = opp1Col;
              return true;
            }
          } else { // opp1 not satisfied
            opp1BlankIndex = 0;
            opp1Row = 0;
            opp1Col = 0;
            break; // skip to next line
          }
        }
      }
      index ++;
    }
  }
  return false;
};

Tspin.prototype.ghostPiece = function() {
  console.log("oppRow: " + this.oppRow + ", oppCol: " + this.oppCol);
  return Piece.ghostPiece(this.oppRow, this.oppCol);
};

// Tspin.prototype.valid


//RETURNS THE GHOST PIECE AND ITS LOCATION FOR THE TSPIN SUGGESTION (IF THERE IS ONE)
Tspin.prototype.checkOpp = function(grid) {

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
              if(grid.cells[r+j][c+k] == 0) {
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
        if(r + lAnswer[1] < 0 || r + lAnswer[1] >= grid.rows || c + lAnswer[2] < 0 || c + lAnswer[2] >= grid.columns) {
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
