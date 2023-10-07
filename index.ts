import { read } from "fs";
import { Game, Player, Disc } from "./game";

const player1 = new Player("Player 1", Disc.Red);
const player2 = new Player("Player 2", Disc.Yellow);

const game = new Game(player1, player2);

while (game.isGameOver() === false) {
    game.printBoard();
    game.printCurrentPlayer();
    const column = await readInput();
    game.play(column);
}


async function readInput() : Promise<number> {
    const prompt = "Type the column: ";
    process.stdout.write(prompt);
    let column = 0;
    for await (const line of console) {
        console.log(`You typed column: ${line}`);
        column = parseInt(line);
        if (isNaN(column) || column < 0 || column > 6) {
            process.stdout.write("Invalid column. Try again:");
            continue;
        }
        break;
    }

    return column;
}
