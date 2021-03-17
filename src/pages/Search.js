import { useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import { VscGithubAlt } from "react-icons/vsc";

import "../styles/search.css";

const Search = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Checking rate limit
    fetch("https://api.github.com/rate_limit")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error connecting to Github API");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.rate.remaining);
        if (data.rate.remaining > 1) {
          // We need at least one other request for the profile.
          err && setErr(""); // Clear errors if there's any
          history.push(`/profile/${username}`); // redirect to profile page
        } else {
          // calculate how much time is left for API limit reset
          const now = moment();
          const reset_date = moment.unix(data.rate.reset);
          let reset_in = [reset_date.diff(now, "minutes"), "minute"];
          // change remaining time to seconds if it's 0 minute
          if (reset_in[0] === 0) {
            reset_in = [reset_date.diff(now, "seconds"), "second"];
          }
          // Plural for perfection
          if (reset_in[0] > 1) {
            reset_in[1] += "s";
          }

          setErr(
            `API Rate limit reached, please wait for ${reset_in[0]} ${reset_in[1]}`
          ); // Rate limit reached
        }
      })
      .catch((err) => {
        console.error(err);
        setErr(err.message);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <VscGithubAlt className="gitIcon" />
        <p className="searchP">
          Let's lookup {<span className="gradiantTxt">{username}</span>}
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="searchInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus={true}
          />
        </form>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  );
};

export default Search;
