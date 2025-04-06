import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios'; // 📦 Used to send data to backend

const ProductDetail = () => {
  const [product, setProduct] = useState(null); // 📦 Product from localStorage
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
  }); // 🏠 Delivery info
  const [formValid, setFormValid] = useState(false); // ✅ Show PayPal only if filled

  // 🧲 Load product
  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  // ✅ Check if all fields are filled
  useEffect(() => {
    const { name, address, phone } = form;
    setFormValid(name.trim() && address.trim() && phone.trim());
  }, [form]);

  // 🧼 Track changes in the form
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 Function to send order to backend after payment
  const saveOrder = async () => {
    try {
      const token = localStorage.getItem('token'); // 🔐 Get JWT token from localStorage

      const response = await axios.post(
        '/api/orders',
        {
          name: form.name,
          address: form.address,
          phone: form.phone,
          productName: product.name,
          productPrice: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token to backend
          },
        }
      );

      console.log('✅ Order saved:', response.data);
      alert('🎉 Order placed and saved to database!');
    } catch (error) {
      console.error('❌ Failed to save order:', error);
      alert('Something went wrong while saving your order.');
    }
  };

  // 🖼️ If product not loaded
  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>

      {/* 🖼️ Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />

      {/* 📝 Product details */}
      <p className="text-lg mb-2 text-gray-700">{product.description}</p>
      <p className="text-xl font-bold text-green-700 mb-6">£{product.price}</p>

      {/* 📬 Delivery form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Info</h2>
        <form className="space-y-3">
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

      {/* 💳 Show PayPal only if form is complete */}
      {formValid ? (
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center">Buy with PayPal</h2>
          <PayPalScriptProvider
            options={{
              'client-id': 'test', // 🧪 PayPal Sandbox
              currency: 'GBP',
            }}
          >
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: product.price.toString(),
                      },
                      description: product.name,
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  console.log('✅ Payment complete:', details);
                  saveOrder(); // 📤 Save order to MongoDB after PayPal confirms
                });
              }}
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
