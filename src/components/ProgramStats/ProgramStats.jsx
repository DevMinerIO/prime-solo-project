import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import axios from 'axios';


function ProgramStats({ currentStats }) {

    return (
        <tr>
            <td>{currentStats.team_id}</td>
            <td>{currentStats.last_name}</td>
            <td>{currentStats.jersey_number}</td>
            <td>{currentStats.avg_points}</td>
            <td>{currentStats.avg_assists}</td>
            <td>{currentStats.avg_rebounds}</td>
            <td>{currentStats.avg_steals}</td>
        </tr>
    );
}


export default ProgramStats;