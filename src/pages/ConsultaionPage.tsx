import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, User, Star } from 'lucide-react'; // Import relevant icons

const providers = [
  { id: 1, name: 'Dr. John Doe', specialty: 'General Practitioner', rating: 4.8, availability: ['10:00 AM', '12:00 PM', '3:00 PM'] },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrician', rating: 4.7, availability: ['9:00 AM', '2:00 PM', '4:30 PM'] },
  // Add more providers as needed
];

const ConsultationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const handleSubmit = () => {
    if (selectedProvider && selectedTime && userName) {
      // Navigate to /ConfirmationPage with the necessary state
      navigate('/ConfirmationPage', {
        state: {
          provider: providers.find((p) => p.id === selectedProvider),
          time: selectedTime,
          userName,
        },
      });
    } else {
      alert('Please fill in all the details.');
    }
  };
  
  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Book Your Free Consultation</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose a doctor, pick a time, and get ready for your video consultation.
          </p>
        </div>

        {/* Provider Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800">Select a Provider</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`bg-white rounded-lg p-6 shadow-md cursor-pointer transition-all hover:shadow-lg ${
                  selectedProvider === provider.id ? 'border-2 border-teal-600' : ''
                }`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <h3 className="text-xl font-semibold text-slate-800">{provider.name}</h3>
                <p className="text-sm text-slate-600">{provider.specialty}</p>
                <div className="flex items-center text-yellow-500 mt-2">
                  <Star className="w-4 h-4 mr-1" />
                  {provider.rating} / 5
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedProvider && (
          <div className="mt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800">Select a Time Slot</h2>
            <div className="grid grid-cols-2 gap-4">
              {providers
                .find((provider) => provider.id === selectedProvider)
                ?.availability.map((time, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all ${
                      selectedTime === time ? 'bg-teal-700' : ''
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* User Info Form */}
        <div className="mt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800">Your Details</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300"
          />
          <textarea
            placeholder="Additional Information (optional)"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300"
            rows={4}
          />
        </div>

        {/* Book Consultation Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-teal-600 text-white rounded-full w-full hover:bg-teal-700 transition-all"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
