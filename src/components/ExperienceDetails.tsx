import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock, DollarSign, CalendarCheck } from 'lucide-react';
import ReservationModal from './ReservationModal';

const experiences = [
  {
    id: 1,
    title: "Alto Mayo Coffee Trail Adventure",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200"
    ],
    description: "Immerse yourself in the world of premium coffee production while exploring the stunning landscapes of Alto Mayo. Visit local coffee farms, learn about sustainable farming practices, and enjoy exclusive coffee tasting sessions.",
    minParticipants: 8,
    currentParticipants: 5,
    price: 129,
    duration: "2 days",
    location: "Rioja",
    startDate: "2024-04-15",
    itinerary: [
      {
        day: 1,
        activities: [
          "Pick-up from Tarapoto Airport",
          "Scenic drive to Rioja through the Alto Mayo valley",
          "Welcome lunch with local specialties",
          "Afternoon coffee farm visit and processing demonstration",
          "Evening: Traditional dinner and accommodation in eco-lodge"
        ]
      },
      {
        day: 2,
        activities: [
          "Morning coffee harvesting experience",
          "Traditional coffee roasting workshop",
          "Lunch with coffee farmers",
          "Cupping session and coffee evaluation",
          "Return transfer to Tarapoto"
        ]
      }
    ],
    includes: [
      "Airport transfers from/to Tarapoto",
      "All meals mentioned in itinerary",
      "Professional bilingual guide",
      "Accommodation in eco-lodge",
      "All activities and workshops",
      "Coffee tasting sessions"
    ]
  },
  {
    id: 2,
    title: "Tingana Wildlife Reserve Expedition",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200"
    ],
    description: "Explore the rich biodiversity of Tingana Reserve, home to unique species and pristine ecosystems. Navigate through waterways, spot exotic birds, and learn about conservation efforts in this protected area.",
    minParticipants: 6,
    currentParticipants: 4,
    price: 89,
    duration: "1 day",
    location: "Moyobamba",
    startDate: "2024-04-20",
    itinerary: [
      {
        day: 1,
        activities: [
          "Early morning pick-up from Moyobamba",
          "Boat journey through the reserve",
          "Guided wildlife spotting trek",
          "Traditional lunch in local community",
          "Afternoon conservation presentation",
          "Return to Moyobamba"
        ]
      }
    ],
    includes: [
      "Round-trip transportation from Moyobamba",
      "Professional naturalist guide",
      "Traditional lunch",
      "Boat rides",
      "Conservation contribution fee",
      "Water and snacks"
    ]
  }
];

function ExperienceDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReservationModal, setShowReservationModal] = useState(false);
  
  const experience = experiences.find(exp => exp.id === Number(id));
  
  if (!experience) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Experience not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative h-[60vh] overflow-hidden rounded-xl">
          <img
            src={experience.images[selectedImage]}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {experience.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              <img
                src={image}
                alt={`${experience.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{experience.title}</h1>
            <p className="text-gray-600">{experience.description}</p>
          </div>

          {/* Itinerary */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Itinerary</h2>
            <div className="space-y-6">
              {experience.itinerary.map((day) => (
                <div key={day.day} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Day {day.day}</h3>
                  <ul className="space-y-3">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <Clock className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Includes */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Included</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experience.includes.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CalendarCheck className="w-5 h-5 text-emerald-500 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${experience.price}</span>
                <span className="text-gray-600">per person</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{experience.startDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(experience.currentParticipants / experience.minParticipants) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">
                    {experience.currentParticipants} joined
                  </span>
                  <span className="text-sm text-gray-600">
                    {experience.minParticipants - experience.currentParticipants} spots to confirm
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowReservationModal(true)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Reserve Your Spot
              </button>

              <p className="text-sm text-gray-500 text-center">
                No payment required until minimum group size is reached
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        experience={experience}
      />
    </div>
  );
}

export default ExperienceDetails;