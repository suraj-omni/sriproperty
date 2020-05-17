import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const SearchResultDisplayBox = ({ advert }) => {
  const {
    category,
    advertId,
    title,
    rentalopricenegotiable,
    district,
    city,
    beds,
    baths,
    rentaloprice,
    rentalopriceunit,
    adverttype,
    name,
    image1Url,
    description,
    landsize,
    landsizeunit,
    landtypes,
    propertytype,
    size,
    modifiedAt,
  } = advert;
  const lastmodifiedAt = moment(modifiedAt);
  var curtime = moment(new Date());

  const negotiable = rentalopricenegotiable ? "Negotiable" : "";
  const isLand = category === "Land" ? true : false;
  const isHouse = category === "House" ? true : false;
  const isApartment = category === "Apartment" ? true : false;
  const isHolidayShortRental =
    category === "Holiday and Short Rental" ? true : false;
  const isRoomorAnnexe = category === "Room or Annex" ? true : false;
  const isCommercialProperty =
    category === "Commercial Property" ? true : false;

  return (
    <Card className="card-width">
      <Card.Body>
        <Card.Title>
          <Link to={`/ad/${advertId}`}>{`${title}`}</Link>
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroupItem>
            <FontAwesomeIcon
              style={{ color: "#588b8b" }}
              icon={faMapMarkerAlt}
              size="1.5x"
            />{" "}
            {`  ${district}, ${city}`}
          </ListGroupItem>
          <ListGroupItem>
            <div className="m-auto ad-view-box-price-font">
              {" "}
              {`Rs.${rentaloprice} - ${rentalopriceunit}`}{" "}
              <span className="ad-view-main-price_nego-font">{`${negotiable}`}</span>
            </div>
          </ListGroupItem>

          <ListGroupItem className="ad-view-main-type-font">{`${category} for ${adverttype} by ${name} posted ${lastmodifiedAt.from(
            curtime
          )}`}</ListGroupItem>

          {(isRoomorAnnexe ||
            isHolidayShortRental ||
            isHouse ||
            isApartment) && (
            <React.Fragment>
              <ListGroupItem>
                <div className="d-flex ad-view-desc-font">
                  <div className="flex-fill text-left mx-auto">
                    <FontAwesomeIcon
                      style={{ color: "#588b8b" }}
                      icon={faBed}
                      size="2x"
                    />
                    <span>{`   ${beds}`}</span>
                  </div>

                  <div className="flex-fill text-right">
                    <FontAwesomeIcon
                      style={{ color: "#588b8b" }}
                      icon={faBath}
                      size="2x"
                    />
                    <span>{`   ${baths}`}</span>
                  </div>
                </div>
              </ListGroupItem>
            </React.Fragment>
          )}
          {isLand && (
            <React.Fragment>
              <ListGroupItem>
                <div className="d-flex ad-view-main-type-font">
                  <div className="flex-fill text-left mx-auto">
                    <span>{`${landsize} ${landsizeunit}`}</span>
                  </div>

                  <div className="flex-fill text-right">
                    <span>{`   ${landtypes.slice(0, -1)}`}</span>
                  </div>
                </div>
              </ListGroupItem>
            </React.Fragment>
          )}
          {isCommercialProperty && (
            <React.Fragment>
              <ListGroupItem>
                <div className="d-flex ad-view-main-type-font">
                  <div className="flex-fill text-left mx-auto">
                    <span>{`${size} sq.ft`}</span>
                  </div>

                  <div className="flex-fill text-right">
                    <span>{`   ${propertytype}`}</span>
                  </div>
                </div>
              </ListGroupItem>
            </React.Fragment>
          )}
        </ListGroup>
      </Card.Body>
      <Link to={`/ad/${advertId}`}>
        <Card.Img
          variant="top"
          src={
            image1Url != ""
              ? image1Url
              : "https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/no-image-icon.png?alt=media"
          }
          className=" mx-auto card-image img-fluid"
        />
      </Link>

      <Card.Body>
        <Card.Text className="text-center ad-view-box-desc-font card-desc">
          {`${description.substring(0, 150)}  `}
          <Link to={`/ad/${advertId}`}>(view more...)</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SearchResultDisplayBox;
