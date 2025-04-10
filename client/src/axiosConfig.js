// ---------------------------------------------------
// ✅ axiosConfig.js - Smart Axios Setup (Final)
// ---------------------------------------------------

import axios from "axios";

// ✅ Automatically figure out if running in production (nip.io) or dev (localhost)
let baseURL = "";

// 🌐 If using nip.io domain (like http://127.0.0.1.nip.io), use relative API calls
if (window.location.hostname.endsWith("nip.io")) {
  baseURL = ""; // ❗ relative, so axios uses current domain
} else {
  // 🧪 Dev mode (React runs on 3000, backend runs on 5001)
  baseURL = "http://localhost:5001";
}

// 🛠️ Create a smart Axios instance
const instance = axios.create({
  baseURL, // ✅ baseURL will be relative or localhost-based
});

export default instance;
