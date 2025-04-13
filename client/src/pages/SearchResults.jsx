import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import to get the search query from URL

const SearchResults = () => {
  const { query } = useParams(); // Get the query from the URL params
  const [results, setResults] = useState([]); // State to store search results

  useEffect(() => {
    // Mock data for demonstration. In a real app, you should replace this with a fetch call to your backend
    const mockData = [
      { title: 'Sustainable Agriculture', description: 'Details about sustainable farming practices.' },
      { title: 'Eco-friendly Products', description: 'List of eco-friendly products for sustainable living.' },
      { title: 'Zero Waste Tips', description: 'How to live a zero-waste lifestyle.' },
      { title: 'Sustainat: Green Products', description: 'Details about Sustainat’s green products.' }, // Added a relevant result
      { title: 'Sustainat Careers', description: 'Job opportunities at Sustainat for sustainability-focused roles.' } // Added a relevant result
    ];

    // Filter the results based on the search query
    const filteredResults = mockData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults); // Update the state with the filtered results
  }, [query]); // Re-run the effect when the query changes

  return (
    <div className="search-results">
      <h2 className="text-3xl mb-4">Search Results for "{query}"</h2>

      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-2xl font-bold">{result.title}</h3>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for your search query.</p>
      )}
    </div>
  );
};

export default SearchResults;
