// ✅ Import React and helpers
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploader from '../components/ImageUploader'; // 📷 Import our new ImageUploader component

const AdminProducts = () => {
  const [products, setProducts] = useState([]); // 📦 Products list
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' }); // 📝 Form fields
  const [editId, setEditId] = useState(null); // ✏️ ID of product being edited
  const [loading, setLoading] = useState(true); // ⏳ Loading state
  const [error, setError] = useState(null); // ❌ Error state

  const token = localStorage.getItem('token'); // 🔑 Auth token
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // 🛡️ Admin check

  // 📡 Fetch products on mount if admin
  useEffect(() => {
    if (!isAdmin) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching products:', err.response?.data || err.message);
        setError('❌ Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAdmin]);

  // 🛑 Block access for non-admins
  if (!isAdmin) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        🚫 You are not authorized to access this page.
      </div>
    );
  }

  // ⌨️ Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📤 Handle form submit to add/edit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const productData = {
        ...form,
        price: parseFloat(form.price),
      };

      let res;
      if (editId) {
        res = await axios.patch(`/api/products/${editId}`, productData, config);
        setProducts(products.map((p) => (p._id === editId ? res.data : p)));
        setEditId(null);
      } else {
        res = await axios.post('/api/products', productData, config);
        setProducts([...products, res.data]);
      }

      setForm({ name: '', description: '', price: '', image: '' });
    } catch (err) {
      console.error('❌ Error saving product:', err.response?.data || err.message);
      alert(editId ? '❌ Failed to update product.' : '❌ Failed to add product.');
    }
  };

  // 🗑️ Delete a product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error('❌ Error deleting product:', err.response?.data || err.message);
      alert('❌ Failed to delete product.');
    }
  };

  // ✏️ Start editing a product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setEditId(product._id);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🛠️ Admin Product Manager</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <h2 className="text-xl font-semibold">
          {editId ? '✏️ Edit Product' : '➕ Add New Product'}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price (e.g. 9.99)"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* 📷 Image uploader that auto-fills the image field */}
        <ImageUploader onUpload={(url) => setForm({ ...form, image: url })} />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {editId ? 'Save Changes' : 'Add Product'}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: '', description: '', price: '', image: '' });
            }}
            className="ml-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold text-green-600 mb-2">£{product.price}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
