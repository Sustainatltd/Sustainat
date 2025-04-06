import React, { useEffect, useState } from 'react'; // 🧠 React hooks
import axios from 'axios';                          // 📦 Makes HTTP requests
import { useNavigate } from 'react-router-dom';     // 🧭 Page navigation

const Products = () => {
  const [products, setProducts] = useState([]);     // 📦 Product list
  const [loading, setLoading] = useState(true);     // ⏳ Loading spinner
  const [error, setError] = useState(null);         // ❌ Error if fetch fails
  const navigate = useNavigate();                   // 🧭 Navigate pages

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 🔐 Check login

  // 🎯 Load products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      console.log('✅ Products fetched:', response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError('Something went wrong while fetching products.');
      setLoading(false);
    }
  };

  // 🚀 Run once when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // 📦 Save selected product and go to detail view
  const viewProduct = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/product');
  };

  // 📜 Go to "My Orders"
  const goToMyOrders = () => {
    navigate('/my-orders');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🌍 Sustainat Products</h1>

      {/* 🧾 Show "My Orders" only if logged in */}
      {isLoggedIn && (
        <div className="text-center mb-6">
          <button
            onClick={goToMyOrders}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            📜 View My Orders
          </button>
        </div>
      )}

      {/* ⏳ Show while loading */}
      {loading && <p className="text-center">Loading products...</p>}

      {/* ❌ Show error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* 🛍️ Show all product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading && products.length === 0 && (
          <p className="col-span-full text-center">No products available yet.</p>
        )}

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-700 font-bold mb-4">£{product.price}</p>
              <button
                onClick={() => viewProduct(product)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                View ➤
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
