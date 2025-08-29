// 🛍️ Products Page (cleaned)
// 👶 Kid comment: This page shows all products. We fetch them once when the page opens.
// We fixed the React warning by putting the fetch helper in a stable box (useCallback).

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  // 📦 State: list, loading, error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔐 Check if logged in (to show "My Orders" button)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 🌐 API base: read runtime config or fallback to /api
  // 👶 If we have a note in the window (config.js), use it; else use '/api'
  const API_BASE = (window.__ENV__ && window.__ENV__.API_BASE) || '/api';

  // 🧰 Stable fetch function (so React won’t warn)
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError('Something went wrong while fetching products.');
      setLoading(false);
    }
  }, [API_BASE]); // ✅ Only changes if API_BASE changes

  // 🚀 Run once on load (and whenever API_BASE changes)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // ✅ No ESLint warning now

  // 📦 Save selected product AND navigate with id in URL
  const viewProduct = (product) => {
    // 👖 Put product in our pocket so detail page can show instantly
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // 🧭 Also go to /product/:id so detail page can fetch by id if pocket is empty
    navigate(`/product/${product._id}`);
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

      {/* ⏳ Loading */}
      {loading && <p className="text-center">Loading products...</p>}

      {/* ❌ Error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* 🛍️ Product cards */}
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
