import Chart from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

const Graph = (props) => {
  Chart.defaults.global.defaultFontColor = "white";
  const mostStarredCount = props.repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map((e) => e.stargazers_count)
    .slice(0, 5);
  const mostStarredNames = props.repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map((e) => e.name)
    .slice(0, 5);

  const data = {
    labels: mostStarredNames,
    datasets: [
      {
        label: "# of Stars",
        data: mostStarredCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        width={150}
        height={300}
        options={{
          maintainAspectRatio: false,
          legend: { labels: { fontColor: "white" } },
        }}
      />
    </div>
  );
};

export default Graph;
