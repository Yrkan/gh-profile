import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Loading from "../components/Loading";
import UserInfo from "../components/UserInfo";

const Profile = () => {
  const { username } = useParams("username");
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
      })
      .catch((err) => {
        setErr(err.message);
      });

  useEffect(fechData, [history, username]);
  return (
    <div>
      {loading ? (
        <Loading err={err}></Loading>
      ) : (
        <div>
          {err && <p>{err}</p>}
          <UserInfo data={data} />
        </div>
      )}
    </div>
  );
};

export default Profile;
