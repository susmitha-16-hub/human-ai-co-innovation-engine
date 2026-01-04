import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function RiskCharts({ risks }) {
  const pieData = {
    labels: ["Technical", "Ethical", "Scalability"],
    datasets: [
      {
        data: [
          risks.technical,
          risks.ethical,
          risks.scalability,
        ],
        backgroundColor: ["#ff4d6d", "#4dabf7", "#ffd166"],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Technical", "Ethical", "Scalability"],
    datasets: [
      {
        label: "Risk Level",
        data: [
          risks.technical,
          risks.ethical,
          risks.scalability,
        ],
        backgroundColor: ["#ff4d6d", "#4dabf7", "#ffd166"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
      {/* PIE */}
      <div className="dashboard-card chart-box">
        <h4>📊 Risk Distribution</h4>
        <div className="chart-wrapper">
          <Pie data={pieData} />
        </div>
      </div>

      {/* BAR */}
      <div className="dashboard-card chart-box">
        <h4>📈 Risk Comparison</h4>
        <div className="chart-wrapper">
          <Bar data={barData} />
        </div>
      </div>
    </>
  );
}
