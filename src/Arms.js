import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Arms.css";
import armsImage from "./images/gymman.jpg";
import pushUpsImage from "./images/push_ups.jpg";
import plankImage from "./images/plank.jpg";
import bodyweightDipsImage from "./images/bodyw.jpg"; // Εισάγετε την εικόνα εδώ
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
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
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
        <h1 className="arms-title">ARMS</h1>
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
        <h2 className="exercises-title">3 BEST ARM'S EXERCISES</h2>

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
              <p>Get into pushup position. ...</p>
              <p>Keep your palms and toes firmly planted on the ground, your back straight, and your core tight.</p>
              <p>Make sure your body is in a straight line while you're in plank position. ...</p>
              <p>Hold your plank for the predetermined time.</p>
              <p>3x 1,5 minutes</p>
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
          <h3 className="exercise-name">Bodyweight Dips</h3>
          {showBodyweightDipsDetails ? (
            <div className="exercise-details">
              <p>Scapula depressed at all times – Shoulders pressed down and away from your ears.</p>
              <p>Scapula retracted at all times – Proud chest position and shoulder blades pinched together.</p>
              <p>Elbows close to the body.</p>
              <p>Full body tension.</p>
              <p>3x 20</p>
              <button onClick={() => setShowBodyweightDipsDetails(false)} className="close-details-button">Close</button>
            </div>
          ) : (
            <img
              src={bodyweightDipsImage}
              alt="Bodyweight Dips"
              className="exercise-image"
              onClick={() => setShowBodyweightDipsDetails(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}



export default Arms; 