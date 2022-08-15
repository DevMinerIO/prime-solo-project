import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // added more local states for registering
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [teamNumber, setTeamNumber] = useState(0);
  // player/coach drop down will return a value of 1 for player and 2 for coach
  const [accessLevel, setAccessLevel] = useState(1);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    // should I take in a team_id?
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        // access_level: accessLevel
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className='register'>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      {/* created divs for team id and player or coach selector */}
      <div>
        <label htmlFor="first_name">First Name:
          <input type="text" name="first_name" value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last_name">Last Name:
          <input type="text" name="last_name" value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='teamid'>Your Team:</label>
        <select required id="teamid"
          onChange={(event) => setTeamNumber(event.target.value)}>
          {/* values 1-4 to be sent to the database */}
          <option value='1'>9th grade</option>
          <option value='2'>B-squad</option>
          <option value='3'>JV</option>
          <option value='4'>Varsity</option>
        </select>
      </div>
      {/* For now, don't give users the ability to say if they are a player or coach
      which would change their access level. SEE BELOW FOR SELECTION OPTIONS */}
      
      {/* <div> */}
        {/* <label htmlFor='access_level'>Are you a player or coach?</label>
        <select required id="access_level"
          onChange={(event) => setAccessLevel(event.target.value)}> */}
          {/* values 1-4 to be sent to the database */}
          {/* <option value='1'>Player</option>
          <option value='2'>Coach</option> */}
        {/* </select> */}
      {/* </div> */}
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
