// ---------------------------------------------------
// 👥 AdminUsers.jsx — Manage Users (Admin Panel)
// ---------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // ✅ Smart Axios with correct base URL

const AdminUsers = () => {
  const [usersData, setUsersData] = useState([]);     // 📦 All user data
  const [searchTerm, setSearchTerm] = useState("");   // 🔍 Search input
  const [error, setError] = useState("");             // ❌ Error message

  // 🚀 Load users once on page mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------------------------------------------
  // 📥 Fetch all users (admin only)
  // ---------------------------------------------------
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("🚫 You must be logged in.");
      return;
    }

    try {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsersData(response.data); // ✅ Save to state
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
      setError("❌ Could not fetch users. Please ensure backend is running.");
    }
  };

  // ---------------------------------------------------
  // 🔁 Toggle Admin Role
  // ---------------------------------------------------
  const handleToggleAdmin = async (userId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `/api/users/${userId}/toggle-admin`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Admin toggled:", response.data);
      fetchUsers(); // 🔁 Refresh user list
    } catch (err) {
      console.error("❌ Toggle admin error:", err.response?.data || err.message);
      alert("❌ Failed to update admin status.");
    }
  };

  // ---------------------------------------------------
  // 🗑️ Delete a User
  // ---------------------------------------------------
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🗑️ User deleted:", response.data);
      fetchUsers(); // 🔁 Refresh after deletion
    } catch (err) {
      console.error("❌ Delete user error:", err.response?.data || err.message);
      alert("❌ Failed to delete user.");
    }
  };

  // ---------------------------------------------------
  // 🔍 Filter users by name or email
  // ---------------------------------------------------
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Admin - Manage Users</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      <input
        type="text"
        placeholder="🔍 Search users by name or email..."
        className="border p-2 mb-4 w-full rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border px-4 py-2">👤 Name</th>
            <th className="border px-4 py-2">📧 Email</th>
            <th className="border px-4 py-2">🛡️ Admin?</th>
            <th className="border px-4 py-2">⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="text-center hover:bg-gray-50">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.isAdmin ? "✅ Yes" : "❌ No"}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleToggleAdmin(user._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                >
                  {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
