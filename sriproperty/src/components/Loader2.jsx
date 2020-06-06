import React from "react";

const Loader = (props) => {
  const { loadingtext } = props;
  const displaytext = loadingtext ? loadingtext : "Loading ...";
  return (
    <React.Fragment>
      <div className="mx-auto">
        <div className="mx-auto loader"></div>
        <div className="mx-auto loadder-text">{displaytext}</div>
      </div>
    </React.Fragment>
  );
};

export default Loader;
