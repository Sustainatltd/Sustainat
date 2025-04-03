// 🌱 Import React so we can build this component
import React from 'react';

// 🏠 This is your home page layout
function Home() {
  return (
    // 🌿 Main wrapper for the whole page
    <div className="font-sans">

      {/* 🌍 Top hero section with green background and two columns */}
      <section className="bg-[#a6dba8] p-10 rounded-md flex flex-col md:flex-row justify-between items-center">
        {/* 📝 Left column: title and subtitle */}
        <div className="text-white md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">Sustainat</h1>
          <p className="text-xl font-semibold">
            Sustaining to Set Sustainability
          </p>
        </div>

        {/* 🖼️ Right column: Earth image from your public/images folder */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="/images/earth.png" // ✅ This uses your uploaded earth image
            alt="Earth"
            className="w-64 h-auto" // ✂️ Removed black border and rounded it a bit
          />
        </div>
      </section>

      {/* 💡 Section that explains what Sustainat is */}
      <section className="px-6 md:px-20 mt-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          What is Sustainat?
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          Sustainat is a sustainable development agency that is dedicated to creating a better future for all.
          We believe that true sustainability must consider not just the environment, but also the economy and society as a whole.
          With this in mind, we have set out to create employment opportunities that promote economic sustainability,
          build communities that are socially sustainable, and raise awareness about the environment to achieve environmental sustainability.
        </p>
      </section>
    </div>
  );
}

// 🧠 Exporting this so it can be shown in the app
export default Home;
