import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Game({ currentGame}) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    // Each Row: Opponent, Date, Points, Assists, Rebounds, Steals
    return ( 
        <tr>
            <td>{currentGame.game_id}</td>
            <td>{currentGame.opponent_name}</td>
            {/* TODO FORMAT DATE PROPERLY */}
            <td> {currentGame.date}</td>
            <td> {currentGame.points}</td>
            <td> {currentGame.assists}</td>
            <td> {currentGame.rebounds}</td>
            <td> {currentGame.steals}</td>
        </tr>
    );
}

export default Game;
