import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
ChartJS.register(ArcElement);

export default function RiskPie({ risks }) {
  const score = r => r === "High" ? 3 : r === "Medium" ? 2 : 1;

  return (
    <Pie
      data={{
        labels: ["Technical", "Ethical", "Scalability"],
        datasets: [{
          data: [
            score(risks.technical),
            score(risks.ethical),
            score(risks.scalability)
          ],
          backgroundColor: ["#ff4d6d", "#4dd0ff", "#f7b731"]
        }]
      }}
      options={{ animation: { animateRotate: true, duration: 1500 } }}
    />
  );
}
