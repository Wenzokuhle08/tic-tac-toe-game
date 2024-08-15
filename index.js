window.onload = function () {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = "X";
    let userPlayer = "X";
    let computerPlayer = "O";
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

    
    userPlayer = prompt("Do you want to play as X or O?").toUpperCase();
    if (userPlayer === "O") {
        currentPlayer = "O";
        computerPlayer = "X";
        statusText.innerHTML = "Computer's turn";
        setTimeout(computerMove, 500); 
    } else {
        userPlayer = "X";  
        computerPlayer = "O";
        statusText.innerHTML = "Player X's turn";
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(cell, index) {
        if (cell.innerHTML !== "" || isGameOver || currentPlayer !== userPlayer) {
            return;
        }

        makeMove(cell, index, currentPlayer);
        checkWin();

        if (!isGameOver) {
            currentPlayer = computerPlayer;
            statusText.innerHTML = "Computer's turn";
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        let availableCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
        if (availableCells.length > 0) {
            let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            let cell = cells[randomIndex];
            makeMove(cell, randomIndex, computerPlayer);
            checkWin();
            if (!isGameOver) {
                currentPlayer = userPlayer;
                statusText.innerHTML = `Player ${userPlayer}'s turn`;
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
        currentPlayer = userPlayer;
        statusText.innerHTML = `Player ${userPlayer}'s turn`;
        cells.forEach(cell => cell.innerHTML = "");

        
        if (currentPlayer === "O") {
            setTimeout(computerMove, 500);
        }
    }
}
