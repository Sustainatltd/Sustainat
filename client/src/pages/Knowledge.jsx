import React, { useState } from 'react';

function Knowledge() {
  // 🔢 Step 1: Create state to hold user input
  const [humanCO2, setHumanCO2] = useState('');
  const [treeCO2, setTreeCO2] = useState('');
  const [result, setResult] = useState(null);

  // 🧠 Step 2: Function to calculate number of trees
  const calculateTrees = () => {
    // Convert inputs to numbers
    const human = parseFloat(humanCO2);
    const tree = parseFloat(treeCO2);

    // Check if values are valid
    if (isNaN(human) || isNaN(tree) || tree === 0) {
      setResult("Please enter valid numbers (tree CO₂ can't be zero).");
      return;
    }

    // Calculate number of trees needed
    const treesNeeded = (human / tree).toFixed(2);
    setResult(`🌳 You need approx. ${treesNeeded} trees per person to be carbon neutral.`);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>🌱 Sustainat Tree & Human Calculator</h1>

      {/* Human CO2 Input */}
      <div style={{ marginBottom: '15px' }}>
        <label>CO₂ emitted by 1 human per day (grams):</label><br />
        <input
          type="number"
          value={humanCO2}
          onChange={(e) => setHumanCO2(e.target.value)}
          style={{ padding: '8px', width: '300px', marginTop: '5px' }}
          placeholder="e.g. 1043.26"
        />
      </div>

      {/* Tree CO2 Absorption Input */}
      <div style={{ marginBottom: '15px' }}>
        <label>CO₂ absorbed by 1 tree per day (grams):</label><br />
        <input
          type="number"
          value={treeCO2}
          onChange={(e) => setTreeCO2(e.target.value)}
          style={{ padding: '8px', width: '300px', marginTop: '5px' }}
          placeholder="e.g. 68.5"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateTrees}
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Calculate
      </button>

      {/* Result Box */}
      {result && (
        <div style={{
          backgroundColor: '#e5ffe5',
          padding: '15px',
          borderRadius: '8px',
          width: 'fit-content'
        }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default Knowledge;
