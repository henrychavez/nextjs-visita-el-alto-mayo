import React, { useState } from 'react';
import { Calendar, Users, MapPin, DollarSign, Bell, Settings, LogOut } from 'lucide-react';

type Experience = {
  id: number;
  title: string;
  image: string;
  startDate: string;
  minParticipants: number;
  currentParticipants: number;
  price: number;
  duration: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed';
};

type Reservation = {
  id: number;
  experienceId: number;
  customerName: string;
  participants: number;
  status: 'reserved' | 'confirmed' | 'paid';
  date: string;
};

const mockExperiences: Experience[] = [
  {
    id: 1,
    title: "Alto Mayo Coffee Trail Adventure",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200",
    startDate: "2024-04-15",
    minParticipants: 8,
    currentParticipants: 5,
    price: 129,
    duration: "2 days",
    location: "Rioja",
    status: 'pending'
  },
  {
    id: 2,
    title: "Tingana Wildlife Reserve Expedition",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200",
    startDate: "2024-04-20",
    minParticipants: 6,
    currentParticipants: 4,
    price: 89,
    duration: "1 day",
    location: "Moyobamba",
    status: 'pending'
  }
];

const mockReservations: Reservation[] = [
  {
    id: 1,
    experienceId: 1,
    customerName: "John Smith",
    participants: 2,
    status: 'reserved',
    date: "2024-04-15"
  },
  {
    id: 2,
    experienceId: 1,
    customerName: "Maria Garcia",
    participants: 3,
    status: 'confirmed',
    date: "2024-04-15"
  },
  {
    id: 3,
    experienceId: 2,
    customerName: "David Wilson",
    participants: 2,
    status: 'paid',
    date: "2024-04-20"
  }
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'experiences' | 'reservations'>('experiences');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-emerald-600">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-emerald-600">
            <Settings className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-emerald-600">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">$2,847</p>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Experiences</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <Calendar className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold">32</p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Locations</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <MapPin className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`pb-4 text-sm font-medium ${
              activeTab === 'experiences'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Experiences
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`pb-4 text-sm font-medium ${
              activeTab === 'reservations'
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reservations
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'experiences' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockExperiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(experience.status)}`}>
                    {experience.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{experience.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{experience.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{experience.currentParticipants}/{experience.minParticipants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    Manage Experience →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {mockExperiences.find(exp => exp.id === reservation.experienceId)?.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.participants}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;