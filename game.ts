export enum Disc {
    Empty,
    Red,
    Yellow}

export class Game {
    board: Board;
    player1: Player;
    player2: Player;
    currentPlayer: Player;
    constructor(player1: Player, player2: Player) {
        this.board = new Board(player1, player2);
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
    }

    public play(x: number): void {
        try {
            this.board.play(x, this.currentPlayer);
            if (this.board.isGameOver()) {
                this.printBoard();
                console.log(`${this.currentPlayer.name} has won!`);
            }
            this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        } catch (error) {
            console.log((error as Error).message);
            return;
        }

    }

    public printBoard(): void {
        this.board.printBoard();
    }

    public printCurrentPlayer(): void {
        console.log(`${this.currentPlayer.name}'s turn`);
    }

    public isGameOver(): boolean {
        return this.board.isGameOver();
    }


}

class Board {
    static readonly width: number = 7;
    static readonly height: number = 6;
    matrix: Disc[][];
    player1: Player;
    player2: Player;
    constructor(player1: Player, player2: Player) {
        this.matrix = [];
        for (let i = 0; i < Board.width; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < Board.height; j++) {
                this.matrix[i][j] = Disc.Empty;
            }
        }
        if (player1.selectedDisc === player2.selectedDisc) {
            throw new Error("Players must have different discs");
        }
        this.player1 = player1;
        this.player2 = player2;
    }
    private getDiscAt(x: number, y: number): Disc {
        return this.matrix[x][y];
    }
    
    private setDiscAt(x: number, y: number, disc: Disc): void {
        this.matrix[x][y] = disc;
    }

    private dropDiscAt(x: number, disc: Disc): void {
        for (let y = 0; y < Board.height; y++) {
            if (this.getDiscAt(x, y) === Disc.Empty) {
                this.setDiscAt(x, y, disc);
                return;
            }
        }

    }

    private isColumnFull(x: number): boolean {
        return this.getDiscAt(x, Board.height - 1) !== Disc.Empty;
    }

    public play(x: number, player: Player): void {
        if (x < 0 || x >= Board.width) {
            throw new Error("Invalid x coordinate");
        }

        if (this.isColumnFull(x)) {
            throw new Error("Column is full");
        }

        this.dropDiscAt(x, player.selectedDisc);
    }

    public isGameOver(): boolean {
        // Check for horizontal win
        for (let y = 0; y < Board.height; y++) {
            for (let x = 0; x < Board.width - 3; x++) {
                let disc = this.getDiscAt(x, y);
                if (disc !== Disc.Empty &&
                    disc === this.getDiscAt(x + 1, y) &&
                    disc === this.getDiscAt(x + 2, y) &&
                    disc === this.getDiscAt(x + 3, y)) {
                    return true;
                }
            }
        }
        //Check for vertical win
        for (let y = 0; y < Board.height - 3; y++) {
            for (let x = 0; x < Board.width; x++) {
                let disc = this.getDiscAt(x, y);
                if (disc !== Disc.Empty &&
                    disc === this.getDiscAt(x, y + 1) &&
                    disc === this.getDiscAt(x, y + 2) &&
                    disc === this.getDiscAt(x, y + 3)) {
                    return true;
                }
            }
        }

        //Check for diagonal win
        for (let y = 0; y < Board.height - 3; y++) {
            for (let x = 0; x < Board.width - 3; x++) {
                let disc = this.getDiscAt(x, y);
                if (disc !== Disc.Empty &&
                    disc === this.getDiscAt(x + 1, y + 1) &&
                    disc === this.getDiscAt(x + 2, y + 2) &&
                    disc === this.getDiscAt(x + 3, y + 3)) {
                    return true;
                }
            }
        }
        return false;
    }

    public printBoard() {
        for (let y = Board.height - 1; y >= 0; y--) {
            let row = "|";
            for (let x = 0; x < Board.width; x++) {
                switch (this.getDiscAt(x, y)) {
                    case Disc.Empty:
                        row += " ";
                        break;
                    case Disc.Red:
                        row += "R";
                        break;
                    case Disc.Yellow:
                        row += "Y";
                        break;
                }
                row += "|";
            }
            console.log(row);
            let rowSplitter = "";
            for (let x = 0; x < Board.width * 2 + 1; x++) {
                rowSplitter += "-";
            }
            console.log(rowSplitter);
        }
        
    }
}

export class Player {
    name: string;
    selectedDisc: Disc;
    constructor(name: string, selectedDisc: Disc) {
        this.name = name;
        this.selectedDisc = selectedDisc;
    }
}