import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Insights from "./pages/Insights";
import HealthServices from "./pages/HealthServices";
import MentalHealthBot from "./components/MentalHealthBot.tsx";
import DataAdvocacy from "./pages/DataAdvocacy.tsx";
import ConsultationPage from "./pages/ConsultaionPage.tsx";
import ConfirmationPage from "./pages/ConfirmationPage.tsx";
import FindHospitals from "./pages/FindHospitals.tsx";
import FindPharmacy from "./pages/FindPharmacy.tsx";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/services" element={<HealthServices />} />
          <Route path="/pulseanalytics" element={<DataAdvocacy />} />
          <Route path="/FindHospitals" element={<FindHospitals />} />
        

          <Route path="/FindPharmacy" element={< FindPharmacy/>} />
          <Route path="/ConsultationPage" element={<ConsultationPage />} />
          <Route path="/ConfirmationPage" element={<ConfirmationPage />} />

          {/* <Route path="/telemedicine" element={<Telemedicine />} /> */}
        </Routes>
        <MentalHealthBot />
      </div>
    </BrowserRouter>
  );
};

export default App;
