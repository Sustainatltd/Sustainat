import React from 'react';

// The About component displays information about the company
const About = () => {
  return (
    // This div wraps all the content on the About Us page
    // 'container mx-auto' centers the content horizontally and adds padding
    // 'p-6' adds padding on all sides to create some space around the content
    <div className="container mx-auto p-6">
      
      {/* This is the title of the page. 'text-3xl' makes the text big and 'font-bold' makes it bold */}
      <h1 className="text-3xl font-bold mb-4">About Us</h1>

      {/* This paragraph contains the content about your company */}
      {/* The content here can describe what your company does and its mission */}
      <p>
        Sustainat Ltd is committed to sustainability and environmental awareness. Our mission is to...
        {/* Add more information about your company's goals, values, and mission here */}
        {/* Example: */}
        {/* At Sustainat, we focus on reducing carbon footprints through green technologies, and we aim to promote sustainable living for all. */}
      </p>
    </div>
  );
};

// We export this component so it can be used in other files (like App.js)
export default About;
