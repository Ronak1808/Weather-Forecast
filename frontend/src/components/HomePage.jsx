import TopButtons from "./TopButtons";
import Inputs from "./Inputs";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureAndDetails from "./TemperatureAndDetails";
import Forecast from "./Forecast";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchForecast } from "../utils/FetchAPI";

function Homepage({ setIsFav, isFav }) {
  const [query, setQuery] = useState({ q: "kuchaman" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await fetchForecast(query.q).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.location.name}, ${data.location.country}.`
        );
        
        setWeather(data);
      }).catch((error)=>{
        toast.error(
          `Please enter a valid location.`
        );
      });
    };

    fetchWeather();
  }, [query, units]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [isFav]);

  const formatBackground = () => {
    return "from-cyan-700 to-blue-700";
  };

  const handleCityClick = (city) => {
    setQuery({ q: city});
    setIsFav(false);  // Close the sidebar after selecting a city
  };

  return (
    <div className={`max-w-screen h-[1100px] bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <div className={`max-w-screen-md h-fit py-5 mb-40 px-8 mx-auto bg-gradient-to-br ${formatBackground()}`}>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast title="daily forecast" weather={weather} />
          </div>
        )}

        <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
      </div>

      {isFav && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-lg z-50 transition-transform transform translate-x-0">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-xl mt-2">Favorites</h2>
            <button onClick={() => setIsFav(false)} className="text-3xl">
              &times;
            </button>
          </div>
          <ul className="p-4">
            {favorites.length > 0 ? (
              favorites.map((city, index) => (
                <li
                  key={index}
                  className="mt-6 cursor-pointer hover:bg-gray-700 p-2 rounded"
                  onClick={() => handleCityClick(city)}
                >
                  {city}
                </li>
              ))
            ) : (
              <li>No favorite cities added yet.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
