const gameBoard = (function () {
    const createPlayer = function (name, marker, activePlayer) {
        return {name, marker, activePlayer};
    };

    const player1 = createPlayer('Player 1', 'X', true);
    const player2 = createPlayer('Player 2', 'O', false);

    let board = [];

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

    const getwinCombs = function () {
        return winCombs;
    };

    const cells = document.querySelectorAll('.cell');

    const placeMarker = function () {
        cells.forEach(cell => {
            addEventListener('click', handleClick);
        });
    };

    const handleClick = function (e) {
        const cell = e.target;
        text = cell.textContent;
        if (player1.activePlayer && !text) {
            cell.textContent = 'x';
            board[cell.dataset.no] = 'x';
            if (gameController.checkWin('x')) {
                gameController.showWinner('x');
            } else if (gameController.isDraw()) {
                gameController.showDraw();
            } else {
                player1.activePlayer = false;
                player2.activePlayer = true;
            }
        } else if (player2.activePlayer && !text) {
            cell.textContent = 'o';
            board[cell.dataset.no] = 'o';
            if (gameController.checkWin('o')) {
                gameController.showWinner('o');
            } else if (gameController.isDraw()) {
                gameController.showDraw();
            } else {
                player2.activePlayer = false;
                player1.activePlayer = true;
            }
        } else return;
    };

    placeMarker();

    return {
        board,
        player1,
        player2,
        getwinCombs,
        cells,
        placeMarker,
        handleClick,
    };
})();

const gameController = (function () {
    const checkWin = function (marker) {
        return gameBoard.getwinCombs().some(comb => {
            return comb.every(index => {
                return gameBoard.board[index] === marker;
            });
        });
    };

    const showWinner = function () {
        if (gameBoard.player1.activePlayer)
            document.querySelector(
                '.win-message'
            ).textContent = `${gameBoard.player1.name} wins!`;
        if (gameBoard.player2.activePlayer)
            document.querySelector(
                '.win-message'
            ).textContent = `${gameBoard.player2.name} wins!`;
    };

    const resetGame = function () {
        document.querySelector('.win-message').textContent = '';
        gameBoard.player1.activePlayer = true;
        gameBoard.player2.activePlayer = false;
        gameBoard.player1.name = document.querySelector('#player1').value;
        gameBoard.player2.name = document.querySelector('#player2').value;

        for (const cell of gameBoard.cells) {
            cell.textContent = '';
        }
        gameBoard.board.fill('');
        gameBoard.cells.forEach(cell => {
            cell.removeEventListener('click', gameBoard.handleClick);
        });
        gameBoard.placeMarker();
    };

    const showDraw = function () {
        document.querySelector('.win-message').textContent = `It\'s a draw!`;
    };

    const isDraw = function () {
        return [...gameBoard.cells].every(cell => {
            return cell.textContent !== '';
        });
    };

    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        resetGame();
    });

    return {checkWin, showWinner, showDraw, isDraw, resetGame};
})();
