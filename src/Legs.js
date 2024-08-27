import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Legs.css";
import legsImage from "./images/legsimage.jpg";
import PieChart from "./PieChart";

function Legs() {
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
    <div className="legs-container">
      <button className="back-button" onClick={handleBackClick}>
        ←
      </button>
      <div className="legs-left">
        <h1 className="legs-title">LEGS</h1>
        <img src={legsImage} alt="Legs" className="legs-image" />
      </div>
      <div className="legs-right">
        {showPopup && (
          <div className="popup-overlay">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Legs;
