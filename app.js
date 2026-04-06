const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// GET / — Welcome page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /about — About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// GET /contact — Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// GET /api/time — Current time as JSON
app.get('/api/time', (req, res) => {
  const now = new Date();
  res.json({
    time: now.toLocaleTimeString(),
    date: now.toLocaleDateString(),
    iso: now.toISOString(),
  });
});

// GET /api/greeting?name=Sara — Personalized greeting
app.get('/api/greeting', (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({
      error: 'Please provide a name. Example: /api/greeting?name=Sara',
    });
  }

  res.json({
    greeting: `Hello, ${name}! 👋`,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});