import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div className='about-me'>
        <p>Thank you everyone for listening to my presentation. Connect with me on Linkedin </p>
        <br />
        <p>Implementing next: Twillo, reset button for coaches to reset player stats</p>
        <br /> 
        <p>Tech used: PERN Stack (postgres, Express, React, Node)</p>
        <br />
        <p>Hardest Part: SQL</p>
        <br />
        <p>THANK YOU!</p>

      </div>
    </div>
  );
}

export default AboutPage;
