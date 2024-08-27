// src/App.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import armsImage from "./images/arms_gym.jpg";
import legsImage from "./images/legs_men.jpg";
import chestImage from "./images/chestimage.jpg";
import backgroundImage from "./images/background_black.jpg";

function App() {
  const [showHelp, setShowHelp] = useState(false);

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        <h1 className="App-title">WELCOME TO OUR HEALTH MONITORING APP</h1>
        <div className="App-subtitle">Choose Your Category</div>
      </header>
      <div className="grid-container">
        <div className="grid-item">
          <h2>ARMS</h2>
          <img src={armsImage} alt="Arms Gym" className="item-image" />
          <Link to="/arms">
            <button className="item-button">Click</button>
          </Link>
        </div>
        <div className="grid-item">
          <h2>LEGS</h2>
          <img src={legsImage} alt="Legs Men" className="item-image" />
          <Link to="/legs">
            <button className="item-button">Click</button>
          </Link>
        </div>
        <div className="grid-item">
          <h2>CHEST</h2>
          <img src={chestImage} alt="Chest Gym" className="item-image" />
          <Link to="/chest">
            <button className="item-button">Click</button>
          </Link>
        </div>
      </div>
      <button className="help-button" onClick={handleHelpClick}>
        Help
      </button>
      {showHelp && (
        <div className="help-popup-overlay">
          <div className="help-popup-content">
            <h2 className="help-popup-title">
              Need help with our Health Monitoring App?
            </h2>
            <p className="help-popup-text">
              Choose the category you want to work out and fill in the form with
              your personal details. Once you submit the form, your data will be
              saved, and based on that, we will provide you with recommendations
              for your food intake today, as well as the mileage you need to run
              in combination with your workout for the best possible results.
            </p>
            <button className="help-popup-close" onClick={handleCloseHelp}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
