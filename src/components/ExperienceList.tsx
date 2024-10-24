import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: "Alto Mayo Coffee Trail Adventure",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200",
    minParticipants: 8,
    currentParticipants: 5,
    price: 129,
    duration: "2 days",
    location: "Rioja",
    startDate: "2024-04-15"
  },
  {
    id: 2,
    title: "Tingana Wildlife Reserve Expedition",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200",
    minParticipants: 6,
    currentParticipants: 4,
    price: 89,
    duration: "1 day",
    location: "Moyobamba",
    startDate: "2024-04-20"
  }
];

function ExperienceList() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Alto Mayo</h1>
        <p className="text-lg text-gray-600">Join group adventures in Peru's hidden paradise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((exp) => (
          <Link 
            key={exp.id}
            to={`/experience/${exp.id}`}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={exp.image} 
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="text-white font-semibold">${exp.price} USD</span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{exp.currentParticipants}/{exp.minParticipants} participants</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(exp.currentParticipants / exp.minParticipants) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {exp.minParticipants - exp.currentParticipants} spots needed to confirm
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExperienceList;