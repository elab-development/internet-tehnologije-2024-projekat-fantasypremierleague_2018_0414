import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PlayerFormChart({ player }) {
  const gameweeks = ["GW1", "GW2", "GW3", "GW4", "GW5"];
  const points = [
    parseFloat(player.gw1_points),
    parseFloat(player.gw2_points),
    parseFloat(player.gw3_points),
    parseFloat(player.gw4_points),
    parseFloat(player.gw5_points),
  ];

  const data = {
    labels: gameweeks,
    datasets: [
      {
        label: "Points",
        data: points,
        borderColor: "rgba(99, 102, 241, 1)", // purple-500
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
      title: { display: false },
    },
    scales: {
      y: { ticks: { color: "white" }, beginAtZero: true },
      x: { ticks: { color: "white" } },
    },
  };

  return <Line data={data} options={options} />;
}
