import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface ConfirmationState {
  provider: {
    name: string;
    specialty: string;
  };
  time: string;
  userName: string;
}

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as ConfirmationState;

  if (!state) {
    return <div>Error: No data available for confirmation.</div>;
  }

  const { provider, time, userName } = state;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-800 text-center mb-8">Confirmation</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-slate-800">Your Consultation Details</h2>
          <div className="mt-6">
            <p className="text-lg text-slate-600">
              <strong>Provider:</strong> {provider.name} ({provider.specialty})
            </p>
            <p className="text-lg text-slate-600">
              <strong>Scheduled Time:</strong> {time}
            </p>
            <p className="text-lg text-slate-600">
              <strong>Your Name:</strong> {userName}
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-teal-600 text-white rounded-full w-full hover:bg-teal-700 transition-all"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
