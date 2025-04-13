import React, { useState } from 'react'; // Importing React and useState for handling search state
import { useNavigate, Link } from 'react-router-dom'; // Importing Link for routing and useNavigate to navigate programmatically

function Home() {
  const navigate = useNavigate(); // useNavigate lets us programmatically navigate to other pages
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query entered by the user

  // Function to handle the search when the user clicks the search button
  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the form from reloading the page on submit
    if (searchQuery) {
      console.log("Searching for:", searchQuery); // Logging the search query
      navigate(`/search/${searchQuery}`); // Navigates to the search results page with the query
    }
  };

  return (
    <div className="font-sans">

      {/* 🌍 Hero Section */}
      <section className="bg-[#a6dba8] p-6 md:p-10 flex flex-col md:flex-row justify-between items-center w-full">
        {/* Left Side: Title and Search Bar */}
        <div className="text-white md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-2 leading-tight">Sustainat</h1>
          <p className="text-xl font-semibold mb-4">Sustaining to Set Sustainability</p>

          {/* 🔍 Search Bar */}
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="🔍 Search Sustainat..."
              className="mt-6 px-6 py-3 w-full md:w-1/2 rounded-lg border shadow-lg text-green-600" // Green text color for the search bar
              value={searchQuery} // Binds the input value to our state (searchQuery)
              onChange={(e) => setSearchQuery(e.target.value)} // Updates the searchQuery state as the user types
            />
            <button
              onClick={handleSearch} // When the button is clicked, it triggers the handleSearch function
              className="bg-green-600 text-white px-6 py-3 mt-6 md:ml-4 rounded-lg text-xl hover:bg-green-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Side: Rotating Earth Image */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="/images/earth.png" // Earth image for hero section
            alt="Rotating Earth"
            className="w-72 h-72 animate-spin-slow" // Applying slow rotation animation to the image
          />
        </div>
      </section>

      {/* 💡 What is Sustainat Section */}
      <section className="px-6 md:px-20 mt-12 max-w-full mx-auto text-left flex items-center">
        <img
          src="/images/SustainatText.png" // Image showing the logo text for Sustainat
          alt="Sustainat Text"
          className="w-64 h-64 mr-6"
        />
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-600 mb-6">What is Sustainat?</h2>
          <p className="text-gray-800 text-lg leading-relaxed text-justify mb-4">
            Sustainat is a sustainable development agency dedicated to creating a better future for all. We focus on building employment opportunities, promoting social sustainability, and raising awareness about the environment.
          </p>
        </div>
      </section>

      {/* 🛍 Sustainat Products Section */}
      <section className="px-6 md:px-20 mt-12 max-w-full mx-auto text-left flex flex-col md:flex-row items-center">
        <Link to="/products">
          <img
            src="/images/product-image.jpg" // Placeholder image for products
            alt="Sustainat Products"
            className="w-64 h-64 mb-6 md:mb-0 md:mr-6 cursor-pointer" // Adding a cursor pointer to make it clickable
          />
        </Link>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Sustainat Products</h2>
          <p className="text-gray-800 text-lg leading-relaxed text-justify mb-4">
            Sustainat's products focus on sustainability across economic, environmental, and social dimensions. By sourcing organic ingredients, we support sustainable agriculture and local communities.
          </p>
          <button
            onClick={() => navigate('/products')} // Navigating to products page when clicked
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition duration-300"
          >
            Explore Sustainable Products
          </button>
        </div>
      </section>

      {/* 📚 Sustainat Knowledge Section */}
      <section className="px-6 md:px-20 mt-12 max-w-full mx-auto text-left flex flex-col md:flex-row items-center">
        <Link to="/knowledge">
          <img
            src="/images/knowledge-image.jpg" // Placeholder image for knowledge
            alt="Sustainat Knowledge"
            className="w-64 h-64 mb-6 md:mb-0 md:mr-6 cursor-pointer"
          />
        </Link>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Sustainat Knowledge</h2>
          <p className="text-gray-800 text-lg leading-relaxed text-justify mb-4">
            Learn about sustainability practices and environmental conservation. We offer articles and guides to help you contribute to a sustainable future.
          </p>
          <button
            onClick={() => navigate('/knowledge')} // Navigating to knowledge page when clicked
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition duration-300"
          >
            Explore Knowledge
          </button>
        </div>
      </section>

      {/* 💼 Sustainat Employment Section */}
      <section className="px-6 md:px-20 mt-12 max-w-full mx-auto text-left flex flex-col md:flex-row items-center">
        <Link to="/employment">
          <img
            src="/images/employment-image.jpg" // Placeholder image for employment
            alt="Sustainat Employment"
            className="w-64 h-64 mb-6 md:mb-0 md:mr-6 cursor-pointer"
          />
        </Link>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Sustainat Employment</h2>
          <p className="text-gray-800 text-lg leading-relaxed text-justify mb-4">
            Sustainat connects job seekers with sustainability-focused employment opportunities. We work with a variety of organizations to help you find a job that makes a difference.
          </p>
          <div className="mb-4">
            <button
              onClick={() => navigate('/employment')} // Navigating to employment page when clicked
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition duration-300"
            >
              For Job Seekers
            </button>
            <button
              onClick={() => navigate('/employment')} // Navigating to employment page when clicked
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition duration-300 ml-4"
            >
              For HR & Organisations
            </button>
          </div>
        </div>
      </section>

      {/* 🌍 Sustainat Network Section */}
      <section className="px-6 md:px-20 mt-12 max-w-full mx-auto text-left flex flex-col md:flex-row items-center">
        <Link to="/network">
          <img
            src="/images/network-image.jpg" // Placeholder image for network
            alt="Sustainat Network"
            className="w-64 h-64 mb-6 md:mb-0 md:mr-6 cursor-pointer"
          />
        </Link>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Sustainat Network</h2>
          <p className="text-gray-800 text-lg leading-relaxed text-justify mb-4">
            Join the Sustainat Network and collaborate with like-minded individuals. Together, we can work towards a more sustainable world by sharing knowledge, ideas, and taking collective action.
          </p>
          <button
            onClick={() => navigate('/network')} // Navigating to network page when clicked
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition duration-300"
          >
            Join Sustainat Network
          </button>
        </div>
      </section>

      {/* 💰 Sustainat Accounting Section */}
      <section className="px-6 md:px-20 mt-12 max-w-full mx-auto text-left flex flex-col md:flex-row items-center">
        <Link to="/accounting">
          <img
            src="/images/accounting-image.jpg" // Placeholder image for accounting
            alt="Sustainat Accounting"
            className="w-64 h-64 mb-6 md:mb-0 md:mr-6 cursor-pointer"
          />
        </Link>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-600 mb-6">Sustainat Accounting</h2>
          <p className="text-gray-800 text-lg leading-relaxed text-justify mb-4">
            Our accounting section offers insights into managing finances sustainably. We provide tools and tips to help businesses integrate sustainable practices into their financial operations.
          </p>
          <button
            onClick={() => navigate('/accounting')} // Navigating to accounting page when clicked
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition duration-300"
          >
            Explore Accounting
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;
