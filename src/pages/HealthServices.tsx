import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Stethoscope, 
  Building2, 
  Store, 
  Phone, 
  Calendar, 
  MapPin,
  Clock,
  Pill,
  Video,
  BarChart3
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  link: string;
  extraInfo: string;
}

const services: Service[] = [
  {
    icon: Video,
    title: "Free Doctor Consultations",
    description: "Connect with certified healthcare professionals for video consultations at no cost",
    action: "Book Consultation",
    link: "/ConsultationPage",
    extraInfo: "24/7 Available",
  },
  {
    icon: Building2,
    title: "Hospital Network",
    description: "Access our network of partner hospitals for specialized care and treatments",
    action: "Find Hospitals",
    link: "/FindHospitals",
    extraInfo: "500+ Hospitals",
  },
  {
    icon: Store,
    title: "Local Medical Stores",
    description: "Order medicines from verified local pharmacies with doorstep delivery",
    action: "Order Medicines",
    link: "/FindPharmacy",
    extraInfo: "Express Delivery",
  },
  {
    icon: Phone,
    title: "Telemedicine Services",
    description: "24/7 virtual healthcare support and follow-up consultations",
    action: "Start Session",
    link: "/telemedicine",
    extraInfo: "Round the Clock",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Advocacy for Change",
    description: "Neopulse isn’t just about individual health; it’s about systemic improvement.",
    action: "Learn More",
    link: "/advocacy",
    extraInfo: "Policy Collaboration",
  },
];

const Services: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Comprehensive Healthcare Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Access quality healthcare services through our integrated network of doctors, hospitals, and medical stores.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, _index) => (
            <motion.div key={service.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <service.icon className="w-8 h-8 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <button
                      className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
                      onClick={() => navigate(service.link)}
                    >
                      {service.action}
                    </button>
                    <span className="text-sm font-medium text-teal-600">{service.extraInfo}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
