import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavB from "./components/NavB";
import MoodBar from "./components/MoodBar";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Login from "./components/Login";
import PlaceCard from "./components/PlaceCard";
import AddPlaceButton from "./components/AddPlaceButton";
import Explore from "./components/Explore";
import PlaceDetail from "./components/PlaceDetail";
import Auth from "./components/Auth";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

import "./App.css";

const BASEURL = import.meta.env.VITE_BASEURL;

function App() {
  const initialState = Auth.isAuthenticated();

  const [places, setPlaces] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    Auth.isAuthenticated()
  );

  const [currentMoodFilter, setCurrentMoodFilter] = useState("");

  const fetchPlaces = () => {
    axios
      .get(BASEURL)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => console.error("Error fetching places:", error));
  };

  // Call fetchPlaces initially and whenever a new place is added
  useEffect(() => {
    fetchPlaces();
  }, []);

  // Function to handle new place addition
  const handlePlaceAdded = () => {
    fetchPlaces(); // Refresh the list of places
  };

  useEffect(() => {
    // This function is called whenever the page is loaded.
    const updateAuthState = () => {
      setIsAuthenticated(Auth.isAuthenticated());
    };

    // Add event listener for local storage changes
    window.addEventListener("storage", updateAuthState);

    // Clean up the event listener
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  return (
    <Router>
      <div className="Nav">
        <NavB />
        <MoodBar
          moodFilter={currentMoodFilter}
          setMoodFilter={setCurrentMoodFilter}
        />
      </div>

      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <>
                <div className="dashboard">
                  <PlaceCard
                    className="placeCard"
                    moodFilter={currentMoodFilter}
                  />
                  <AddPlaceButton onPlaceAdded={handlePlaceAdded} />
                </div>
              </>
            </ProtectedRoute>
          }
        />
        <Route path="/PlaceDetail/:id" element={<PlaceDetail />} />

        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
