import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';


function GameDetails() {
    const gameDetails = useSelector((store) => store.teamStats);



    return (
        gameDetails?.map((stats, i) => {
        return(
        <tr key={i} className='accordion-stats-row'>
            <td> {gameDetails[i].jersey_number}</td>
                <td>{gameDetails[i].first_name}</td>
                <td>{gameDetails[i].last_name}</td>
                <td> {gameDetails[i].points}</td>
                <td> {gameDetails[i].assists}</td>
                <td> {gameDetails[i].rebounds}</td>
                <td> {gameDetails[i].steals}</td>
            </tr>
        )
        }
    ));
}


export default GameDetails;