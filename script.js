const gameBoard = (function () {
    const createPlayer = function (name, marker, activePlayer) {
        return {name, marker, activePlayer};
    };

    const player1 = createPlayer('Player 1', 'X', true);
    const player2 = createPlayer('Player 2', 'O', false);

    let board = [];

    let gameWinner = false;

    const winCombs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const cells = document.querySelectorAll('.cell');

    const displayMarker = function () {
        cells.forEach(cell => {
            addEventListener('click', handleClick);
        });
    };

    const handleClick = function (e) {
        const cell = e.target;
        text = cell.textContent;
        if (player1.activePlayer && !text && !gameWinner) {
            cell.textContent = 'x';
            board[cell.dataset.no] = 'x';
            if (checkWin('x')) {
                showWinner('x');
                resetGame();
            } else if (isDraw()) {
                showDraw();
                resetGame();
            } else {
                player1.activePlayer = false;
                player2.activePlayer = true;
            }
        } else if (player2.activePlayer && !text && !gameWinner) {
            cell.textContent = 'o';
            board[cell.dataset.no] = 'o';
            if (checkWin('o')) {
                showWinner('o');
                resetGame();
            } else if (isDraw()) {
                showDraw();
                resetGame();
            } else {
                player2.activePlayer = false;
                player1.activePlayer = true;
            }
        } else return;
    };

    return {
        board,
        player1,
        player2,
        winCombs,
        cells,
        gameWinner,
        displayMarker,
        handleClick,
    };
})();

gameBoard.displayMarker();

const checkWin = function (marker) {
    return gameBoard.winCombs.some(comb => {
        return comb.every(index => {
            return gameBoard.board[index] === marker;
        });
    });
};

const resetGame = function () {
    gameBoard.player1.activePlayer = true;
    gameBoard.player2.activePlayer = false;
    gameBoard.player1.name = document.querySelector('#player1').value;
    gameBoard.player2.name = document.querySelector('#player2').value;
    console.log(document.querySelector('#player1').value);

    for (const cell of gameBoard.cells) {
        cell.textContent = '';
    }
    gameBoard.board.fill('');
    gameBoard.cells.forEach(cell => {
        cell.removeEventListener('click', gameBoard.handleClick);
    });
    gameBoard.displayMarker();
    console.log(gameBoard.player1.name);
};

const isDraw = function () {
    return [...gameBoard.cells].every(cell => {
        return cell.textContent !== '';
    });
    console.log('draw running');
};

const showWinner = function () {
    if (gameBoard.player1.activePlayer)
        console.log(`${gameBoard.player1.name} wins!`);
    if (gameBoard.player2.activePlayer)
        console.log(`${gameBoard.player2.name} wins!`);
    console.log('winner running');
};

const showDraw = function () {
    console.log("It's a draw!");
};

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    resetGame();
});
