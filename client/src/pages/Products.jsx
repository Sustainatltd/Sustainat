import React from 'react';

// Individual Product Card component
function ProductCard({ title, price, originalPrice, rating, description, image, sale }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      width: '280px',
      margin: '10px',
      position: 'relative',
      boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Show SALE tag if available */}
      {sale && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'red',
          color: 'white',
          padding: '2px 8px',
          fontWeight: 'bold',
          fontSize: '12px',
          borderRadius: '5px'
        }}>
          Sale!
        </div>
      )}

      {/* Product Image */}
      <img src={image} alt={title} style={{ width: '100%', borderRadius: '8px' }} />

      {/* Product Title */}
      <h3 style={{ marginTop: '10px' }}>{title}</h3>

      {/* Prices */}
      <p>
        {originalPrice && <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>£{originalPrice}</span>}
        <strong>£{price}</strong>
      </p>

      {/* Star Rating (★ = 1 star) */}
      <p style={{ color: 'gold' }}>{'★'.repeat(rating)}</p>

      {/* Short description */}
      <p style={{ fontSize: '14px', color: '#444' }}>{description}</p>

      {/* Buttons */}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ backgroundColor: 'purple', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>Buy Now</button>
        <button style={{ backgroundColor: 'white', color: 'purple', padding: '5px 10px', border: '1px solid purple', borderRadius: '5px' }}>View</button>
      </div>
    </div>
  );
}

// Main Products Page
function Products() {
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>Sustainat Products to reduce CO₂</h1>

      {/* Products Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {/* Product 1: Business Card */}
        <ProductCard
          title="Sustainable Contactless Business Card"
          price="25.00"
          rating={5}
          description="We are committed to providing innovative solutions for sustainable business practices..."
          image="https://i.imgur.com/Q4V1lNH.jpeg"
        />

        {/* Product 2: Bamboo Tooth Brush (on sale) */}
        <ProductCard
          title="Sustainable Tooth Brush"
          price="2.50"
          originalPrice="3.00"
          rating={5}
          sale={true}
          description="Introducing Sustainat's Eco-Friendly Wooden Toothbrush - a sustainable dental care choice..."
          image="https://i.imgur.com/NwYOZ5W.jpeg"
        />
      </div>
    </div>
  );
}

export default Products;
