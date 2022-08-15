import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>Absolutely I could have deleted this page but then you would not have been
        able to see my sweet hovering css effects. 
      </p>
      <p>Also thank you Kyle</p>
    </div>
  );
}

export default InfoPage;
