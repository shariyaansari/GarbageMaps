import React, { useState } from 'react';

const SearchBar = ({ sectors, onSelect }) => {
  const [query, setQuery] = useState('');

  const filteredSectors = sectors.features.filter(f => 
    f.properties.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute top-20 left-4 z-1001 w-64">
      <input
        type="text"
        placeholder="Search neighborhood..."
        className="w-full p-2 rounded-md border shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div className="bg-white mt-1 rounded-md shadow-xl max-h-40 overflow-y-auto">
          {filteredSectors.map((s, i) => (
            <div
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b"
              onClick={() => {
                onSelect(s);
                setQuery('');
              }}
            >
              {s.properties.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
