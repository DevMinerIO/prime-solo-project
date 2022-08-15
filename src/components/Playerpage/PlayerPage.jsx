import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Game from '../Game/Game';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import TableNav from '../TableNav/TableNav';
import Footer from '../Footer/Footer';


function PlayerPage() {

    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Your Game Stats');
    const history = useHistory();


    // on load of user login, show player game stats 
    useEffect(() => {
        // AM i allowed to dispatch 2 types in the same dispatch?
        dispatch({
            type: 'FETCH_PLAYER_GAMES'
        });
    }, []);
    // function to take you to addGameStats form. 
    const addGameStats = () => {
        console.log('now taking you to Add game form. ')
        history.push('/addGameStats');
    }

    return (
        <>
            <h2>{heading}</h2>
            <div className='table-container'>
                <TableNav className='table-nav' />
                <table>
                    <thead>
                        <tr>
                            <th>Opponent</th>
                            <th>Date</th>
                            <th>Points</th>
                            <th>Assists</th>
                            <th>Rebounds</th>
                            <th>Steals</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {store.playerStats?.map((game, i) => {
                            return (
                                <Game key={i} currentGame={game} />
                            )
                        })}
                    </tbody>
                </table>

                <button type='button' className='btn btn-add btn-shadow' onClick={addGameStats}>add Game</button>
                <br />
                <Footer />

            </div>
        </>
    );
}

export default PlayerPage;