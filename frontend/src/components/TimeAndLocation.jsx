import React, { useState, useEffect } from "react";

function TimeAndLocation({ weather }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const city = `${weather.location.name}, ${weather.location.country}`;

  // Check if the city is already in the favorites when the component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(city)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [city]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(fav => fav !== city);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(city);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-xl font-extralight">
          {weather.location.localtime}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{city}</p>
      </div>

      <div className="flex items-center justify-center my-3 cursor-pointer" onClick={toggleFavorite}>
        <span
          className={`text-white text-3xl cursor-pointer ${isFavorite ? "text-yellow-500" : "text-white"}`}

        >
          ★
        </span>
        <span className="text-white text-sm ml-2 mt-1">{isFavorite ? "Remove from favorite" : "Add to favorite"}</span>
      </div>
    </div>
  );
}

export default TimeAndLocation;
