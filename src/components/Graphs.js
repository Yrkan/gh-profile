import Chart from "chart.js";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "../styles/components/graphs.css";

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

  const countUnique = (arr) => {
    const counts = {};
    for (var i = 0; i < arr.length; i++) {
      counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
    return counts;
  };

  const languagesObj = countUnique(props.repos.map((e) => e.language));
  const languagesLst = Object.keys(languagesObj)
    .map((e, i) => [e, Object.values(languagesObj)[i]])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const data_stars = {
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

  const data_langs = {
    labels: languagesLst.map((e) => e[0]),
    datasets: [
      {
        label: "# of Votes",
        data: languagesLst.map((e) => e[1]),
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
    <div className="graphs">
      <div className="graph-wrapper">
        <Bar
          data={data_stars}
          width={150}
          height={300}
          options={{
            maintainAspectRatio: false,
            legend: { labels: { fontColor: "white" } },
          }}
        />
      </div>

      <div className="graph-wrapper">
        <Pie
          data={data_langs}
          width={300}
          height={300}
          options={{
            maintainAspectRatio: false,
            legend: { labels: { fontColor: "white" } },
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
