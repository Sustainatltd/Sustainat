// ✅ React Router DOM for navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Reusable top navigation
import Navbar from './components/Navbar';

// ✅ Main page components
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; // 👈 Product detail view
import Knowledge from './pages/Knowledge';
import Employment from './pages/Employment';
import Accounting from './pages/Accounting';
import Network from './pages/Network';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Applications from './pages/Applications';
import MyOrders from './pages/MyOrders'; // ✅ View your orders
import AdminProducts from './pages/AdminProducts'; // 👑 Admin-only product manager
import AdminUsers from './pages/AdminUsers'; // ✅ NEW: View all users (admin panel)

// ✅ Knowledge topic pages
import ClimateChange from './pages/ClimateChange';
import SustainableTech from './pages/SustainableTech';
import ZeroWaste from './pages/ZeroWaste';

// 🔒 Only allow access if user is logged in
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // 🧭 Enable routing across the whole app
    <Router>
      {/* 🌍 Navbar shows on every page */}
      <Navbar />

      {/* 🧩 Page content area */}
      <div className="p-8 font-sans">
        <Routes>
          {/* 🌐 Public Pages (no login needed) */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 📚 Knowledge topic subpages */}
          <Route path="/climate-change" element={<ClimateChange />} />
          <Route path="/sustainable-tech" element={<SustainableTech />} />
          <Route path="/zero-waste" element={<ZeroWaste />} />

          {/* 🔒 Protected Pages (login required) */}
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employment"
            element={
              <ProtectedRoute>
                <Employment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/network"
            element={
              <ProtectedRoute>
                <Network />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* 👑 Admin Page: Manage Products */}
          <Route
            path="/admin-products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          {/* 👥 Admin Page: View All Users (NEW) */}
          <Route
            path="/admin-users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
