import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';

function TeamGame({ currentTeamGame }) {


    return (
            <tr>
            <td>{currentTeamGame.first_name}</td>
                <td>{currentTeamGame.last_name}</td>
                <td> {currentTeamGame.jersey_number}</td>
                <td> {currentTeamGame.avg_points}</td>
                <td> {currentTeamGame.avg_assists}</td>
                <td> {currentTeamGame.avg_rebounds}</td>
                <td> {currentTeamGame.avg_steals}</td>
            </tr>
    );
}


export default TeamGame;