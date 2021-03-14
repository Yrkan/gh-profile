import React from "react";
import "../styles/components/loading.css";

const Loading = () => {
  return (
    <div class="loader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
