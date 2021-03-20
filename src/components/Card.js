import React from "react";
import { RiGitRepositoryLine, RiStarLine } from "react-icons/ri";
import { AiOutlineFork } from "react-icons/ai";
import "../styles/components/card.css";

const Card = ({ name, description, stars, forks }) => {
  return (
    <div className="card">
      <h3>
        <RiGitRepositoryLine className="repoicon" />
        {name}
      </h3>
      <p>{description}</p>
      <p>
        <span>
          <RiStarLine />
          {stars}
        </span>{" "}
        <span>
          <AiOutlineFork />
          {forks}
        </span>
      </p>
    </div>
  );
};

export default Card;
