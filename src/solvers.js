/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// creates all possible rows with one '1';
window.generateAllPossibleRows = function(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      if (i === j) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    matrix.push(row);
  }
  return matrix;
};

// creates all possible combinations of rows
window.generatePermutations = function(array, n) {
  var swap = function (array, pos1, pos2) {
    var temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
  };
  var permutations = [];
  var permute = function (array, n = array.length) {
    if (n === 1) {
      var arr = array.slice(0);
      permutations.push(arr);
    } else {
      for (var i = 1; i <= n; i += 1) {
        permute(array, n - 1);
        var j = (n % 2) ? 1 : i;
        swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
      }
    }
  };
  permute(array, n);
  return permutations;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = generateAllPossibleRows(n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var rowsMatrix = generateAllPossibleRows(n);
  var permList = generatePermutations(_.range(n));
  var solutionCount = permList.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.diagonalTests = function(board) {
  return !board.hasAnyMajorDiagonalConflicts && !board.hasAnyMinorDiagonalConflicts;
}

window.findNQueensSolution = function(n) {
  var solution = {n: n};
  var rowsMatrix = generateAllPossibleRows(n);
  var permList = generatePermutations(_.range(n));

  permList.forEach(function(permutation) {
    var testMatrix = permutation.map(function(rowIndex) {
      return rowsMatrix[rowIndex];
    });
    var testBoard = new Board(testMatrix);
    if (!testBoard.hasAnyMajorDiagonalConflicts() && !testBoard.hasAnyMinorDiagonalConflicts()) {
      solution = testMatrix;
    }
  });
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var solutionCount = n === 0 ? 1 : 0;
  var solutionCount = 0;
  if (n === 0) {
    return 1;
  }
  var rowsMatrix = generateAllPossibleRows(n);
  var permList = generatePermutations(_.range(n));

  permList.forEach(function(permutation) {
    var testMatrix = permutation.map(function(rowIndex) {
      return rowsMatrix[rowIndex];
    });
    var testBoard = new Board(testMatrix);
    if (!testBoard.hasAnyMajorDiagonalConflicts() && !testBoard.hasAnyMinorDiagonalConflicts()) {
      solutionCount++;
    }
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
