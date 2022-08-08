import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';

function ScheduledGame({ game }) {

    return (
        <tr>
            <td>{game.opponent_name}</td>
            <td>{game.last_name}</td>
            <td> {game.jersey_number}</td>
            <td> {game.points}</td>
            <td> {game.assists}</td>
            <td> {game.rebounds}</td>
            <td> {game.steals}</td>
        </tr>
    );
}


export default ScheduledGame;