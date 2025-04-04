// 🌱 React and routing
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Knowledge() {
  // ✅ Input states
  const [humanCO2, setHumanCO2] = useState(1043.26); // default
  const [treeCO2, setTreeCO2] = useState(68.5); // default
  const [daysOrPeople, setDaysOrPeople] = useState('');
  const [treesOrDays, setTreesOrDays] = useState('');

  // ✅ Output states
  const totalHumanCO2 = (humanCO2 * (parseFloat(daysOrPeople) || 0)).toFixed(2);
  const totalTreeCO2 = (treeCO2 * (parseFloat(treesOrDays) || 0)).toFixed(2);

  const treesNeeded = treeCO2 > 0 ? (humanCO2 / treeCO2).toFixed(2) : 0;

  // ✅ Calculate visual progress ratio (cap at 100%)
  const progressRatio = Math.min((totalTreeCO2 / totalHumanCO2) * 100, 100);

  return (
    <div className="p-6 font-sans bg-white min-h-screen">

      {/* 🌿 CALCULATOR SECTION */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        🪴 Sustainat Tree & Human Calculator ↓
      </h1>

      <div className="bg-green-50 p-6 rounded-lg shadow max-w-2xl mx-auto mb-10">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          How many plants/trees required to make a person sustainable
        </h2>

        {/* Inputs */}
        <div className="space-y-4 text-sm">
          <div>
            <label>CO₂ emissions of human being respiration per day in grams:</label>
            <div className="flex items-center">
              <input
                type="number"
                value={humanCO2}
                onChange={(e) => setHumanCO2(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <span className="ml-2 text-gray-500">g CO₂</span>
            </div>
          </div>

          <div>
            <label>CO₂ absorbed by a tree per day in grams:</label>
            <div className="flex items-center">
              <input
                type="number"
                value={treeCO2}
                onChange={(e) => setTreeCO2(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <span className="ml-2 text-gray-500">g CO₂</span>
            </div>
          </div>

          <div>
            <label>CO₂ emissions of human respiration by number of days or persons:</label>
            <input
              type="number"
              value={daysOrPeople}
              onChange={(e) => setDaysOrPeople(e.target.value)}
              placeholder="Number of days or persons"
              className="w-full px-3 py-2 border rounded italic"
            />
          </div>

          <div>
            <label>Calculated total CO₂ from human respiration:</label>
            <div className="flex items-center">
              <input
                value={totalHumanCO2}
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
              <span className="ml-2 text-gray-500">g CO₂</span>
            </div>
          </div>

          <div>
            <label>CO₂ absorbed by trees based on number of days or trees:</label>
            <input
              type="number"
              value={treesOrDays}
              onChange={(e) => setTreesOrDays(e.target.value)}
              placeholder="Number of trees or days"
              className="w-full px-3 py-2 border rounded italic"
            />
          </div>

          <div>
            <label>Calculated total CO₂ absorption by trees:</label>
            <div className="flex items-center">
              <input
                value={totalTreeCO2}
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
              <span className="ml-2 text-gray-500">g CO₂</span>
            </div>
          </div>

          {/* 🌿 Visual progress */}
          <div className="mt-4">
            <label>Visual Comparison:</label>
            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden mt-1">
              <div
                className="h-full bg-green-500"
                style={{ width: `${progressRatio}%` }}
              />
            </div>
            <p className="text-green-700 mt-1 text-sm">
              🌳 Trees absorbed <strong>{totalTreeCO2}g CO₂</strong> vs Human emitted <strong>{totalHumanCO2}g CO₂</strong>
            </p>
          </div>

          {/* 🌍 Result summary */}
          <div className="mt-4 text-sm">
            <p>👤 Human CO₂: <strong>{humanCO2}</strong> g</p>
            <p>🌲 Tree CO₂: <strong>{treeCO2}</strong> g</p>
            <p>🌳 You need approx. <strong>{treesNeeded}</strong> trees per person to be carbon neutral.</p>
          </div>
        </div>
      </div>

      {/* 🎥 VIDEO SECTION */}
      <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
        UN Global Goals for Sustainable Development
      </h2>
      <div className="max-w-3xl mx-auto mb-10">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/RpqVmvMCmp0"
          title="UN Global Goals"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow"
        />
      </div>

      {/* 🧠 TOPIC CARDS */}
      <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
        🔍 Explore Sustainability Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        <Link to="/climate-change" className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 block">
          <h3 className="text-lg font-semibold text-green-700 mb-2">🌍 Climate Change</h3>
          <p className="text-gray-700">Learn how rising temperatures and greenhouse gases affect our world.</p>
        </Link>
        <Link to="/sustainable-tech" className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 block">
          <h3 className="text-lg font-semibold text-green-700 mb-2">🔋 Sustainable Technology</h3>
          <p className="text-gray-700">Explore green innovations building a smarter, cleaner planet.</p>
        </Link>
        <Link to="/zero-waste" className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 block">
          <h3 className="text-lg font-semibold text-green-700 mb-2">🚯 Zero Waste Lifestyle</h3>
          <p className="text-gray-700">Reduce your footprint with practical eco-conscious living tips.</p>
        </Link>
      </div>

      {/* 📚 SEARCHABLE RESOURCE TABLE */}
      <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
        📘 Learn More from Trusted Resources
      </h2>
      <SearchableTable />
    </div>
  );
}

// 🔍 Reusable searchable table component
function SearchableTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const resources = [
    { topic: "Climate Change", category: "Environment", link: "https://www.un.org/en/climatechange" },
    { topic: "Zero Waste Lifestyle", category: "Lifestyle", link: "https://www.zerowaste.com/" },
    { topic: "Sustainable Technology", category: "Technology", link: "https://www.greenmatch.co.uk/blog/2017/11/green-technology" },
    { topic: "Solar Energy", category: "Technology", link: "https://www.energy.gov/eere/solar/articles/solar-energy-101" },
  ];

  const filtered = resources.filter(item =>
    item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search topics or categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded shadow mb-4"
      />

      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead className="bg-green-100 text-left">
          <tr>
            <th className="p-3">📘 Topic</th>
            <th className="p-3">📂 Category</th>
            <th className="p-3">🔗 Link</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={index} className="border-t hover:bg-green-50">
              <td className="p-3">{item.topic}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Visit 🌐
                </a>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-red-500">
                ❌ No matching items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Knowledge;
