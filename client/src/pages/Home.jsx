import React from 'react';

// Home page layout with two columns: Job Seekers & HR
function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: 'green' }}>Sustainat Employment Platform</h1>
        <p style={{ fontSize: '18px', maxWidth: '700px', margin: '10px auto' }}>
          Sustainat connects job seekers with sustainability-focused opportunities, creating a positive impact on society and the environment.
        </p>
      </section>

      {/* Two-column layout */}
      <section style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

        {/* Job Seekers Section */}
        <div style={{ width: '300px', textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
            alt="Job Seekers"
            style={{ width: '100%', borderRadius: '10px' }}
          />
          <h3 style={{ marginTop: '15px' }}>Job Seekers</h3>
          <p>Join us to access a vast network of sustainability-based organizations.</p>
          <button
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            For Job Seekers
          </button>
        </div>

        {/* HR & Organisations Section */}
        <div style={{ width: '300px', textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="https://images.pexels.com/photos/1181405/pexels-photo-1181405.jpeg"
            alt="HR and Organizations"
            style={{ width: '100%', borderRadius: '10px' }}
          />
          <h3 style={{ marginTop: '15px' }}>HR & Organisations</h3>
          <p>Find talented candidates who match your company’s sustainability values.</p>
          <button
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            For HR & Organisations
          </button>
        </div>

      </section>

    </div>
  );
}

export default Home;
