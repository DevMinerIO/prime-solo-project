import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Game({ currentGame }) {

    // local state to keep track of update game stats when clicked. 
    const [points, setPoints] = useState('');
    const [assists, setAssists] = useState('');
    const [rebounds, setRebounds] = useState('');
    const [steals, setSteals] = useState('');

    // this useState will hide the update form unless clicked. 
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((store) => store);

    // update stats function. Takes in entire object instead of just game_id. 
    const updatePlayerStats = () => {
        // toggles the hide and show of the input form. 
        setShowForm(!showForm);
        console.log('Here is the current game properties:', currentGame);
    }
    const submitUpdatedStats = () => {

        dispatch({
            type: 'UPDATE_STATS',
            // currentGame is the prop that was passed in. keeping each game_id
            payload: {game_id: currentGame.game_id,}
        })
        // closes the form after submission
        setShowForm(!showForm);
        
    }

    // Each Row: Opponent, Date, Points, Assists, Rebounds, Steals
    // ternary to either update on "update stats" click or read the game stats. 
    return (
        showForm === true ?

            <tr>
                <td>{currentGame.game_id}</td>
                <td>{currentGame.opponent_name}</td>
                {/* TODO FORMAT DATE PROPERLY */}
                <td> {currentGame.date}</td>
                <td><input type='number' className='update-stats' placeholder='POINTS'
                    value={points} onChange={(event) => setPoints(event.target.value)}>
                </input></td>
                <td><input type='number' className='update-stats' placeholder='ASSISTS'
                    value={assists} onChange={(event) => setPoints(event.target.value)}>
                </input></td>
                <td><input type='number' className='update-stats' placeholder='REBOUNDS'
                    value={rebounds} onChange={(event) => setPoints(event.target.value)}>
                </input></td>
                <td><input type='number' className='update-stats' placeholder='STEALS'
                    value={steals} onChange={(event) => setPoints(event.target.value)}>
                </input></td>
                {/* // button to submit the updated scores*/}
                <td><button type='button' className='update-button' onClick={submitUpdatedStats}>Submit Updates</button></td>
            </tr>
            :
            <tr>
                <td>{currentGame.game_id}</td>
                <td>{currentGame.opponent_name}</td>
                {/* TODO FORMAT DATE PROPERLY */}
                <td> {currentGame.date}</td>
                <td> {currentGame.points}</td>
                <td> {currentGame.assists}</td>
                <td> {currentGame.rebounds}</td>
                <td> {currentGame.steals}</td>
                {/* // button to update the scores for the current game being clicked on */}
                <td><button type='button' className='update-button' onClick={updatePlayerStats}>UPDATE STATS</button></td>
            </tr>
    );
}

export default Game;
