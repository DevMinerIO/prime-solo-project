import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';


function GameStatsForm() {
    // local states to hold inputs to send to the server on submit. 
    // const [newGame, setNewGame] = useState(0);
    const lastGameId = useSelector((store) => store.getLastGameId);
    // not sure if correct. Attempt 2 below
    const playerId = useSelector((store) => store.playerStats[0].id)
    const getTeam = useSelector((store) => store.playerStats[0].team_id);
    const nextGameId = useSelector((store) => store.getLastGameId[0].id);


    const [points, setPoints] = useState('');
    const [assists, setAssists] = useState('');
    const [rebounds, setRebounds] = useState('');
    const [steals, setSteals] = useState('');

    const dispatch = useDispatch();

    // function to handle adding new game stats
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('THIS IS the store for getLastId', lastGameId);
        console.log('THIS IS getTeam from the store,', getTeam);

        dispatch({
            // not using game_id for now. making new game number from sql query
            //game_id: newGame,
            type: "ADD_STATS",
            payload: {
                playerId: playerId, nextGameId: nextGameId ,playerTeam: getTeam, points: points, assists: assists,
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