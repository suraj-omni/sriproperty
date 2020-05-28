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
  const adverttypealt = adverttype === "sell" ? "Sale" : "Rent";
  const isLand = category === "Land" ? true : false;
  const isHouse = category === "House" ? true : false;
  const isApartment = category === "Apartment" ? true : false;
  const isHolidayShortRental =
    category === "Holiday and Short Rental" ? true : false;
  const isRoomorAnnexe = category === "Room or Annex" ? true : false;
  const isCommercialProperty =
    category === "Commercial Property" ? true : false;

  return (
    <Card className="card-searchbox">
      <Card.Header className="card-header-searchbox">
        <ListGroupItem
          disabled
          className="ad-view-main-type-font sreachresultbox_item1 py-1 px-2"
        >
          <div className="d-flex ad-view-main-type-font">
            <div className="flex-fill text-left mx-auto">
              <span>{`For ${adverttypealt} by ${name}`}</span>
            </div>

            <div className="flex-fill text-right">
              <span>{`${lastmodifiedAt.from(curtime)}`}</span>
            </div>
          </div>
        </ListGroupItem>
        <Link to={`/ad/${advertId}`}>
          <Card.Img
            variant="top"
            src={
              image1Url != ""
                ? image1Url
                : "https://firebasestorage.googleapis.com/v0/b/sriproperty-8d3b1.appspot.com/o/no-image-icon.png?alt=media"
            }
            className="card-image img-fluid"
          />
        </Link>
        <ListGroup>
          {(isRoomorAnnexe ||
            isHolidayShortRental ||
            isHouse ||
            isApartment) && (
            <React.Fragment>
              <ListGroupItem className="sreachresultbox_item1 py-1 px-3">
                <div className="d-flex ad-view-main-type-font">
                  <div className="flex-fill text-left mx-auto">{category}</div>
                  <div className="flex-fill text-right">
                    <FontAwesomeIcon
                      style={{ color: "#588b8b" }}
                      icon={faBed}
                      size="1.5x"
                    />
                    <span>{` ${beds}`}</span>
                  </div>

                  <div className="flex-fill text-right">
                    <FontAwesomeIcon
                      style={{ color: "#588b8b" }}
                      icon={faBath}
                      size="1.5x"
                    />
                    <span>{` ${baths}`}</span>
                  </div>
                </div>
              </ListGroupItem>
            </React.Fragment>
          )}
          {isLand && (
            <React.Fragment>
              <ListGroupItem className="sreachresultbox_item1 py-1 px-3">
                <div className="d-flex ad-view-main-type-font">
                  <div className="flex-fill text-left">{category}</div>
                  <div className="flex-fill text-center">
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
              <ListGroupItem className="sreachresultbox_item1 py-1 px-3">
                <div className="d-flex ad-view-main-type-font">
                  <div className="flex-fill text-left">{category}</div>
                  <div className="flex-fill text-center">
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
      </Card.Header>
      <Card.Body className="p-0">
        <Card.Title className="text-center align-middle pt-2 mx-auto">
          <h6>
            <Link className="card-a" to={`/ad/${advertId}`}>{`${title}`}</Link>
          </h6>
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroupItem
            disabled
            className="searchbox-list-item searchbox-location-item p-1"
          >
            <FontAwesomeIcon
              style={{ color: "#588b8b" }}
              icon={faMapMarkerAlt}
              size="1.5x"
            />
            {`  ${district}, ${city}`}
          </ListGroupItem>
          <ListGroupItem disabled className="searchbox-list-item p-1">
            <div className="m-auto ad-view-box-price-font">
              {" "}
              {`Rs. ${rentaloprice} - ${rentalopriceunit}`}
              <span className="ad-view-main-price_nego-font">{`  ${negotiable}`}</span>
            </div>
          </ListGroupItem>
        </ListGroup>
        <Card.Text className="ad-view-box-desc-font p-2  card-desc">
          {`${description.substring(0, 150)}  `}
          <Link to={`/ad/${advertId}`}>(view more...)</Link>
        </Card.Text>
      </Card.Body>
      {/*   <Card.Footer className="p-1 card-footer-searchbox">
        <ListGroupItem
          disabled
          className="ad-view-main-type-font sreachresultbox_item1 p-1"
        >
          <div className="d-flex ad-view-main-type-font">
            <div className="flex-fill text-left mx-auto">
              <span>{`For ${adverttypealt} by ${name}`}</span>
            </div>

            <div className="flex-fill text-right">
              <span>{`${lastmodifiedAt.from(curtime)}`}</span>
            </div>
          </div>
        </ListGroupItem>
      </Card.Footer> */}
    </Card>
  );
};

export default SearchResultDisplayBox;
