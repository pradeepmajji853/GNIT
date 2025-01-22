import React, { useState } from "react";

const FindHospitals: React.FC = () => {
  const [place, setPlace] = useState<string>(""); // User input
  const [hospitals, setHospitals] = useState<any[]>([]); // Hospital list
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error message

  const handleSearch = async () => {
    if (!place) return; // Prevent empty search
    setLoading(true);
    setError("");

    try {
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=Hospitals+in+${place}&format=json&addressdetails=1&limit=5`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        setHospitals(data);
      } else {
        setError("No hospitals found for this location.");
      }
    } catch (error) {
      setError("Failed to fetch hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Find Hospitals</h1>
          <p className="text-lg text-gray-600">
            Search for hospitals in your area and get details instantly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Enter city or location..."
            className="px-4 py-2 w-2/3 border rounded-md"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Results */}
        {loading && <p>Loading hospitals...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid md:grid-cols-2 gap-8">
          {hospitals.length > 0 ? (
            hospitals.map((hospital, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">{hospital.display_name}</h3>
                <p className="text-gray-600">{hospital.type || "General Hospital"}</p>
                <p className="text-gray-500 text-sm">{hospital.address?.city || "Unknown Location"}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No hospitals found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindHospitals;
