const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cors = require('cors'); // Import the cors package

let gpsData = []; // Array to store GPS data

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Received GPS data:', body);
      const parsedData = querystring.parse(body); // Parse URL-encoded data
      gpsData.push(parsedData); // Store parsed GPS data
      res.end('Data received');
    });
  } else if (req.method === 'GET' && req.url === '/gps-data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(gpsData));
  } else {
    res.end('Send a POST request or GET /gps-data');
  }
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});