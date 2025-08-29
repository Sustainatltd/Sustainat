// 🛒 ProductDetail Page
// 👶 Kid comment: This page shows one product. First we look in our pocket (localStorage).
// If it’s empty, we ask the server using the product id from the URL.
// Then we let you fill delivery info, pay, and we save the order.

import React, { useEffect, useMemo, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios'; // 📦 Using axios directly (no custom api.js)
import { useParams, useLocation } from 'react-router-dom';

const ProductDetail = () => {
  // 📦 Product data
  const [product, setProduct] = useState(null);
  // 🧾 Delivery form data
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  // ✅ Form complete?
  const [formValid, setFormValid] = useState(false);
  // 🚨 Error to show user (if fetch fails)
  const [error, setError] = useState('');

  // 🌐 API base: try runtime config (/config.js), else fall back to '/api'
  // 👶 If the note exists (window.__ENV__), we read it. If not, we use '/api'.
  const API_BASE = (window.__ENV__ && window.__ENV__.API_BASE) || '/api';

  // 🧭 Support both URL shapes: /product/:id and /product?id=123
  const { id: paramId } = useParams();
  const { search } = useLocation();
  const queryId = useMemo(() => new URLSearchParams(search).get('id'), [search]);
  const productId = paramId || queryId || null;

  // 🧲 Load product (pocket → server)
  useEffect(() => {
    setError(''); // clear any old error

    // 1) 👖 Pocket first (localStorage)
    const stored = localStorage.getItem('selectedProduct');
    if (stored) {
      try {
        const p = JSON.parse(stored);

        // 🧩 If URL has an id and it matches the stored product’s id, use it
        if (!productId || p?._id === productId) {
          setProduct(p);
          return; // ✅ We’re done
        }
        // If stored product doesn't match requested id, we’ll fetch below
      } catch {
        // ignore parse error and continue to fetch
      }
    }

    // 2) 📡 Ask the server by id (only if we have an id)
    const fetchById = async () => {
      if (!productId) return; // no id to fetch
      try {
        const { data } = await axios.get(`${API_BASE}/products/${productId}`);
        // 🧰 Accept either {product:{...}} or a plain {...}
        const found = data?.product || data || null;
        if (!found) throw new Error('Empty product');
        setProduct(found);
      } catch (err) {
        console.error('❌ Failed to load product by id:', err);
        setError('Could not load this product. Please go back and try again.');
      }
    };

    fetchById();
  }, [API_BASE, productId]);

  // ✅ Validate form fields whenever they change
  useEffect(() => {
    const { name, address, phone } = form;
    setFormValid(Boolean(name.trim() && address.trim() && phone.trim()));
  }, [form]);

  // ✍️ Update form state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🧾 Save order after successful payment
  const saveOrder = async () => {
    try {
      const token = localStorage.getItem('token'); // 🔐 may be null (backend should handle if optional)
      await axios.post(
        `${API_BASE}/orders`,
        {
          name: form.name,
          address: form.address,
          phone: form.phone,
          productName: product?.name,
          productPrice: product?.price,
          productId: product?._id || productId || null,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      alert('🎉 Order placed and saved to database!');
    } catch (err) {
      console.error('❌ Failed to save order:', err);
      alert('Something went wrong while saving your order.');
    }
  };

  // ⏳ Loading / Error states
  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }
  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  // 🧮 Safe price formatting
  const priceValue = Number(product.price || 0);
  const priceLabel = isNaN(priceValue) ? '—' : `£${priceValue.toFixed(2)}`;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 🏷️ Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>

      {/* 🖼️ Product image (or placeholder) */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 grid place-items-center rounded mb-4">
          <span className="text-gray-400">No image</span>
        </div>
      )}

      {/* 📄 Description */}
      {product.description && (
        <p className="text-lg mb-2 text-gray-700">{product.description}</p>
      )}

      {/* 💰 Price */}
      <p className="text-xl font-bold text-green-700 mb-6">{priceLabel}</p>

      {/* 📬 Delivery form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Info</h2>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </form>
      </div>

      {/* 💳 PayPal button (only if form is complete) */}
      {formValid ? (
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center">Buy with PayPal</h2>
          <PayPalScriptProvider options={{ 'client-id': 'test', currency: 'GBP' }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: String(priceValue || '0') },
                      description: product.name,
                    },
                  ],
                })
              }
              onApprove={(data, actions) =>
                actions.order.capture().then(() => {
                  saveOrder();
                })
              }
              onError={(err) => {
                console.error('❌ PayPal error:', err);
                alert('Something went wrong during payment.');
              }}
            />
          </PayPalScriptProvider>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">
          💡 Please fill out your delivery info to continue.
        </p>
      )}
    </div>
  );
};

export default ProductDetail;
