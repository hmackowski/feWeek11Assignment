// Variables to keep track of the game state
var isXTurn = true; // true if it's X's turn, false if it's O's turn
var gameEnded = false; // true if the game has ended (either someone won or it's a draw), false otherwise
var board = [ // a 3x3 array representing the game board, empty string means no move has been made in that cell
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Function called when a cell on the board is clicked
function makeMove(cell) {
  // If the game has already ended, don't do anything
  if(gameEnded) {
    return;
  }

  // Get the row and column of the cell that was clicked
  var row = $(cell).parent().index();
  var col = $(cell).index();

  // If the clicked cell is empty
  if(board[row][col] === '') {
    // Decide whether it's X's or O's turn
    var player = isXTurn ? 'X' : 'O';
    // Update the game board array with the new move
    board[row][col] = player;
    // Display the move on the HTML board
    $(cell).text(player);

    // If the current player has won with this move
    if(checkWin(row, col)) {
      // Set gameEnded to true and display a winning message
      gameEnded = true;
      $('.container').append(`<div class="alert alert-success mt-3" role="alert">Player ${player} Wins!</div>`);
    } 
    // If all cells are filled and no one has won, it's a draw
    else if(board.flat().every(val => val !== '')) {
        $('.container').append(`<div class="alert alert-warning mt-3" role="alert">Game ended in a draw!</div>`);
      gameEnded = true;
    } 
    // If the game isn't over yet, switch turns
    else {
      isXTurn = !isXTurn;
      $('#info').text(`Player ${isXTurn ? 'X' : 'O'}'s turn`);
    }
  }
}

// Function to check if the current player has won
function checkWin(row, col) {
  var player = board[row][col];

  // Check if all cells in the current row have the player's move
  if(board[row].every(val => val === player)) {
    return true;
  }

  // Check if all cells in the current column have the player's move
  if(board.every(row => row[col] === player)) {
    return true;
  }

  // Check if all cells in the diagonal from top left to bottom right have the player's move
  if(row === col && board.every((row, i) => row[i] === player)) {
    return true;
  }

  // Check if all cells in the diagonal from top right to bottom left have the player's move
  if(row + col === 2 && board.every((row, i) => row[2 - i] === player)) {
    return true;
  }

  // If none of the above checks are true, the player hasn't won yet
  return false;
}

// Function to reset the game
function resetBoard() {
  // Empty the game board array
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  // It's X's turn to start
  isXTurn = true;
  // The game hasn't ended yet
  gameEnded = false;
  // Clear all cells on the HTML board
  $('#grid .cell').text('');
  // Remove any existing alert messages
  $('.alert').remove();
  // Display a message that it's X's turn to start
  $('#info').text(`Player X's turn`);
}
