import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]); // 🧾 Store all orders
  const [loading, setLoading] = useState(true); // ⏳ Show loading
  const [error, setError] = useState(null); // ❌ Store error if something goes wrong

  const token = localStorage.getItem('token');     // 🔐 Get token from localStorage
  const isAdmin = localStorage.getItem('isAdmin'); // 🧑‍💼 Confirm admin access

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 Pass the admin’s token
          },
        });

        setOrders(res.data);  // ✅ Save orders to state
        setLoading(false);    // ✅ Done loading
      } catch (err) {
        console.error('❌ Failed to fetch all orders:', err);
        setError('Something went wrong while loading all user orders.');
        setLoading(false);
      }
    };

    if (isAdmin === 'true') {
      fetchOrders(); // 🔁 Only fetch if admin
    }
  }, [token, isAdmin]);

  // ❌ Show if user is not admin
  if (isAdmin !== 'true') {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        🚫 You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🧑‍💼 Admin - All Orders</h1>

      {/* ⏳ Loading Spinner */}
      {loading && <p className="text-center">Loading all orders...</p>}

      {/* ❌ Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 📦 All Orders Table */}
      {orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="p-2 border">👤 User Email</th>
                <th className="p-2 border">🧺 Product</th>
                <th className="p-2 border">💷 Price</th>
                <th className="p-2 border">📦 Address</th>
                <th className="p-2 border">📞 Phone</th>
                <th className="p-2 border">📅 Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="p-2 border">{order.userEmail}</td>
                  <td className="p-2 border">{order.productName}</td>
                  <td className="p-2 border">£{order.productPrice.toFixed(2)}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
