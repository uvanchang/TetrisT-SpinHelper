function Tspin() {
  var oppType = 0;
  var oppRow = 0;
  var oppCol = 0;
};

// TODO: currently stuck on issue where you cannot have blank pixels even after securing the 3 blank in a row (intended?)

Tspin.prototype.goodOpportunity = function(grid) {
  var opp1BlankColOffset = [0, 1, 2, 1]; // required column offset for each empty space for opp1
  var opp1BlankRowOffset = [0, 0, 0, 1]; // required row offset for each empty space for opp1
  var opp1BlankIndex = 0; // index of last element in opp1
  var opp1Row = 0; // row of topLeft empty pixel
  var opp1Col = 0; // col of topLeft empty pixel

  var index = 0 // current index of grid
  for (var r = 0; r < grid.rows; r++) {
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

Tspin.prototype.valid
