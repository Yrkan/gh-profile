import React from "react";
import "../styles/components/loading.css";

const Loading = (props) => {
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {props.err && <div className="error">{props.err}</div>}
    </div>
  );
};

export default Loading;
