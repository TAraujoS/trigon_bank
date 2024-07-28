"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Contas",
        data: [1234, 5678, 1234],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Conta 1", "Conta 2", "Conta 3"],
  };
  return (
    <Doughnut
      data={data}
      options={{ cutout: "60%", plugins: { legend: { display: false } } }}
    />
  );
};

export default DoughnutChart;
