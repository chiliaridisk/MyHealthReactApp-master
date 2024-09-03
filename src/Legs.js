import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Arms.css";
import armsImage from "./images/legsimage.jpg";
import squatsImage from "./images/SQUATS.jpg";
import lungesImage from "./images/lunges.jpg";
import glutesImage from "./images/glutes.jpg"; // Εισάγετε την εικόνα εδώ
import PieChart from "./PieChart";

function Arms() {
  const [showPopup, setShowPopup] = useState(false);
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    calories: "",
    goal: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [showPushUpsDetails, setShowPushUpsDetails] = useState(false);
  const [showPlankDetails, setShowPlankDetails] = useState(false);
  const [showBodyweightDipsDetails, setShowBodyweightDipsDetails] = useState(false); // Νέα κατάσταση
  const [showHelpPopup, setShowHelpPopup] = useState(false); // Νέα κατάσταση
  const navigate = useNavigate();

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    const helpTimer = setTimeout(() => {
      setShowHelpPopup(true);
    }, 2000); // Εμφάνιση βοήθειας μετά από 2 δευτερόλεπτα

    const hideHelpTimer = setTimeout(() => {
      setShowHelpPopup(false);
    }, 5500); // Απόκρυψη βοήθειας μετά από 5 δευτερόλεπτα

    return () => {
      clearTimeout(helpTimer);
      clearTimeout(hideHelpTimer);
    };
  }, []);

  useEffect(() => {
    const { age, height, weight, calories, goal } = formData;
    setIsFormComplete(age && height && weight && calories && goal);
  }, [formData]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setChartData([
      { label: "RUN", value: Math.floor(Math.random() * 10) + 1 },
      { label: "PROTEIN", value: Math.floor(Math.random() * 100) + 10 },
      { label: "CREATINE", value: Math.floor(Math.random() * 10) + 1 },
    ]);
    setTimeout(() => {
      setShowResultsPopup(true);
    }, 1000); // Delay for showing the results popup
  };

  if (showResultsPopup) {
    return (
      <div className="background-only">
        <div className="results-container">
          <div className="results-left">
            <h1 className="results-title">Results</h1>
            <form className="results-form">
              <label htmlFor="age">Age:</label>
              <input type="text" id="age" value={formData.age} readOnly />

              <label htmlFor="height">Height (cm):</label>
              <input type="text" id="height" value={formData.height} readOnly />

              <label htmlFor="weight">Weight (kg):</label>
              <input type="text" id="weight" value={formData.weight} readOnly />

              <label htmlFor="calories">Calories:</label>
              <input
                type="text"
                id="calories"
                value={formData.calories}
                readOnly
              />

              <label htmlFor="goal">Goal:</label>
              <input type="text" id="goal" value={formData.goal} readOnly />
            </form>
          </div>
          <div className="results-right">
            <div className="goals-container">
              <h2 className="goals-title">Today's Goals</h2>
              <table className="goals-table">
                <tbody>
                  <tr>
                    <td>RUN:</td>
                    <td>
                      {chartData.find((item) => item.label === "RUN")?.value} km
                    </td>
                  </tr>
                  <tr>
                    <td>PROTEIN:</td>
                    <td>
                      {
                        chartData.find((item) => item.label === "PROTEIN")
                          ?.value
                      }{" "}
                      g
                    </td>
                  </tr>
                  <tr>
                    <td>CREATINE:</td>
                    <td>
                      {
                        chartData.find((item) => item.label === "CREATINE")
                          ?.value
                      }{" "}
                      g
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="chart-container">
                <PieChart data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="arms-container">
      <button className="back-button" onClick={handleBackClick}>
        ←
      </button>
      <div className="arms-left">
        <h1 className="arms-title">LEGS</h1>
        <div className="image-form-container">
          <img src={armsImage} alt="Arms" className="arms-image" />
          {showPopup && (
            <div className="popup-content">
              <h2 className="popup-title">Complete the Form</h2>
              <form id="userForm" onSubmit={handleSubmit}>
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  min="1"
                  max="99"
                  required
                  value={formData.age}
                  onChange={handleChange}
                />

                <label htmlFor="height">Height (cm):</label>
                <input
                  type="number"
                  id="height"
                  min="1"
                  required
                  value={formData.height}
                  onChange={handleChange}
                />

                <label htmlFor="weight">Weight (kg):</label>
                <input
                  type="number"
                  id="weight"
                  min="0"
                  required
                  value={formData.weight}
                  onChange={handleChange}
                />

                <label htmlFor="calories">Calories:</label>
                <input
                  type="number"
                  id="calories"
                  min="0"
                  required
                  value={formData.calories}
                  onChange={handleChange}
                />

                <label htmlFor="goal">Goal:</label>
                <select
                  id="goal"
                  required
                  value={formData.goal}
                  onChange={handleChange}
                >
                  <option value="">Select a goal</option>
                  <option value="volume">Volume</option>
                  <option value="definition">Definition</option>
                </select>

                <button type="submit" disabled={!isFormComplete}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="arms-right">
        <h2 className="exercises-title">3 BEST LEG'S EXERCISES</h2>
        <div className="exercise-container">
          <h3 className="exercise-name">SQUATS</h3>
          {showPushUpsDetails ? (
            <div className="exercise-details">
              <p>1. Stand straight with feet hip-width apart</p>
              <p>2. Engage your core muscles.</p>
              <p>3. Lower down, as if sitting in an invisible chair</p>
              <p>Set 3 x 20</p>
              <button onClick={() => setShowPushUpsDetails(false)} className="close-details-button">Close</button>
            </div>
          ) : (
            <img
              src={squatsImage}
              alt="Push Ups"
              className="exercise-image"
              onClick={() => setShowPushUpsDetails(true)}
            />
          )}
        </div>

        <div className="exercise-container">
          <h3 className="exercise-name">LUNGES</h3>
          {showPlankDetails ? (
            <div className="exercise-details">
              <p>Get into pushup position. ...</p>
              <p>Stand with your feet hip-width apart, keep your back straight, your shoulders back, and your abs tight..</p>
              <p>Take a step forward and slowly bend both knees, until your back knee is just above the floor.</p>
              <p>3 x 12 </p>
              <button onClick={() => setShowPlankDetails(false)} className="close-details-button">Close</button>
            </div>
          ) : (
            <img
              src={lungesImage}
              alt="Plank"
              className="exercise-image"
              onClick={() => setShowPlankDetails(true)}
            />
          )}
        </div>

        <div className="exercise-container">
          <h3 className="exercise-name">GLUTES</h3>
          {showBodyweightDipsDetails ? (
            <div className="exercise-details">
              <p>Lie flat on your back with your knees bent and feet flat on the floor, hip-width apart..</p>
              <p>Place your arms at your sides with your palms facing down.</p>
              <p>Full body tension.</p>
              <p>4 x 15</p>
              <button onClick={() => setShowBodyweightDipsDetails(false)} className="close-details-button">Close</button>
            </div>
          ) : (
            <img
              src={glutesImage}
              alt="Bodyweight Dips"
              className="exercise-image"
              onClick={() => setShowBodyweightDipsDetails(true)}
            />
          )}
        </div>
        {showHelpPopup && (
          <div className="help-popup">
            <p>Click on images</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Arms;