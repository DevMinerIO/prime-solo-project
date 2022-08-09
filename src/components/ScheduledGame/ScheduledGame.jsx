import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';

function ScheduledGame({ game }) {

    return (
        <tr>
            <td>{game.opponent_name}</td>
            <td>{game.date}</td>
            <td> {game.points_for}</td>
            <td> {game.points_against}</td>
            <td> {game.outcome}</td>
        </tr>
    );
}


export default ScheduledGame;