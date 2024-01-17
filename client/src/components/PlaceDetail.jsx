import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MAPBOX_KEY = import.meta.env.VITE_MAPBOX_KEY;
const MAP = import.meta.env.VITE_MAPBOX_MAP;
const BASEURL = import.meta.env.VITE_BASEURL;

function PlaceDetail() {
  const [place, setPlace] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_KEY; // COME BACK TO THIS

    // Create a new map
    const map = new mapboxgl.Map({
      container: "map",
      style: MAP,
      center: [-0.1276, 51.5072], // make dynamic
      zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Function to add a marker to the map
    const addMarker = (location) => {
      const [lat, lng] = location.location.split(", ").map(Number);
      if (!isNaN(lng) && !isNaN(lat)) {
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(location.name))
          .addTo(map);
      }
    };

    // Fetch data for place based on id
    axios
      .get(BASEURL + "/" + id) // COME BACK TO THIS
      .then((response) => {
        setPlace(response.data);
        addMarker(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    return () => map.remove();
  }, [id]);

  return (
    <>
      <div className="mainContainer">
        <div className="imageContainer">
          {place && (
            <Card className="detailCard">
              <Card.Img src={place.image} alt="Card image" />
            </Card>
          )}
        </div>
        <div className="lowerContainer">
          {place && (
            <div className="cardDetails">
              <Card.Title>{place.name}</Card.Title>
              <Card.Text>{place.mood}</Card.Text>
              <Card.Text>{place.review}</Card.Text>
            </div>
          )}
          <div
            id="map"
            className="detailMap"
            style={{ height: "750px", width: "100%" }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default PlaceDetail;
