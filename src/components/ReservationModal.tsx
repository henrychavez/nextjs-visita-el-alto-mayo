import React, { useState } from 'react';
import { X, Users, Calendar, CheckCircle, Loader2 } from 'lucide-react';

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  experience: {
    title: string;
    startDate: string;
    minParticipants: number;
    currentParticipants: number;
    price: number;
  };
};

function ReservationModal({ isOpen, onClose, experience }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    participants: 1,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the reservation data to your backend
      console.log('Reservation submitted:', {
        ...formData,
        experienceTitle: experience.title,
        startDate: experience.startDate,
        totalPrice: formData.participants * experience.price
      });

      setStatus('success');
      
      // Close modal after showing success message
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', email: '', participants: 1 });
      }, 2000);

    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const totalPrice = formData.participants * experience.price;
  const spotsLeft = experience.minParticipants - experience.currentParticipants;

  if (status === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Reservation Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            We'll notify you when the minimum group size is reached to complete your payment.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Reserve Your Spot</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={status === 'submitting'}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 space-y-2">
            <h3 className="font-medium">{experience.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{experience.startDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{spotsLeft} spots left to confirm</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                disabled={status === 'submitting'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                disabled={status === 'submitting'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Participants
              </label>
              <input
                type="number"
                id="participants"
                min="1"
                max={spotsLeft}
                required
                disabled={status === 'submitting'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Price</span>
                <span className="text-xl font-semibold">${totalPrice}</span>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:bg-emerald-400 flex items-center justify-center"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Reservation'
                )}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                No payment required until minimum group size is reached
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;