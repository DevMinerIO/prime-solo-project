import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TeamGame from '../TeamGame/TeamGame';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TableNav from '../TableNav/TableNav';


function TeamView() {

    const teamId = useSelector((store) => store.playerStats);
    const myTeam = useSelector((store) => store.teamStats)
    const [heading, setHeading] = useState('THIS SHOULD SHOULD NEVER SHOW!');
    const history = useHistory();
    const dispatch = useDispatch();

    const HandleBackButton = () => {
        history.push('/user')
    }

    console.log('Store teamStats id is:', teamId[0]?.team_id);
    console.log('myTeam is:', myTeam);
    console.log('THIS IS team ID', teamId);
    const printTeam = (teamId) => {
        switch (teamId) {
            case 1:
                setHeading('9th Grade');
                break;
            case 2:
                setHeading('B-Squad');
                break;
            case 3:
                setHeading('JV');
                break;
            case 4:
                setHeading('Varsity');
                break;
            default:
                console.log('error with switch statement in TeamView');
        }
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_PLAYER_GAMES'
        });
        printTeam(teamId[0]?.team_id);
    }, []);
    console.log('Your team is:', heading);


    return (
        <>
            <h2>Team Stats</h2>
            <div className='table-container'>
                <TableNav className='table-nav' />
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Jersey #</th>
                            <th>AvgPoints</th>
                            <th>AvgAssists</th>
                            <th>AvgRebounds</th>
                            <th>AvgSteals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTeam?.map((game, i) => {
                            return (
                                <TeamGame key={i} currentTeamGame={game} />
                            )
                        })}
                    </tbody>
                </table>
                <button className='btn-back' onClick={HandleBackButton}>back To Your Stats</button>
            </div>
        </>
    );
}

export default TeamView;