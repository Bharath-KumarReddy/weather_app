import React, { useState , useEffect} from "react";
import axios from "axios";
import { ReactTyped } from "react-typed";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
  
     setWeatherData(null);
 
  },[!location])


  const fetchWeather = async () => {
    if (!location) {
      toast.error("Please enter a location to search!");
      return;
    }

    setLoading(true);
    setWeatherData(null);

    try {
      if (!sessionStorage.getItem("token")) {
        toast.error("Please login to search!");
        navigate("/login");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/whether", {
        city: location,
        email: sessionStorage.getItem("email"),
      });

      if (response.data.error) {
        throw new Error(response.data.error.info);
      }

      setWeatherData(response.data);
      toast.success("Weather data fetched successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to fetch weather data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-800 to-black text-white flex flex-col items-center justify-start p-6">
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

     
      <div className="text-5xl mt-[10%] font-extrabold text-purple-300 mb-12 text-center drop-shadow-md">
        <ReactTyped
          strings={["Search Weather Instantly", "Enter a Location to Begin"]}
          typeSpeed={100}
          backSpeed={100}
          backDelay={1000}
          loop = {false}
        />
      </div>

     
      <div className="flex w-full max-w-md gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:ring-4 focus:ring-purple-500 transition-all duration-300 outline-none"
        />
        <button
          onClick={fetchWeather}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-purple-600 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
        >
          Search
        </button>
      </div>

      
      {loading && (
        <div className="text-lg font-semibold text-purple-400 mb-4 animate-pulse">
          Fetching weather data...
        </div>
      )}

      {weatherData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Location</h3>
            <p className="text-3xl font-extrabold text-white">
              {weatherData?.city}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
            <h3 className="text-2xl font-bold text-green-300 mb-4">Temperature</h3>
            <p className="text-5xl font-extrabold text-white">
              {weatherData.weather?.temperature}°C
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">Wind Speed</h3>
            <p className="text-3xl font-extrabold text-white">
              {weatherData.weather?.wind_speed} km/h
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Humidity</h3>
            <p className="text-3xl font-extrabold text-white">
              {weatherData.weather?.humidity}%
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">
              Weather Description
            </h3>
            <p className="text-xl italic text-white">
              {weatherData.weather?.weather_descriptions[0]}
            </p>
            <img
              src={weatherData.weather?.weather_icons[0]}
              alt="weather icon"
              className="mx-auto w-24 mt-4 transition-transform transform hover:scale-110"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
