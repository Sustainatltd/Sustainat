import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for routing

// The Footer component displays the bottom section of the webpage
const Footer = () => {
  const scrollToTop = () => {
    // Scrolls to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-800 text-white py-6">
      {/* Main container for footer content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo Section: Left aligned and vertically centered */}
        <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
          <Link to="/" className="flex items-center flex-col" onClick={scrollToTop}>
            <img src="/images/logo.png" alt="Sustainat Logo" className="h-16 mb-2" /> {/* Adjusted logo size */}
            <span className="text-xl">Sustainat Ltd</span> {/* Text below the logo */}
          </Link>
        </div>

        {/* Social Media Icons: Right aligned and vertically centered */}
        <div className="space-x-6 mb-4 md:mb-0 flex items-center justify-center md:justify-end w-full md:w-auto">
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/sustainat" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin hover:text-gray-400 text-3xl"></i>
          </a>
          {/* Twitter */}
          <a href="https://x.com/sustainat7" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter hover:text-gray-400 text-3xl"></i>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/sustainatltd" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook hover:text-gray-400 text-3xl"></i>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/sustainat7/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram hover:text-gray-400 text-3xl"></i>
          </a>
          {/* WhatsApp */}
          <a href="https://wa.me/447407177428" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp hover:text-gray-400 text-3xl"></i>
          </a>
        </div>
      </div>

      {/* Links Section: Horizontally centered */}
      <div className="container mx-auto text-center mb-4">
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-400" onClick={scrollToTop}>Home</Link>
          <Link to="/products" className="hover:text-gray-400">Products</Link>
          <Link to="/accounting" className="hover:text-gray-400">Accounting</Link>
          <Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>
      </div>

      {/* Address Section: Horizontally and vertically centered */}
      <div className="container mx-auto flex flex-col items-center justify-center mb-4">
        <p className="text-sm text-center">
          Located at: 340 Barking Road, London E13 8HL
          {/* Google Maps Link */}
          <a
            href="https://www.google.com/maps?q=340+Barking+Road,+London+E13+8HL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 ml-4"
          >
            View on Google Maps
          </a>
        </p>
      </div>

      {/* Copyright text at the bottom: Horizontally centered */}
      <p className="text-sm text-center">&copy; 2025 Sustainat Ltd. All Rights Reserved.</p>
    </footer>
  );
};

// Export Footer component
export default Footer;
