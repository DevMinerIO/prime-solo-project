import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Game from '../Game/Game';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlayerPage() {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('PLAYER NAME HERE');

    // on load of user login, show player game stats 
    useEffect(() => {
        dispatch({ type: 'FETCH_PLAYER_GAMES' });
    }, []);

    return (
        <div>
            <h2>{heading}</h2>
            <p>MAYBE add other info like Jersey # and current team</p>
            <table>
                <thead>
                    <tr>
                        <th>Opponent</th>
                        <th>Date</th>
                        <th>Points</th>
                        <th>Assists</th>
                        <th>Rebounds</th>
                        <th>Steals</th>
                    </tr>
                </thead>
                <tbody>
                {store.playerStats.map((game, i) => {
                    return (
                        <Game key={i} currentGame={game} />
                    )
                })}
            </tbody>
            </table>

        </div>
    );
}

export default PlayerPage;