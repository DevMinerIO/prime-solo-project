import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TeamGame({ currentTeamGame }) {


    return (
            <tr>
            <td>{currentTeamGame.opponent_name}</td>
                <td>{currentTeamGame.last_name}</td>
                <td> {currentTeamGame.jersey_number}</td>
                <td> {currentTeamGame.points}</td>
                <td> {currentTeamGame.assists}</td>
                <td> {currentTeamGame.rebounds}</td>
                <td> {currentTeamGame.steals}</td>
            </tr>
    );
}


export default TeamGame;