// BalloonGame.js
import React, { useState } from 'react';
import './BalloonGame.css'; // Import the CSS file for styling
import balloonImage from './images.png'; // Import your balloon image

const BalloonGame = ({ onLogout }) => {
  const [balloonSize, setBalloonSize] = useState(0);

  const pushBalloon = () => {
    if (balloonSize < 10) {
      setBalloonSize(balloonSize + 1);
    } else {
      alert('Balloon popped!');
      onLogout();
      setBalloonSize(0);
    }
  };

  const popBalloon = () => {
    if (balloonSize > 0) {
      setBalloonSize(balloonSize - 1);
    }
  };

  return (
    <div className="container">
      <h1>Balloon poping Game</h1>
      <h3><i>Click the below bubble and see the magic</i></h3>
      <div className="tooltip" onClick={pushBalloon}>
        <div className="balloon" style={{ fontSize: `${1 + balloonSize}rem` }}>
          <img
            src={balloonImage}
            alt="Balloon"
            style={{
              width: `${20 + balloonSize * 10}px`,
              height: `${20 + balloonSize * 10}px`,
              border: '2px solid #ccc',
              borderRadius: '50%',
              padding: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </div>
        <span className="tooltiptext">Size: {balloonSize}</span>
      </div>
      <div className="tooltip" onClick={popBalloon}>
        <div className="balloon" style={{ fontSize: `${1 + balloonSize}rem` }}>
          <img
            src={balloonImage}
            alt="Balloon"
            style={{
              width: `${20 + balloonSize * 10}px`,
              height: `${20 + balloonSize * 10}px`,
              border: '2px solid #ccc',
              borderRadius: '50%',
              padding: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </div>
        <span className="tooltiptext">Size: {balloonSize}</span>
      </div>
    </div>
  );
};

export default BalloonGame;
