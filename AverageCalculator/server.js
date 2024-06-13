const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port =9876;
app.use(cors({ origin: 'http://localhost:3000' }));



const WINDOW_SIZE = 10;
const testServerUrl = 'http://20.244.56.144/test';
let windowNumbers = [];
const calculateAverage = (numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length) || 0;
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  var t=0;
  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid numberid' });
  }
  if(numberid=="e"){t="even"}
  else if(numberid=="f"){t="fibo"}
  else if(numberid=="p"){t="primes"}
  else{t="rand"}
const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4Mjg1Nzg0LCJpYXQiOjE3MTgyODU0ODQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdjNjAyMjk3LWE1OTYtNGZjZi05Y2U1LTIyYmE1ZDhiNzkxMCIsInN1YiI6IjIxMDAwNDkxMTNlY2VAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiS0xVTklWRVJTSVRZIiwiY2xpZW50SUQiOiI3YzYwMjI5Ny1hNTk2LTRmY2YtOWNlNS0yMmJhNWQ4Yjc5MTAiLCJjbGllbnRTZWNyZXQiOiJxRHVWVlV0UWdMRkdrVm9IIiwib3duZXJOYW1lIjoiTmFndWJhdGh1bGFTYXR5YVNhaSIsIm93bmVyRW1haWwiOiIyMTAwMDQ5MTEzZWNlQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwNDkxMTMifQ.no6Ad7EhQDr73WhiB7EuR2YGO3F6YQej2gELTLzsCaM"
  try {
    const response = await axios.get(`${testServerUrl}/${t}`, {
      timeout: 1000,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    const newNumbers = response.data.numbers;
    
    windowNumbers = [...new Set([...windowNumbers, ...newNumbers])];
    if (windowNumbers.length > WINDOW_SIZE) {
      windowNumbers = windowNumbers.slice(-WINDOW_SIZE);
    }
    
    const average = calculateAverage(windowNumbers);

    const result = {
      numbers: newNumbers,
      windowPrevState: windowNumbers.slice(0, windowNumbers.length - newNumbers.length),
      windowCurrState: windowNumbers,
      avg: average
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});