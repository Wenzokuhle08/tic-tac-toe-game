window.onload = function () {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameOver = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(cell, index) {
        if (cell.innerHTML !== "" || isGameOver || currentPlayer !== "X") {
            return;
        }

        makeMove(cell, index, currentPlayer);
        checkWin();

        if (!isGameOver) {
            currentPlayer = "O";
            statusText.innerHTML = "Computer's turn";
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        let availableCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
        if (availableCells.length > 0) {
            let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            let cell = cells[randomIndex];
            makeMove(cell, randomIndex, "O");
            checkWin();
            if (!isGameOver) {
                currentPlayer = "X";
                statusText.innerHTML = "Player X's turn";
            }
        }
    }

    function makeMove(cell, index, player) {
        cell.innerHTML = player;
        board[index] = player;
    }

    function checkWin() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.innerHTML = `Player ${currentPlayer} wins!`;
            isGameOver = true;
            return;
        }

        if (!board.includes("")) {
            statusText.innerHTML = "It's a draw!";
            isGameOver = true;
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameOver = false;
        currentPlayer = "X";
        statusText.innerHTML = `Player X's turn`;
        cells.forEach(cell => cell.innerHTML = "");
    }
}
