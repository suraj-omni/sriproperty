import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { addAdvert } from "../redux/actions/adActions";
export class MyAdsTable extends Component {
  handleEdit = (event, advertid) => {
    console.log(advertid);
  };

  handleDelete = (advertid, index) => {
    const response = window.confirm("Do you really want to Delete the Advert?");
    if (response === true) {
      this.props.handleDelete(advertid, index);
    }
  };

  render() {
    const [adverts] = [...this.props.adverts];
    const count = this.props.count;
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
              <th>Online</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {adverts.map((advert, index) => (
              <tr>
                <td className="text-left align-middle">{advert.adverttype}</td>
                <td className="text-left align-middle">{advert.category}</td>
                <td className="text-left align-middle">
                  <Link to={`/ad/${advert.advertId}`}>{advert.title}</Link>
                </td>
                <td className="text-center align-middle">
                  {advert.online && (
                    <FontAwesomeIcon
                      style={{ color: "#99c24d" }}
                      icon={faToggleOn}
                      size="1.8x"
                      title="Ad is Online"
                    />
                  )}
                  {!advert.online && (
                    <FontAwesomeIcon
                      style={{ color: "#CE6C47" }}
                      icon={faToggleOff}
                      size="1.8x"
                      title="Ad is Offline"
                    />
                  )}
                </td>
                <td className="text-center align-middle">
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
                <td className="text-center align-middle">
                  <Button
                    className="btn-grid"
                    onClick={() => this.handleDelete(advert.advertId, index)}
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
