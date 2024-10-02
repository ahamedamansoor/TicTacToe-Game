import Player from "./assets/components/Player.jsx";
import GameBoard from "./assets/components/GameBoard.jsx";
import {useState} from "react";
import Log from "./assets/components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combination.js";
import GameOver from "./assets/components/GameOver.jsx";


const initialGameBoard = [[null, null, null],[null, null, null],[null, null, null]]

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X'
    if ( gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const [players, setPlayers ] = useState({
        'X': 'Player 1',
        'O': 'Player 2'
    })
    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (let turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    const hasDraw = gameTurns.length === 9 && !winner;

    function hanldePlayerName(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }
    function handleSelectedSquare(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns)
            return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        });
    }
    function handleRestart() {
        setGameTurns([]);
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={hanldePlayerName}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={hanldePlayerName}/>
        </ol>

          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
      </div>
        <Log turns={gameTurns}/>
    </main>
  )
}

export default App
