import random
import os

class Minesweeper:
    def __init__(self, rows, cols, num_mines):
        self.rows = rows
        self.cols = cols
        self.num_mines = num_mines
        self.board = [['#' for _ in range(cols)] for _ in range(rows)]
        self.generate_board()

    def generate_board(self):
        # Place mines randomly
        mines_placed = 0
        while mines_placed < self.num_mines:
            row = random.randint(0, self.rows - 1)
            col = random.randint(0, self.cols - 1)
            if self.board[row][col] != 'M':
                self.board[row][col] = 'M'
                mines_placed += 1

    def uncover(self, row, col):
        if self.board[row-1][col-1] == 'M':
            return False
        self._uncover_recursive(row-1, col-1)
        return True

    def _uncover_recursive(self, row, col):
        if row < 0 or row >= self.rows or col < 0 or col >= self.cols or self.board[row][col] != '#':
            return
        mine_count = self.get_adjacent_mines(row, col)
        if mine_count > 0:
            self.board[row][col] = str(mine_count)
            return
        self.board[row][col] = '0'
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr != 0 or dc != 0:
                    self._uncover_recursive(row + dr, col + dc)

    def get_adjacent_mines(self, row, col):
        count = 0
        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr != 0 or dc != 0:
                    r, c = row + dr, col + dc
                    if 0 <= r < self.rows and 0 <= c < self.cols and self.board[r][c] == 'M':
                        count += 1
        return count

    def display(self):
        os.system('cls' if os.name == 'nt' else 'clear')  # Clear terminal screen
        row_padding = ' ' if self.rows >= 10 else ''
        col_padding = ' ' if self.rows < 10 else '  '
        print(row_padding + col_padding + '   ' + ' '.join([str(i) for i in range(1, self.cols + 1)]))
        print('  ' + (row_padding * 2) + '+-' * (self.cols + 1) + '+')
        for i in range(self.rows):
            row_display = []
            for j in range(self.cols):
                cell = self.board[i][j]
                if cell == 'M':
                    row_display.append('#')
                elif cell == '0':
                    row_display.append('\033[94m' + cell + '\033[0m')  # Blue color for empty cells
                elif cell.isdigit():
                    row_display.append('\033[91m' + cell + '\033[0m')  # Red color for numbers > 0
                else:
                    row_display.append(cell)
            row_number = str(i+1) if self.rows < 10 else str(i+1).rjust(len(str(self.rows)))
            print(row_number + row_padding + ' | ' + ' '.join(row_display) + ' |')
        print('  ' + (row_padding * 2) + '+-' * (self.cols + 1) + '+')


def main():
    rows = int(input("Enter number of rows: "))
    cols = int(input("Enter number of columns: "))
    mines = int(input("Enter number of mines: "))
    game = Minesweeper(rows, cols, mines)

    while True:
        game.display()
        row = int(input("Enter row (1 to {}): ".format(rows)))
        col = int(input("Enter column (1 to {}): ".format(cols)))
        if not (1 <= row <= rows and 1 <= col <= cols):
            print("Invalid input. Please enter row and column within the board size.")
            continue
        if not game.uncover(row, col):
            game.display()
            print("Game over! You hit a mine.")
            break
        if all(all(cell != '#' for cell in row) for row in game.board):
            game.display()
            print("Congratulations! You win!")
            break

if __name__ == "__main__":
    main()
