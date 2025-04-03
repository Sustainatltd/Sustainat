// ✅ React Router DOM components for navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Reusable navigation bar
import Navbar from './components/Navbar';

// ✅ All application pages
import Home from './pages/Home';
import Products from './pages/Products';
import Knowledge from './pages/Knowledge';
import Employment from './pages/Employment';
import Accounting from './pages/Accounting';
import Network from './pages/Network';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Applications from './pages/Applications';

// 🔒 Protect routes from unauthorized access
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* 🌍 Global navigation bar - always visible */}
      <Navbar />

      {/* 📦 Page content area with Tailwind styling */}
      <div className="p-8 font-sans">
        <Routes>
          {/* 🌐 Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Pages - Only if logged in */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
