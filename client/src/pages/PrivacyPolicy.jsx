import React from 'react';

// The PrivacyPolicy component displays the privacy policy of the website
const PrivacyPolicy = () => {
  return (
    // The 'div' element wraps all the content on the page
    // 'container mx-auto' centers the content horizontally and gives it padding
    // 'p-6' adds padding on all sides for spacing
    <div className="container mx-auto p-6">
      
      {/* This is the title of the page. 'text-3xl' makes the text big, and 'font-bold' makes it bold */}
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      {/* This paragraph contains the actual privacy policy content */}
      {/* 'text' classes are used to control how the text looks */}
      <p>
        This is the privacy policy for Sustainat Ltd. Here we explain how we handle user data...
        {/* You can add more detailed privacy policy text here. */}
        {/* Example: */}
        {/* We collect personal information such as your name, email, and location to improve our services... */}
      </p>
    </div>
  );
};

// We export this component so it can be used in other files (like App.js)
export default PrivacyPolicy;
