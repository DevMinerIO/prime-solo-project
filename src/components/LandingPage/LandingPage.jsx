import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2 className='mission-header'>Mission Statement:</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p className='mission-statement'>
            GAME CHANGER is for basketball programs that want to change how they keep track of
            their stats. Having to take the time to look through each players stats page by page is a thing of the past.
          </p>
          <br />
          <p className='mission-statement'>
            We strive to have stats easily accessible for both players and coaches. Doesn't matter if it is to show off, compare yourself to others
            or as a coach have your teams stats on the ready at all times!
          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
