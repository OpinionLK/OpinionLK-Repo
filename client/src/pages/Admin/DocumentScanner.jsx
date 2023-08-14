import React, { useState } from 'react';

const DocumentScanner = () => {
  const [result, setResult] = useState('');
  const apiKey = '5897c0feb71dba4ac54bff1192632f07'; // Replace with your actual Mindee API key

  const mindeeSubmit = (evt) => {
    evt.preventDefault();
    let myFileInput = document.getElementById('my-file-input');
    let myFile = myFileInput.files[0];

    if (!myFile) { return; }

    let data = new FormData();
    data.append("document", myFile, myFile.name);

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        const contentResults = getContentResults(response);
        setResult(contentResults);
      }
    });

    xhr.open("POST", "https://api.mindee.net/v1/products/Rashmi99/drivers_liscense/v1/predict");
    xhr.setRequestHeader("Authorization", `Token ${apiKey}`);
    xhr.send(data);
  };

  const getContentResults = (response) => {
    if (response && response.document && response.document.inference) {
      const inference = response.document.inference;
      const contentResults = inference.pages.flatMap(page =>
        Object.values(page.prediction).flatMap(item => item.values)
      ).map(value => value.content);

      const formattedResults = {
        "name": contentResults[7],
        "address": contentResults.slice(0, 5).join(', '),
        "date_of_birth": contentResults[5],
        "blood_group": contentResults[6],
        "nic": contentResults[9]
      };

      return JSON.stringify(formattedResults, null, 2);
    }
    return 'No content results available.';
  };

  const handleUpload = (e) => {
    e.preventDefault();
    mindeeSubmit(e); // Call the mindeeSubmit function to handle the upload and API request
  };

  return (
    <div>
      <h1>Document Scanner</h1>
      <form onSubmit={handleUpload}>
        <input type="file" id="my-file-input" name="file" />
        <input type="submit" />
      </form>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default DocumentScanner;
