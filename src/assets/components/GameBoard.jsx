import {useState} from "react";

export default function GameBoard({onSelectSquare, board}) {
    return (
       <ol id="game-board">
           {board.map((gameBoard,rowindex) => {
              return (<li key={rowindex}>
                  <ol>
                      {gameBoard.map((playerSymbol, colIndex) => {
                          return <li key={colIndex}>
                              <button disabled={playerSymbol} onClick={() => onSelectSquare(rowindex, colIndex)}>{playerSymbol}</button>
                          </li>
                      })}
                  </ol>
              </li>)
           })}
       </ol>
    )
}