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
    const store = useSelector((store) => store);
    const history = useHistory();
    const teamSchedule = useSelector((store) => store.gameSchedule);



    // on load of user login, show player game stats 
    useEffect(() => {
        dispatch({
            type: 'FETCH_SCHEDULE'
        });
    }, []);
    // function to take you to addGameStats form. 
    const addGame = () => {
        console.log('now taking you to Add game form. ')
        history.push('/addGameForm');
    }

    return (
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
                    {teamSchedule.map((game, i) => {
                        return (
                            <ScheduledGame key={i} game={game} />
                        )
                    })}
                </tbody>
            </table>
            <button type='button' onClick={addGame}>add Game</button>

        </div>
    );
}

export default CoachView;