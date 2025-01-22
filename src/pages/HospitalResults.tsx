import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HospitalResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const place = searchParams.get("place") || "Hyderabad"; // Default to Hyderabad if no place is provided

  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const apiUrl = `https://nominatim.openstreetmap.org/search?q=Hospitals+in+${place}&format=json`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          setHospitals(data);
        } else {
          throw new Error("Failed to fetch hospitals");
        }
      } catch (error) {
        setError("Failed to fetch hospitals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [place]);

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Hospitals in {place}</h1>

        {loading && <p>Loading hospitals...</p>}
        {error && <p>{error}</p>}

        <div className="grid md:grid-cols-2 gap-8">
          {hospitals.length > 0 ? (
            hospitals.map((hospital, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold text-slate-800">{hospital.display_name}</h3>
                <p className="text-slate-600">{hospital.class}</p>
                <p className="text-slate-600 text-sm">{hospital.address}</p>
              </div>
            ))
          ) : (
            <p>No hospitals found for this location.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalResults;
