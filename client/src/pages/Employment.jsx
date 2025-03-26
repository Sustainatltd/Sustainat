import React, { useState, useEffect } from 'react';
import ApplyModal from '../components/ApplyModal'; // 💡 New: Import modal component

function Employment() {
  // 🧭 Controls which tab is active (jobseeker or employer)
  const [activeTab, setActiveTab] = useState('jobseeker');

  // 📄 State to hold the list of jobs from MongoDB
  const [jobs, setJobs] = useState([]);

  // 🌀 State to manage loading spinner while jobs are being fetched
  const [loading, setLoading] = useState(true);

  // ✍️ State to hold form values when posting a new job
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: ''
  });

  // 🔐 Logged-in HR email from localStorage
  const hrEmail = localStorage.getItem('hrEmail');

  // 🔎 Filters & Search State
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // 🧾 Jobs posted by this HR (for My Posted Jobs)
  const myJobs = jobs.filter((job) => job.createdBy === hrEmail);

  // 🪟 Modal control
  const [selectedJob, setSelectedJob] = useState(null); // job object when clicked
  const [isModalOpen, setIsModalOpen] = useState(false); // control modal visibility

  // 🔄 Fetch all jobs on load
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5001/api/jobs');
        const data = await res.json();
        setJobs(data.jobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 🧾 POST a new job
  const handlePostJob = async () => {
    if (newJob.title && newJob.company && newJob.location && newJob.type) {
      try {
        const res = await fetch('http://localhost:5001/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newJob, createdBy: hrEmail })
        });
        const data = await res.json();
        if (!res.ok) return alert('❌ ' + data.message);

        alert('✅ Job Posted!');
        setNewJob({ title: '', company: '', location: '', type: '' });
        setJobs([data.job, ...jobs]);
      } catch (err) {
        console.error('Post error:', err);
        alert('Something went wrong');
      }
    } else {
      alert('⚠️ Please fill all fields');
    }
  };

  // 🗑️ DELETE job
  const handleDeleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/jobs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) return alert('❌ ' + data.message);
      alert('🗑️ Job deleted');
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // 🔍 Filtered + searched jobs
  const filteredJobs = jobs
    .filter((job) => {
      const locationMatch = locationFilter === 'All' || job.location === locationFilter;
      const typeMatch = typeFilter === 'All' || job.type === typeFilter;
      const searchMatch = (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || (job.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      return locationMatch && typeMatch && searchMatch;
    })
    .sort((a, b) => sortOrder === 'newest' ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green' }}>🌍 Sustainat Employment Portal</h1>

      {/* 🔘 Tabs */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('jobseeker')} style={activeTab === 'jobseeker' ? activeBtn : inactiveBtn}>Job Seekers</button>
        <button onClick={() => setActiveTab('employer')} style={activeTab === 'employer' ? activeBtn : inactiveBtn}>HR & Organisations</button>
      </div>

      {/* 👀 JOB SEEKER */}
      {activeTab === 'jobseeker' && (
        <div>
          {loading && <p>⏳ Loading jobs, please wait...</p>}

          {!loading && <h3>📄 Job Listings ({filteredJobs.length} matched)</h3>}

          {!loading && (
            <>
              <input type="text" placeholder="🔍 Search title or company" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={inputStyle} />
              <label>📍 Location:</label>
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} style={inputStyle}>
                <option value="All">All</option>
                <option value="London">London</option>
                <option value="Remote">Remote</option>
              </select>
              <label>💼 Type:</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={inputStyle}>
                <option value="All">All</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>
              <label>📅 Sort:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={inputStyle}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </>
          )}

          {/* 🧾 Jobs List */}
          {!loading && filteredJobs.length === 0 && <p>No jobs found. Try different filters or search terms.</p>}

          {!loading && filteredJobs.map((job) => (
            <div key={job._id} style={jobCard}>
              <h4>{job.title}</h4>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleString()}</p>
              <button
                style={applyBtn}
                onClick={() => {
                  setSelectedJob(job); // store job info
                  setIsModalOpen(true); // open modal
                }}
              >Apply Now</button>
            </div>
          ))}
        </div>
      )}

      {/* 🧾 EMPLOYER View */}
      {activeTab === 'employer' && (
        hrEmail ? (
          <div>
            <h3>📝 Post a Job</h3>
            <input type="text" placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} style={inputStyle} />
            <input type="text" placeholder="Company Name" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} style={inputStyle} />
            <input type="text" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} style={inputStyle} />
            <input type="text" placeholder="Job Type" value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} style={inputStyle} />
            <button onClick={handlePostJob} style={submitBtn}>Post Job</button>

            <h3 style={{ marginTop: '40px' }}>📁 My Posted Jobs</h3>
            {myJobs.length === 0 && <p>No jobs posted yet.</p>}
            {myJobs.map((job) => (
              <div key={job._id} style={jobCard}>
                <h4>{job.title}</h4>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleString()}</p>
                <button onClick={() => handleDeleteJob(job._id)} style={deleteBtn}>🗑️ Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'red' }}>🔐 You must be logged in as HR to post a job.</p>
        )
      )}

      {/* 🪟 Application Form Modal */}
      <ApplyModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// 🎨 Styles
const inputStyle = { display: 'block', marginBottom: '10px', padding: '10px', width: '300px' };
const activeBtn = { padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' };
const inactiveBtn = { ...activeBtn, backgroundColor: '#eee', color: 'black' };
const jobCard = { backgroundColor: '#f0fff0', border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px' };
const applyBtn = { ...activeBtn, fontSize: '14px', padding: '5px 10px', display: 'inline-block' };
const submitBtn = { ...activeBtn, marginTop: '10px' };
const deleteBtn = { backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' };

export default Employment;
