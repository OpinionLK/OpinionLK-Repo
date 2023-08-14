import React, { useState } from 'react';
import axios from 'axios';
import mindee from 'mindee'; // Import the Mindee library

const DocumentScanner = () => {
  const [result, setResult] = useState('');
  const apiKey = '5897c0feb71dba4ac54bff1192632f07'; // Replace with your Mindee API key
  const apiUrl = 'https://api.mindee.net/v1/products/Rashmi99/drivers_liscense/v1/predict';

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Upload the file to Mindee API for processing
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        // Handle the response here
        const responseData = response.data;
        setResult(JSON.stringify(responseData, null, 2));
      } catch (error) {
        console.error('Error:', error);
        setResult('An error occurred while processing the request.');
      }
    }
  };

  return (
    <div>
      <h1>Document Scanner</h1>
      <input type="file" accept=".jpg, .jpeg, .png, .pdf" onChange={handleUpload} />
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default DocumentScanner;
