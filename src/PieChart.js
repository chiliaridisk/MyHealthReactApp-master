// src/PieChart.js

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ["#6699ff", "#3ef760", "#cc65fe"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 6,
      },
    ],
  };

  return <Pie data={chartData} className="pie-chart" />;
};

export default PieChart;
