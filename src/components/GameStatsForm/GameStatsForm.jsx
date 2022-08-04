import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";


function GameStatsForm() {
    // local states to hold inputs to send to the server on submit. 
    // const [newGame, setNewGame] = useState(0);
    const [points, setPoints] = useState('');
    const [assists, setAssists] = useState('');
    const [rebounds, setRebounds] = useState('');
    const [steals, setSteals] = useState('');

    const dispatch = useDispatch();

    // function to handle adding new game stats
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            // not using game_id for now. making new game number from sql query
            //game_id: newGame,
            type: "ADD_STATS",
            payload: {
                points: points, assists: assists,
                rebounds: rebounds, steals: steals
            }
        })
        // after submit set inputs back to blank
        setPoints('');
        setAssists('');
        setRebounds('');
        setSteals('');
    }
    return (
        <form className='game-stats-form' onSubmit={handleSubmit}>
            <label>points</label>
            <input type="number" value={points}
                onChange={(event) => setPoints(event.target.value)} />
            <label>Assists</label>
            <input type="number" value={assists}
                onChange={(event) => setAssists(event.target.value)} />
            <label>Rebounds</label>
            <input type="number" value={rebounds}
                onChange={(event) => setRebounds(event.target.value)} />
            <label>Steals</label>
            <input type="number" value={steals}
                onChange={(event) => setSteals(event.target.value)} />
            <button type='submit'>SUBMIT SCORES</button>
            
        </form>
    )



}

export default GameStatsForm;