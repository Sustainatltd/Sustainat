import React, { useEffect, useState } from 'react';

function Applications() {
  // 🔐 Logged-in HR email from localStorage
  const hrEmail = localStorage.getItem('hrEmail');

  // 📦 All applications fetched from the backend
  const [applications, setApplications] = useState([]);

  // 🔍 User input for live search
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 Fetch applications on first load
  useEffect(() => {
    if (!hrEmail) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/applications/${hrEmail}`);
        const data = await res.json();
        setApplications(data.applications);
      } catch (err) {
        console.error('Error fetching applications:', err);
      }
    };

    fetchApplications();
  }, [hrEmail]);

  // 🗑️ Delete an application by ID
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this application?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5001/api/applications/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      alert(data.message);

      // ❌ Remove from UI
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  // 📥 Export all applications to CSV
  const exportToCSV = () => {
    if (applications.length === 0) return;

    const headers = ['Job Title', 'Applicant Name', 'Email', 'Message', 'Applied On'];
    const rows = applications.map(app => [
      app.jobId?.title || 'N/A',
      app.name,
      app.email,
      app.message,
      new Date(app.createdAt).toLocaleString()
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.click();
  };

  // 🔍 Filter applications based on search term
  const filteredApps = applications.filter(app =>
    (app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green' }}>📋 Applications Received</h1>

      {/* 🔒 If not HR, show warning */}
      {!hrEmail && (
        <p style={{ color: 'red' }}>🔐 You must be logged in as HR to view applications.</p>
      )}

      {hrEmail && (
        <>
          {/* 🔍 Search Field */}
          <input
            type="text"
            placeholder="Search by name, email, or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchBox}
          />

          {/* 📥 Export Button */}
          {filteredApps.length > 0 && (
            <button onClick={exportToCSV} style={exportBtn}>
              📥 Export to CSV
            </button>
          )}

          {/* 🗂️ Application List */}
          {filteredApps.length === 0 ? (
            <p>No matching applications found.</p>
          ) : (
            filteredApps.map((app, index) => (
              <div key={index} style={appCard}>
                <h3>{app.jobId?.title || 'Unknown Job'}</h3>
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Message:</strong> {app.message}</p>
                <p><strong>Date:</strong> {new Date(app.createdAt).toLocaleString()}</p>
                <button onClick={() => handleDelete(app._id)} style={deleteBtn}>
                  🗑️ Delete
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

// 🎨 Styles
const appCard = {
  backgroundColor: '#f0fff0',
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '15px',
  marginBottom: '15px'
};

const deleteBtn = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const exportBtn = {
  backgroundColor: '#008cba',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '20px',
  marginLeft: '10px'
};

const searchBox = {
  padding: '10px',
  width: '300px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

export default Applications;
