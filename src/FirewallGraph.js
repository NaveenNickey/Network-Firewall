import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const FirewallGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Blocked Attacks",
        data: [10, 20, 30, 25, 40, 60],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
      },
      {
        label: "Allowed Traffic",
        data: [80, 70, 90, 85, 95, 100],
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="graph-container">
      <h2>Firewall Activity</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default FirewallGraph;
