const gameBoard = (function () {
    const createPlayer = function (name, marker, activePlayer) {
        return { name, marker, activePlayer };
    };

    const player1 = createPlayer('player 1', 'X', true);
    const player2 = createPlayer('player 2', 'O', false);

    const board = [];

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

    cells.forEach(cell => {
        addEventListener('click', function (e) {
            const cell = e.target;
            text = cell.textContent;

            if (player1.activePlayer && !text && !gameWinner) {
                cell.textContent = 'x';
                board[cell.dataset.no] = 'x';
                player1.activePlayer = false;
                player2.activePlayer = true;
                if (checkWin('x')) {
                    showWinner('x');
                    resetGame();
                }
            } else if (player2.activePlayer && !text && !gameWinner) {
                cell.textContent = 'o';
                board[cell.dataset.no] = 'o';

                player2.activePlayer = false;
                player1.activePlayer = true;
                if (checkWin('o')) {
                    showWinner('o');
                    resetGame();
                }
            } else return;
        });
    });

    for (let i = 0; i < board.length; i++) {
        if (board[i] === 'x') xPlays.push(i);
        if (board[i] === 'o') oPlays.push(i);
    }

    return { board, player1, player2, oPlays, xPlays, winCombs };
})();

const checkWin = function (marker) {
    return gameBoard.winCombs.some(comb => {
        return comb.every(index => {
            return gameBoard.board[index] === marker;
        });
    });
};
