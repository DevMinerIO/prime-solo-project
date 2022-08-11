import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';

function GameDetails({ individualStats }) {


    return (
        <tr className='accordion-stats-row'>
            <td> {individualStats.jersey_number}</td>
            <td>{individualStats.first_name}</td>
            <td>{individualStats.last_name}</td>
            <td> {individualStats.points}</td>
            <td> {individualStats.assists}</td>
            <td> {individualStats.rebounds}</td>
            <td> {individualStats.steals}</td>
        </tr>
    );
}


export default GameDetails;