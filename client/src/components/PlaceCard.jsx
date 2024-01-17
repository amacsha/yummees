import React, { useEffect, useState } from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import AddPlaceButton from "./AddPlaceButton";

const BASEURL = import.meta.env.VITE_BASEURL;

function PlaceCard({ moodFilter }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    Axios.get(BASEURL) // COME BACK TO THIS
      .then((response) => {
        const filteredPlaces = moodFilter
          ? response.data.filter((place) => place.mood === moodFilter)
          : response.data;
        setPlaces(filteredPlaces);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [moodFilter]);

  return (
    // makes the placecards responsive
    <>
      <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4" id="placeCard">
        {places.map((place, idx) => (
          <Col key={place._id}>
            <Card className="custom-place-card">
              <Link to={`/PlaceDetail/${place._id}`}>
                <Card.Img variant="top" src={place.image} />
                <Card.Body>
                  <Card.Title className="cardTitle">{place.name}</Card.Title>
                  <Card.Text className="placeReview">{place.review}</Card.Text>
                  <Card.Text>{place.mood}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default PlaceCard;
