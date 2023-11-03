const gameBoard = (function () {
    let xPlays = [];
    let oPlays = [];
    let xTurn = true;
    gameboard = []
    const windCombs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 9]
    ];
    const cells = document.querySelectorAll('.cell');
    


    
    cells.forEach(cell => {
    addEventListener('click', function (e) {
        const cell = e.target;
        text = cell.textContent;

        if (xTurn && !text) {
            cell.textContent = 'x';
            gameboard.splice(cell.dataset.no, 0, 'x');
            xTurn = false

        } else if (!xTurn && !text) {
            cell.textContent = 'o';
            gameboard.splice(cell.dataset.no, 0, 'x');
            xTurn = true
        } else return;

    }, );
});


})();

