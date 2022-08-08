import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProgramStats from '../ProgramStats/ProgramStats';

function ProgramView() {
    const dispatch = useDispatch();


    useEffect(() => {
        // AM i allowed to dispatch 2 types in the same dispatch?
        dispatch({
            type: 'FETCH_PROGRAM_STATS'
        });
    }, []);

    // TODO change store to the correct store that still needs to be made. 
    const myTeam = useSelector((store) => store.programStats);
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