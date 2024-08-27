document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const modeSelection = document.querySelector('input[name="gameMode"]');

    let currentPlayer = 'x'; 
    let gameActive = true;
    let isPlayingWithAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleCellClick(event) {
        const cell = event.target;

        if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) {
            return;
        }

        cell.classList.add(currentPlayer);

        if (checkWinner()) {
            statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()} Wins!`;
            gameActive = false;
            return;
        }

        if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
            statusDisplay.textContent = 'It\'s a Draw!';
            gameActive = false;
            return;
        }

        if (isPlayingWithAI && currentPlayer === 'x') {
            currentPlayer = 'o'; 
            statusDisplay.textContent = `AI's Turn`;
            setTimeout(() => aiMove(), 500); 
        } else {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; 
            statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
        }
    }

    function aiMove() {
        const availableCells = [...cells].filter(cell => !cell.classList.contains('x') && !cell.classList.contains('o'));
        if (availableCells.length === 0) return;

        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.classList.add(currentPlayer);

        if (checkWinner()) {
            statusDisplay.textContent = 'AI Wins!';
            gameActive = false;
            return;
        }

        if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
            statusDisplay.textContent = 'It\'s a Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = 'x'; 
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].classList.contains(currentPlayer) &&
                   cells[b].classList.contains(currentPlayer) &&
                   cells[c].classList.contains(currentPlayer);
        });
    }

    function restartGame() {
        cells.forEach(cell => cell.classList.remove('x', 'o'));
        currentPlayer = 'x'; 
        gameActive = true;
        isPlayingWithAI = document.querySelector('input[name="gameMode"]:checked').value === 'ai';
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    
    statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
});
