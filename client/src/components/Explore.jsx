import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

const MAPBOX_KEY = import.meta.env.VITE_MAPBOX_KEY;
const BASEURL = import.meta.env.VITE_BASEURL;
const MAP = import.meta.env.VITE_MAPBOX_MAP;
const Explore = () => {
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_KEY; // COME BACK TO THIS

    const map = new mapboxgl.Map({
      container: "map",
      style: MAP,
      center: [-0.1276, 51.5072],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Function to add markers to the map
    const addMarkers = (data) => {
      data.forEach((location) => {
        const [lat, lng] = location.location.split(", ").map(Number);
        // Check if coordinates are valid numbers
        if (!isNaN(lng) && !isNaN(lat)) {
          new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 50 }).setText(
                location.name // + "\n" + location.mood  come back to this
              )
            )
            .addTo(map);
        }
      });
    };

    // add markers
    axios
      .get(BASEURL)
      .then((response) => {
        addMarkers(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    return () => map.remove();
  }, []);

  return (
    <div
      className="exploreMap"
      id="map"
      style={{ height: "100vh", width: "100vw" }}
    ></div>
  );
};

export default Explore;
