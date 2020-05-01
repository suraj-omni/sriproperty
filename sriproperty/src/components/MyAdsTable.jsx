import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export class MyAdsTable extends Component {
  handleEdit = (event, advertid) => {
    console.log(advertid);
  };

  handleDelete = (advertid) => {
    console.log(advertid);
  };

  render() {
    const adverts = [...this.props.adverts];
    let count = 0;
    count = adverts.length ? adverts.length : 0;

    if (this.props.loading)
      return (
        <React.Fragment>
          <div className="mx-auto">
            {" "}
            <div className="mx-auto loader"></div>{" "}
            <div className="mx-auto loadder-text">Loading Data...</div>
          </div>
        </React.Fragment>
      );

    if (count === 0) return <div>There are no ads to Show</div>;
    return (
      <React.Fragment>
        <div>{`Showing Total of ${count} Ad's`}</div>
        <Table responsive size="sm" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Type</th>
              <th>Category</th>
              <th>Title</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {adverts.map((advert) => (
              <tr>
                <td className="text-left">{advert.adverttype}</td>
                <td className="text-left">{advert.category}</td>
                <td className="text-left">
                  <Link to={`/ad/${advert.advertId}`}>{advert.title}</Link>
                </td>
                <td className="text-center">
                  <Link to={`/editad/details/${advert.advertId}`}>
                    {" "}
                    <FontAwesomeIcon
                      style={{ color: "#1c110a" }}
                      icon={faEdit}
                      size="1x"
                      title="click here to Edit the ad."
                    />
                  </Link>
                </td>
                <td className="text-center">
                  <Button
                    className="btn-grid"
                    onClick={() => this.handleDelete(advert.advertId)}
                  >
                    <FontAwesomeIcon
                      style={{ color: "#D81159" }}
                      icon={faTrash}
                      size="1x"
                      title="click here to delete the ad."
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default MyAdsTable;
