import copy

WIN_LENGTH = 7

def evaluate(board, player):
    score = 0
    opponent = "X" if player == "O" else "O"

    score += count_sequences(board, player, 6) * 100
    score += count_sequences(board, player, 5) * 10
    score -= count_sequences(board, opponent, 6) * 1000
    score -= count_sequences(board, opponent, 5) * 20

    return score

def count_sequences(board, piece, length):
    count = 0
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] == piece:
                count += count_direction(board, row, col, piece, 1, 0, length)
                count += count_direction(board, row, col, piece, 0, 1, length)
                count += count_direction(board, row, col, piece, 1, 1, length)
                count += count_direction(board, row, col, piece, 1, -1, length)
    return count // 2

def count_direction(board, row, col, piece, d_row, d_col, target_length):
    r, c = row, col
    length = 0
    while 0 <= r < len(board) and 0 <= c < len(board[0]) and board[r][c] == piece:
        length += 1
        r += d_row
        c += d_col
    return 1 if length >= target_length else 0

def minimax(board, depth, maximizing, player):
    if depth == 0 or check_win(board, player) or check_win(board, "X" if player == "O" else "O"):
        return evaluate(board, player), None

    best_score = -float('inf') if maximizing else float('inf')
    best_col = None

    for col in valid_moves(board):
        new_board = drop_piece(copy.deepcopy(board), col, player if maximizing else ("O" if player == "X" else "X"))
        score, _ = minimax(new_board, depth - 1, not maximizing, player)

        if maximizing:
            if score > best_score:
                best_score = score
                best_col = col
        else:
            if score < best_score:
                best_score = score
                best_col = col

    return best_score, best_col

def valid_moves(board):
    return [col for col in range(len(board[0])) if board[0][col] is None]

def drop_piece(board, col, piece):
    for row in reversed(range(len(board))):
        if board[row][col] is None:
            board[row][col] = piece
            return board
    return board

def check_win(board, piece):
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] == piece:
                if check_line(board, row, col, piece, 1, 0) or \
                   check_line(board, row, col, piece, 0, 1) or \
                   check_line(board, row, col, piece, 1, 1) or \
                   check_line(board, row, col, piece, 1, -1):
                    return True
    return False

def check_line(board, row, col, piece, d_row, d_col):
    count = 0
    r, c = row, col
    while 0 <= r < len(board) and 0 <= c < len(board[0]) and board[r][c] == piece:
        count += 1
        r += d_row
        c += d_col
    return count >= WIN_LENGTH
