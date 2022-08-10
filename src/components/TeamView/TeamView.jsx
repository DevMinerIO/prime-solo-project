import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TeamGame from '../TeamGame/TeamGame';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


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
        <div>
            <h2>Team Stats For: {heading}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Opponent</th>
                        <th>Last Name</th>
                        <th>Jersey #</th>
                        <th>Points</th>
                        <th>Assists</th>
                        <th>Rebounds</th>
                        <th>Steals</th>
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
            <button onClick={HandleBackButton}>back To Your Stats</button>
        </div>
    );
}

export default TeamView;