import React from 'react';
import globeImage from '../assets/globe.png'; // Make sure to add the image to src/assets

const Hero = () => {
  return (
    <section className="bg-green-100 py-12 px-4 text-center">
      {/* Globe image */}
      <div className="flex justify-center mb-6">
        <img
          src={globeImage}
          alt="Globe representing sustainability"
          className="w-32 md:w-48 rounded-full shadow-md"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Sustainat
      </h1>

      {/* Tagline */}
      <p className="text-lg md:text-xl text-green-800 font-semibold">
        Sustaining to Set Sustainability
      </p>
    </section>
  );
};

export default Hero;
