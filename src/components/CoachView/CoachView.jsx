import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ScheduledGame from '../ScheduledGame/ScheduledGame'



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CoachView() {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const dispatch = useDispatch();
    const history = useHistory();
    const teamSchedule = useSelector((store) => store.gameSchedule);
    // toggle for showing add game form. 
    const [showForm, setShowForm] = useState(false);
    // local state to clear inputs after submitting a new game. 
    const [opponent, setOpponent] = useState('');
    const [date, setDate] = useState('');
    const [pointsFor, setPointsFor] = useState('');
    const [pointsAgainst, setPointsAgainst] = useState('');
    const [outcome, setOutcome] = useState('');



    // on load of user login, show player game stats 
    // passing through fetch_player in order to get on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_SCHEDULE'
        });
    }, []);
    // function to take you to addGameStats form. 
    const addGame = () => {
        setShowForm(!showForm);
    }
    const submitGame = (event) => {

        event.preventDefault();
        dispatch({
            // not using game_id for now. making new game number from sql query
            //game_id: newGame,
            type: "ADD_NEW_GAME",
            payload: {
                team_id: teamSchedule[0].team_id, opponent_name: opponent, date: date, points_for:
                    pointsFor, points_against: pointsAgainst,outcome: outcome
            }
        })
        // after submit set inputs back to blank
        setOpponent('');
        setDate('');
        setPointsFor('');
        setPointsAgainst('');
        setPointsAgainst('');
        setOutcome('');
        // hide form after hitting submit
        setShowForm(!showForm);
        // re-render page with new info
    }

    return (
        showForm === false ?
            <div>
                <div className='statsNav'>
                    <Link to="/user" className='statsLink'>Your Stats</Link>
                    <Link to="/team" className='statsLink'>Team Stats</Link>
                    <Link to="/program" className='statsLink'>Program Stats</Link>
                </div>
                <h2>Coaches View</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Opponent</th>
                            <th>Date</th>
                            <th>Points FOR</th>
                            <th>Points AGAINST</th>
                            <th>Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamSchedule?.map((game, i) => {
                            return (
                                <ScheduledGame key={i} game={game} />
                            )
                        })}
                    </tbody>
                </table>
                <button type='button' onClick={addGame}>add Game</button>

            </div>
            :
            <div>
                <div className='statsNav'>
                    <Link to="/user" className='statsLink'>Your Stats</Link>
                    <Link to="/team" className='statsLink'>Team Stats</Link>
                    <Link to="/program" className='statsLink'>Program Stats</Link>
                </div>
                <h2>Coaches View</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Opponent</th>
                            <th>Date</th>
                            <th>Points FOR</th>
                            <th>Points AGAINST</th>
                            <th>Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamSchedule?.map((game, i) => {
                            return (
                                <ScheduledGame key={i} game={game} />
                            )
                        })}
                    </tbody>
                </table>
                <form onSubmit={submitGame}>
                    <label className='add-game-label' htmlFor="opponent-name">Opponent:</label>
                    <input type="text" className='add-game-input' value={opponent}
                        onChange={(event) => setOpponent(event.target.value)}>
                    </input>
                    <label className='add-game-label' htmlFor="date">Date of game:</label>
                    <input type="date" className='add-game-input' value={date}
                        onChange={(event) => setDate(event.target.value)}>
                    </input>
                    <label className='add-game-label' htmlFor="game-date">Your points:</label>
                    <input type="number" className='add-game-input' value={pointsFor}
                        onChange={(event) => setPointsFor(event.target.value)}>
                    </input>
                    <label className='add-game-label' htmlFor="points-for">Opponents points:</label>
                    <input type="number" className='add-game-input' value={pointsAgainst}
                        onChange={(event) => setPointsAgainst(event.target.value)}>
                    </input>
                    <label className='add-game-label' htmlFor="outcome">Outcome:</label>
                    <select name="outcome-selector" id='outcome' onChange={(event) => setOutcome(event.target.value)}>
                        <option defaultValue>Not played yet</option>
                        <option value='W'>WIN</option>
                        <option value='L'>LOSS</option>
                        <option value='T'>TIE</option>
                    </select>
                    {/* <input type="number" className='add-game-input' value={outcome}
                        onChange={(event) => setOutcome(event.target.value)}>
                    </input> */}
                    <button type='submit'>Finish Adding Game</button>
                </form>

            </div>
    );
}

export default CoachView;