import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chest.css";
import armsImage from "./images/gymman.jpg";
import pushUpsImage from "./images/push_ups.jpg";
import plankImage from "./images/plank.jpg";
import bodyweightDipsImage from "./images/bodyw.jpg"; // Εισάγετε την εικόνα εδώ
import PieChart from "./PieChart";

function Chest() {
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
        <h1 className="arms-title">CHEST</h1>
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
        <h2 className="exercises-title">3 BEST CHEST EXERCISES</h2>
        <div className="exercise-container">
          <h3 className="exercise-name">PUSH UPS</h3>
          {showPushUpsDetails ? (
            <div className="exercise-details">
              <p>1. Hands should be slightly outside shoulder-width apart at chest level.</p>
              <p>2. Feet should be hip-width apart and parallel to each other—not turned inward or outward.</p>
              <p>3. Hips should be in line with the shoulders, and the lower back should have a neutral curve—not completely flat, but not overly curved either. To assist with keeping proper lower back alignment, slim your waistline by trying to pull your belly button in and tightening your abdominal muscles.</p>
              <p>4. The head should be positioned so the ears are in line with the shoulders. They should not drop down toward the floor or looking up in front of the body.</p>
              <p>Set 4x20</p>
              <button onClick={() => setShowPushUpsDetails(false)} className="close-details-button">Close</button>
            </div>
          ) : (
            <img
              src={pushUpsImage}
              alt="Push Ups"
              className="exercise-image"
              onClick={() => setShowPushUpsDetails(true)}
            />
          )}
        </div>

        <div className="exercise-container">
          <h3 className="exercise-name">PLANK</h3>
          {showPlankDetails ? (
            <div className="exercise-details">
              <p>1. Lay flat on the floor, on your stomach.</p>
              <p>2. Lift yourself onto your forearms and toes, keeping your body in a straight line from head to heels.</p>
              <p>3. Tighten your core muscles, and hold this position for as long as possible.</p>
              <p>4. Breathe steadily throughout the exercise.</p>
              <p>Set 4x60sec</p>
              <button onClick={() => setShowPlankDetails(false)} className="close-details-button">Close</button>
            </div>
          ) : (
            <img
              src={plankImage}
              alt="Plank"
              className="exercise-image"
              onClick={() => setShowPlankDetails(true)}
            />
          )}
        </div>

        <div className="exercise-container">
          <h3 className="exercise-name">BODYWEIGHT DIPS</h3> {/* Νέα άσκηση */}
          {showBodyweightDipsDetails ? (
            <div className="exercise-details">
              <p>1. Position yourself at the edge of a bench or chair, with your hands gripping the edge beside your hips.</p>
              <p>2. Slide your hips off the bench, and lower your body by bending your elbows.</p>
              <p>3. Push back up to the starting position by straightening your arms.</p>
              <p>4. Keep your body close to the bench throughout the exercise.</p>
              <p>Set 4x15</p>
              <button
                onClick={() => setShowBodyweightDipsDetails(false)}
                className="close-details-button"
              >
                Close
              </button>
            </div>
          ) : (
            <img
              src={bodyweightDipsImage}
              alt="Bodyweight Dips"
              className="exercise-image"
              onClick={() => setShowBodyweightDipsDetails(true)} // Νέα συνάρτηση onClick
            />
          )}
        </div>
      </div>
      {showHelpPopup && (
        <div className="help-popup">
          <p>Click on images</p>
        </div>
      )}
    </div>
  );
}

export default Chest;
