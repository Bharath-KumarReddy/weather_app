import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllReport = () => {
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/report');
      setReport(response.data);
    } catch (err) {
      console.error('Error fetching report', err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900">
      {/* Centered Heading */}
      <div className="flex justify-center items-center mb-12">
        <h2 className="text-5xl font-extrabold text-orange-200 text-center mt-10">
          Weather Report
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 ">
        {report.map((entry, index) => (
          <div
            key={index}
            className="bg-gradient-to-tl from-pink-200 via-violet-800 to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:scale-105 w-full sm:w-96 md:w-80 lg:w-96 xl:w-80 mx-auto"
          >
            <div className="space-y-4 text-lg">
              <p className="text-gray-300">
                <strong>Name:</strong> <span style={{ color: "yellow" }}>{entry?.username}</span>
              </p>
              <p className="text-gray-300">
                <strong>City:</strong> {entry?.city}
              </p>
              <p className="text-gray-300">
                <strong>Temperature:</strong> {entry.weather?.temperature}°C
              </p>
              <p className="text-gray-300">
                <strong>Humidity:</strong> {entry.weather?.humidity}%
              </p>
              <p className="text-gray-300">
                <strong>Wind Speed:</strong> {entry.weather?.wind_speed} km/h
              </p>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReport;
