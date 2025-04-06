import React, { useEffect, useState } from 'react'; // 🧠 Hooks to manage data
import axios from 'axios';                          // 📦 To fetch orders from backend

const MyOrders = () => {
  const [orders, setOrders] = useState([]);         // 📜 Stores user's past orders
  const [loading, setLoading] = useState(true);     // ⏳ Show loading spinner
  const [error, setError] = useState(null);         // ❌ For errors

  // 🚀 Fetch orders from the backend when the page loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // 🔐 User must be logged in

        const response = await axios.get('/api/orders/my', {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 Pass token to get user-specific orders
          },
        });

        setOrders(response.data);  // ✅ Save the orders
        setLoading(false);         // ⛔ Done loading
      } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
        setError('Something went wrong while loading your orders.');
        setLoading(false);
      }
    };

    fetchOrders(); // 🔁 Call the function
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📜 My Orders</h1>

      {/* ⏳ Show loading spinner */}
      {loading && <p className="text-center">Loading your orders...</p>}

      {/* ❌ Error message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 🗃️ No orders message */}
      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
      )}

      {/* ✅ Orders table */}
      {orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
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
                  <td className="p-2 border">{order.productName}</td>
                  <td className="p-2 border">£{order.productPrice.toFixed(2)}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}<br />
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

export default MyOrders;
