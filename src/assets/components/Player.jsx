import {useState} from "react";

export default function Player({name, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);
return (
    <li className={isActive? 'active': undefined}>
                <span className="player">
             {!isEditing && <span className="player-name">{playerName}</span>}
             {isEditing && <input type="text" defaultValue={playerName} onInput={(event) => setPlayerName(event?.target?.value)}/>}
              <span className="player-symbol">{symbol}</span>
                    </span>
        <button onClick={() => setIsEditing((editing) => {
            if (isEditing) {
                onChangeName(symbol, playerName);
            }
            return !editing})}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
)
}
