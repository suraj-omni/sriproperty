import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { getAllPosts } from "../redux/actions/adActions";

function useOnScreen(options) {
  const ref = React.useRef();
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, visible];
}

function SearchAdvert(props) {
  const [ref, visible] = useOnScreen({ rootMargin: "-300px" });
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <h1>Scroll Down to next section </h1>
        <span role="img" aria-label="pointing-down">
          <FontAwesomeIcon
            style={{ color: "#6DB65B" }}
            icon={faCaretDown}
            size="2x"
            title="This is where you are now."
          />
        </span>
      </div>
      <div
        ref={ref}
        style={{
          height: "100vh",
          backgroundColor: visible ? "#23cebc" : "#efefef",
        }}
      >
        {visible ? (
          <div>
            <h1>I am on the screen</h1>
          </div>
        ) : (
          <div>Keep Scrolling</div>
        )}
      </div>
    </div>
  );
}

SearchAdvert.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  adverts: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  ad: state.ad,
  adverts: state.ad.adverts,
});

const mapActionsToProps = {
  getAllPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchAdvert);
