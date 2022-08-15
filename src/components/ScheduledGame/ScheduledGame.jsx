import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';
import GameDetails from '../GameDetails/GameDetails';


function ScheduledGame({ game }) {
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false);
    const gameDetails = useSelector((store) => store.teamStats);


    const handleDetailsClick = () => {
        dispatch({
            type: 'FETCH_GAME_DETAILS',
            payload: {
                gameId: game.id,
                teamId: game.team_id
            }
        })
        console.log('here is gameDetails:', gameDetails);
        setShowDetails(!showDetails);
    }

    const handleDelete = (game) => {
        dispatch({
            type: "REMOVE_GAME",
            payload: game.id
        })
    };

    return (
        showDetails === false ?
            <>
                <tr onClick={handleDetailsClick}>
                    <td>{game.opponent_name}</td>
                    <td>{game.to_char}</td>
                    <td> {game.points_for}</td>
                    <td> {game.points_against}</td>
                    <td> {game.outcome}</td>
                    <td><button class="btn-delete" onClick={(event) => handleDelete(game)}>Delete Game</button></td>
                </tr>
            </>
            :
            <>
                <tr onClick={handleDetailsClick}>
                    <td>{game.opponent_name}</td>
                    <td>{game.to_char}</td>
                    <td> {game.points_for}</td>
                    <td> {game.points_against}</td>
                    <td> {game.outcome}</td>
                    <td><button class="btn-delete" onClick={(event) => handleDelete(game)}>Delete Game</button></td>
                </tr>
                
                    <thead>
                        <tr>
                            <td>Jersey Number</td>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Points</th>
                            <th>Assists</th>
                            <th>Rebounds</th>
                            <th>Steals</th>
                        </tr>
                </thead>
                <tbody>
                    <GameDetails />
                </tbody>
                    
                
            </>
    );
}


export default ScheduledGame;