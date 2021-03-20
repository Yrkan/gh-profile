import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import Graph from "../components/Graphs";
import Loading from "../components/Loading";
import Repos from "../components/Repos";
import UserInfo from "../components/UserInfo";

const Profile = () => {
  const history = useHistory();
  const { username } = useParams("username");
  const [err, setErr] = useState(""); // Errors Messages
  const [data, setData] = useState(null); // User Data
  const [loading, setLoading] = useState(true); // Tracks loading data for animation
  const [fetchStep, setFetchStep] = useState(0); // Used to force wating for fetch rate
  const [repos, setRepos] = useState([]); // array of user's repos
  const [canFetchRepos, setCanFetchRepos] = useState(false); // If API rate is enough to fetch repos
  const remainingRate = useRef(0); // Remaining rate

  useEffect(() => {
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
          remainingRate.current = data.rate.remaining;
          setFetchStep(1);
        });
    };
    fetchRate();
  }, []);

  useEffect(() => {
    if (fetchStep === 1) {
      const fetchData = () =>
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
            setData(data);
            setLoading(false);
            if (data.public_repos <= remainingRate.current * 100) {
              // able to fetch repos
              setCanFetchRepos(true);
              console.log("can fetch", username, remainingRate.current);
            }
          })
          .catch((err) => {
            setErr(err.message);
          });
      fetchData();
    } // eslint-disable-next-line
  }, [fetchStep]);

  useEffect(() => {
    const fetchRepos = () => {
      console.log("trg");
      if (canFetchRepos) {
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
    fetchRepos(); // eslint-disable-next-line
  }, [canFetchRepos]);
  return (
    <div>
      {loading ? (
        <Loading err={err}></Loading>
      ) : (
        <div>
          {err && <p>{err}</p>}
          <UserInfo data={data} />
          {canFetchRepos ? (
            <Fragment>
              <Graph repos={repos} />
              <Repos repos={repos} />
            </Fragment>
          ) : (
            <p className="error">Not enough API rate to fetch repositories</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
