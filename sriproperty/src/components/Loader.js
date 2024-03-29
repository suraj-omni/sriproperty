import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Loader = (props) => {
  const { displaytext } = props;
  return (
    <React.Fragment>
      <Row className="mx-auto my-5">
        <Col>
          <div className="loader mx-auto my-1"></div>
          <div className="mx-auto my-1">
            {displaytext ? displaytext : "Loading ..."}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Loader;
