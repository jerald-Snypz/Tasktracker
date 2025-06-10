import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TaskProgressChart = ({ tasks }) => {
  const statusCategories = ["To-Do", "In Progress", "Done"];
  const statusCount = statusCategories.map(
    (status) => tasks.filter((task) => task.status === status).length
  );

  const data = {
    labels: statusCategories,
    datasets: [
      {
        label: "Task Progress",
        data: statusCount,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default TaskProgressChart;