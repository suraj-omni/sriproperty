import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";

import { getAllPosts, getNextPosts } from "../redux/actions/adActions";
import Container from "react-bootstrap/Container";
import SearchResultsGrid from "./SearchResultsGrid";

export class SearchAdvert extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pagesize: 10,
  };

  componentDidMount = () => {
    this.props.getAllPosts(this.state.pagesize);
  };

  loadMore = () => {
    this.props.getNextPosts(this.props.ad.after, this.state.pagesize);
  };

  render() {
    const { adverts: posts, more } = this.props.ad;
    const { loading } = this.props.UI;

    return (
      <React.Fragment>
        <SearchResultsGrid
          props={this.props}
          loadMore={this.loadMore}
        ></SearchResultsGrid>
        {/* <Container>
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{ background: "orange", listStyle: "none" }}
              >
                {post.id} {post.title}
              </li>
            ))}

            {loading && <li>Loading...</li>}

            {!loading && more && (
              <li
                id="buttonelement"
                style={{ background: "green", listStyle: "none" }}
              >
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={this.loadMore}
                >
                  Load more...
                </Button>
              </li>
            )}
          </ul>
        </Container> */}
      </React.Fragment>
    );
  }
}

SearchAdvert.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  getNextPosts: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  adverts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  ad: state.ad,
  adverts: state.ad.advert,
});

const mapActionsToProps = {
  getAllPosts,
  getNextPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchAdvert);
