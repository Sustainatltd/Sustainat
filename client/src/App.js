// ✅ React Router DOM components for navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Reusable navigation bar
import Navbar from './components/Navbar';

// ✅ All main page components
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

// ✅ Topic pages under "Knowledge"
import ClimateChange from './pages/ClimateChange';
import SustainableTech from './pages/SustainableTech';
import ZeroWaste from './pages/ZeroWaste';

// 🔒 This helps protect pages so only logged-in users can see them
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // 🧭 Wrap the whole app inside the router to enable page navigation
    <Router>
      {/* 🌍 Always show the navbar at the top */}
      <Navbar />

      {/* 📦 This is where page content changes based on the URL */}
      <div className="p-8 font-sans">
        <Routes>

          {/* 🌐 Public Pages (everyone can see) */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 📚 Knowledge Subpages (extra topic pages) */}
          <Route path="/climate-change" element={<ClimateChange />} />
          <Route path="/sustainable-tech" element={<SustainableTech />} />
          <Route path="/zero-waste" element={<ZeroWaste />} />

          {/* 🔐 Protected Pages (must be logged in to see) */}
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
