import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-600">Alto Mayo</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Experiences
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Agency Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Experiences
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-block"
                onClick={() => setIsOpen(false)}
              >
                Agency Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;