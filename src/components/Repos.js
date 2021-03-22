import { React, useState } from "react";
import "../styles/components/repos.css";
import Card from "./Card";

const Repos = ({ repos }) => {
  const [sortBy, setsortBy] = useState("stars");

  return (
    <div className="repos">
      <div className="sort">
        <h2>
          Top Repositories <span>By</span>
        </h2>
        <select
          value={sortBy}
          onChange={(e) => {
            setsortBy(e.target.value);
          }}
        >
          <option>stars</option>
          <option>forks</option>
        </select>
      </div>
      <div className="cards">
        {repos
          .sort((a, b) =>
            sortBy === "stars"
              ? b.stargazers_count - a.stargazers_count
              : b.forks - a.forks
          )
          .slice(0, 9)
          .map((r, i) => {
            return (
              <Card
                key={i}
                name={r.name}
                description={
                  r.description
                    ? r.description.length <= 75
                      ? r.description
                      : r.description.slice(75) + "..."
                    : ""
                }
                stars={r.stargazers_count}
                forks={r.forks}
                url={r.html_url}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Repos;
