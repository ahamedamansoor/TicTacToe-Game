export default function GameOver({winner, onRestart}) {
return (
<div id="game-over">
    <h2>Game Over!</h2>
    <h3>{ winner ?  `${winner} won !!!` : 'Its a draw !!!'}</h3>
    <p><button onClick={onRestart}>Rematch</button></p>
</div>
)
}