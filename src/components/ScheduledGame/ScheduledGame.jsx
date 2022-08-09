import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';


function ScheduledGame({ game }) {
    const dispatch = useDispatch();


    const handleDelete = (game) => {
        dispatch({
            type: "REMOVE_GAME",
            payload: game.id
        })
            dispatch({
                type: 'FETCH_SCHEDULE'
            })
    };

    return (
        <tr>
            <td>{game.opponent_name}</td>
            <td>{game.date}</td>
            <td> {game.points_for}</td>
            <td> {game.points_against}</td>
            <td> {game.outcome}</td>
            <td><button onClick={(event) => handleDelete(game)}>Delete Game</button></td>
        </tr>
    );
}


export default ScheduledGame;