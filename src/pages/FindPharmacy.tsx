import React, { useState } from "react";

const FindPharmacy: React.FC = () => {
  const [place, setPlace] = useState<string>(""); // User input
  const [pharmacies, setPharmacies] = useState<any[]>([]); // List of pharmacies to display
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error message

  const handleSearch = async () => {
    if (!place.trim()) return; // Prevent empty search
    setLoading(true);
    setError("");
    setPharmacies([]); // Reset results

    try {
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=Pharmacies+in+${place}&format=json&addressdetails=1&limit=5`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        setPharmacies(data); // Update state with API response
      } else {
        setError("No pharmacies found for this location.");
      }
    } catch (error) {
      setError("Failed to fetch pharmacies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Find Local Pharmacies</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Search for pharmacies in your area and get medicines delivered to your doorstep.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center items-center mb-8">
            <input
              type="text"
              placeholder="Enter city or location..."
              className="px-4 py-2 w-2/3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none text-lg"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="ml-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Display results */}
        {loading && <p className="text-center text-gray-600">Loading pharmacies...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pharmacies.length > 0 ? (
            pharmacies.map((pharmacy, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800">{pharmacy.display_name}</h3>
                <p className="text-gray-600">{pharmacy.type || "Pharmacy"}</p>
                <p className="text-gray-500 text-sm">
                  {pharmacy.address?.road ? `${pharmacy.address.road}, ` : ""}
                  {pharmacy.address?.neighbourhood ? `${pharmacy.address.neighbourhood}, ` : ""}
                  {pharmacy.address?.suburb ? `${pharmacy.address.suburb}, ` : ""}
                  {pharmacy.address?.city ? `${pharmacy.address.city}, ` : ""}
                  {pharmacy.address?.state ? `${pharmacy.address.state}, ` : ""}
                  {pharmacy.address?.country ? `${pharmacy.address.country}` : ""}
                </p>
              </div>
            ))
          ) : (
            !loading && !error && <p className="text-center text-gray-600">No pharmacies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPharmacy;
