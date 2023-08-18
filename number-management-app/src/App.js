import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');

  const handleInputUrlsChange = (event) => {
    setInputUrls(event.target.value);
  };

  const fetchNumbers = async () => {
    try {
      const urls = inputUrls.split('\n').map(url => encodeURIComponent(url.trim())).filter(url => url !== '');
      const response = await axios.get('http://localhost:8008/numbers', {
        params: {
          url: urls,
        },
        timeout: 5000,
      });

      setMergedNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="inputUrls">Enter URLs (one per line):</label>
        <textarea
          id="inputUrls"
          rows="4"
          cols="100"
          value={inputUrls}
          onChange={handleInputUrlsChange}
        />
      </div>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <ul>
        {mergedNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
