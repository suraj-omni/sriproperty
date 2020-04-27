import React from "react";

const Loader = (props) => {
  return (
    <React.Fragment>
      <div className="mx-auto">
        {" "}
        <div className="mx-auto loader"></div>{" "}
        <div className="mx-auto loadder-text">Loading...</div>
      </div>
    </React.Fragment>
  );
};

export default Loader;
