function evaluate(board, player) {
    return Math.random(); // заглушка
}

function calculateAIMove(board, player) {
    let bestScore = -Infinity;
    let move = 0;

    for (let col = 0; col < 11; col++) {
        if (isValidMove(board, col)) {
            const newBoard = makeMove(board, col, player);
            const score = minimax(newBoard, 3, false, player);
            if (score > bestScore) {
                bestScore = score;
                move = col;
            }
        }
    }
    return move;
}

function isValidMove(board, col) {
    return board[0][col] === null;
}

function makeMove(board, col, player) {
    const newBoard = board.map(r => [...r]);
    for (let row = 8; row >= 0; row--) {
        if (!newBoard[row][col]) {
            newBoard[row][col] = player;
            break;
        }
    }
    return newBoard;
}

function minimax(board, depth, isMaximizing, player) {
    // Реализация Minimax
    return Math.random();
}

export { calculateAIMove };
