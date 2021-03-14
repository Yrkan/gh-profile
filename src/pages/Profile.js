import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

const Profile = () => {
  const { username } = useParams("username");
  const [err, setErr] = useState("");
  const history = useHistory();

  useEffect(() =>
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
      })
      .catch((err) => {
        setErr(err.message);
      })
  );
  return (
    <div>
      {err && <p>{err}</p>}
      <p>{username}</p>
    </div>
  );
};

export default Profile;
