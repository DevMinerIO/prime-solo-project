import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Game({ currentGame }) {

    // local state to keep track of update game stats when clicked. 
    const [points, setPoints] = useState(currentGame.points);
    const [assists, setAssists] = useState(currentGame.assists);
    const [rebounds, setRebounds] = useState(currentGame.rebounds);
    const [steals, setSteals] = useState(currentGame.steals);

    // this useState will hide the update form unless clicked. 
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    // update stats function. Takes in entire object instead of just game_id. 
    const updatePlayerStats = () => {
        // toggles the hide and show of the input form. 
        setShowForm(!showForm);
        console.log('Here is the current game properties:', currentGame);
    }

    // NOT CURRENTLY USING. direct put request above, rather then chaining
    const submitUpdatedStats = () => {
        dispatch({
            type: 'UPDATE_STATS',
            // currentGame is the prop that was passed in. keeping each game_id
            payload: {
                game_id: currentGame.game_id,
                // this is the player id
                id: currentGame.id,
                points: points,
                assists: assists,
                rebounds: rebounds,
                steals: steals
            }
        })
        // ERROR if you don't have show form toggle off after update of scores!
        // closes the form after submission
        setShowForm(!showForm);
    }

    // Each Row: Opponent, Date, Points, Assists, Rebounds, Steals
    // ternary to either update on "update stats" click or read the game stats. 
    return (
        showForm === true ?

            <tr>
                <td>{currentGame.opponent_name}</td>
                {/* date gets converted into to_char */}
                <td> {currentGame.to_char}</td>
                <td><input type='number' className='update-stats' placeholder='POINTS'
                    value={points} onChange={(event) => setPoints(event.target.value)}>
                </input></td>
                <td><input type='number' className='update-stats' placeholder='ASSISTS'
                    value={assists} onChange={(event) => setAssists(event.target.value)}>
                </input></td>
                <td><input type='number' className='update-stats' placeholder='REBOUNDS'
                    value={rebounds} onChange={(event) => setRebounds(event.target.value)}>
                </input></td>
                <td><input type='number' className='update-stats' placeholder='STEALS'
                    value={steals} onChange={(event) => setSteals(event.target.value)}>
                </input></td>
                {/* // button to submit the updated scores*/}
                <td><button type='button' className='update-button' onClick={submitUpdatedStats}>COMPLETE</button></td>
            </tr>
            :
            <tr>
                <td>{currentGame.opponent_name}</td>
                {/* date gets converted into to_char */}
                <td> {currentGame.to_char}</td>
                <td> {currentGame.points}</td>
                <td> {currentGame.assists}</td>
                <td> {currentGame.rebounds}</td>
                <td> {currentGame.steals}</td>
                {/* // button to update the scores for the current game being clicked on */}
                <td><button type='button' className='btn-update' onClick={updatePlayerStats}>UPDATE STATS</button></td>
            </tr>
    );
}


export default Game;
