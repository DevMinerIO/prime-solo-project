import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TeamGame from '../TeamGame/TeamGame';
import { useHistory } from 'react-router-dom';


function ProgramView() {

    // TODO change store to the correct store that still needs to be made. 
    const myTeam = useSelector((store) => store.playerStats);
    const history = useHistory();

    const HandleBackButton = () => {
        history.push('/user')
    }


    return (
        <div>
            <h2>Program Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Last Name</th>
                        <th>Jersey #</th>
                        <th>Avg Points</th>
                        <th>Avg Assists</th>
                        <th>Avg Rebounds</th>
                        <th>Avg Steals</th>
                    </tr>
                </thead>
                <tbody>
                    {myTeam.map((game, i) => {
                        return (
                            <ProgramStats key={i} currentStats={game} />
                        )
                    })}
                </tbody>
            </table>
            <button onClick={HandleBackButton}>back To Your Stats</button>
        </div>
    );
}

export default ProgramView;