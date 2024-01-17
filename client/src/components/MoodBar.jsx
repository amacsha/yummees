import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function MoodBar({moodFilter, setMoodFilter}) {
  const location = useLocation();
  const hideComponent = location.pathname.startsWith("/PlaceDetail/") || location.pathname.startsWith("/login") || location.pathname.startsWith("/register") || location.pathname.startsWith("/explore");

  const [activeMood, setActiveMood] = useState("");
// handles the moosd filter buttons
  const handleClick = (buttonName) => {
    const newMood = moodFilter === buttonName ? "" : buttonName;
    setMoodFilter(newMood); 
    setActiveMood(newMood);
  };
// if the url is not /PlaceDetail, render mood bar
  return !hideComponent ? (
    <div className="moodBar">
      {["healthy", "cosy", "saucy", "naughty"].map((mood) => (
        <button
          key={mood}
          className={`moodStyle ${mood.toLowerCase()} ${activeMood === mood ? "active" : ""}`}
          onClick={() => handleClick(mood)}
        >
          {mood.toLowerCase()}
        </button>
      ))}
    </div>
  ) : null;
}

export default MoodBar;