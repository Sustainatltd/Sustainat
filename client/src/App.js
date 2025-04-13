import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing necessary components (Navbar, Footer, Pages)
import Navbar from './components/Navbar';  // The top navigation bar
import Footer from './components/Footer';  // Footer component to show at the bottom of the page

// Importing other pages and components
import Home from './pages/Home';  // Home page component
import Products from './pages/Products';  // Products page component
import ProductDetail from './pages/ProductDetail';  // Product detail page component
import Knowledge from './pages/Knowledge';  // Knowledge page component
import Employment from './pages/Employment';  // Employment page component
import Accounting from './pages/Accounting';  // Accounting page component
import Network from './pages/Network';  // Network page component
import Contact from './pages/Contact';  // Contact page component
import Login from './pages/Login';  // Login page component
import Register from './pages/Register';  // Register page component
import Applications from './pages/Applications';  // Applications page component
import MyOrders from './pages/MyOrders';  // My Orders page component
import AdminProducts from './pages/AdminProducts';  // Admin Products page component
import AdminUsers from './pages/AdminUsers';  // Admin Users page component

// Knowledge pages for specific topics
import ClimateChange from './pages/ClimateChange';  // Climate Change page
import SustainableTech from './pages/SustainableTech';  // Sustainable Tech page
import ZeroWaste from './pages/ZeroWaste';  // Zero Waste page

// Importing Privacy Policy and About pages
import PrivacyPolicy from './pages/PrivacyPolicy';  // Privacy Policy page component
import About from './pages/About';  // About page component

// Importing the ProtectedRoute component for protecting certain routes
import ProtectedRoute from './components/ProtectedRoute';  // Protects routes to ensure only logged-in users can access them
import SearchResults from './pages/SearchResults';  // Search Results page for showing search results

function App() {
  return (
    // The Router component manages routing between pages
    <Router>
      {/* Navbar - The top navigation bar that will be present on every page */}
      <Navbar />

      {/* Main content area, with some padding */}
      <div className="p-8 font-sans">
        {/* The Routes component defines all the paths to different pages */}
        <Routes>
          {/* Public Pages - These are pages that anyone can access, no need to log in */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Knowledge Pages */}
          <Route path="/climate-change" element={<ClimateChange />} />
          <Route path="/sustainable-tech" element={<SustainableTech />} />
          <Route path="/zero-waste" element={<ZeroWaste />} />

          {/* New Pages for Privacy Policy and About */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />  {/* Privacy Policy page */}
          <Route path="/about" element={<About />} />  {/* About page */}

          {/* Search Results Route */}
          <Route path="/search/:query" element={<SearchResults />} />

          {/* Protected Pages - These pages require the user to be logged in to access */}
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />  {/* Product detail page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/employment"
            element={
              <ProtectedRoute>
                <Employment />  {/* Employment page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />  {/* Applications page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/network"
            element={
              <ProtectedRoute>
                <Network />  {/* Network page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />  {/* My Orders page */}
              </ProtectedRoute>
            }
          />

          {/* Admin Pages - These pages are only accessible by admins */}
          <Route
            path="/admin-products"
            element={
              <ProtectedRoute>
                <AdminProducts />  {/* Admin product management page */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedRoute>
                <AdminUsers />  {/* Admin user management page */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer component to be displayed at the bottom of the page */}
      <Footer />
    </Router>
  );
}

export default App;
