import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import Graph from "../components/Graphs";
import Loading from "../components/Loading";
import UserInfo from "../components/UserInfo";

const Profile = () => {
  const { username } = useParams("username");
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const history = useHistory();
  let remaining_rate = useRef(0);
  let canFetchRepos = useRef(false);

  // We want to chhck the remaining rate to decide if we want to fetch repos details
  const fetchRate = () => {
    fetch("https://api.github.com/rate_limit")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error connecting to Github API");
        }
        return res.json();
      })
      .then((data) => {
        remaining_rate.current = data.rate.remaining;
        console.log(remaining_rate);
      });
  };

  const fechData = () =>
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            history.push("/404");
          }
          throw new Error("Error connecting to Github API");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
        if (data.public_repos <= remaining_rate.current * 100) {
          // able to fetch repos
          canFetchRepos.current = true;
        }
      })
      .catch((err) => {
        setErr(err.message);
      });

  const fetchRepos = () => {
    if (!loading && canFetchRepos) {
      for (let i = 1; i <= Math.ceil(data.public_repos / 100); i++) {
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&page=${i}`
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Error connecting to Github API");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setRepos((prevState) => [...prevState, ...data]);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  useEffect(fetchRate, []);
  useEffect(fechData, [history, username]);
  //eslint-disable-next-line
  useEffect(fetchRepos, [loading]);
  return (
    <div>
      {loading ? (
        <Loading err={err}></Loading>
      ) : (
        <div>
          {err && <p>{err}</p>}
          <UserInfo data={data} />
          <Graph repos={repos} />
        </div>
      )}
    </div>
  );
};

export default Profile;
