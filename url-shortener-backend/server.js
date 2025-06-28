const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const urls = {};
const stats = {};

app.post('/api/shorten', (req, res) => {
  const { urls: urlPayload } = req.body;

  if (!Array.isArray(urlPayload)) return res.status(400).json({ message: 'Invalid input.' });

  const result = [];

  for (let entry of urlPayload) {
    const { longUrl, validity = 30, shortcode } = entry;

    if (!longUrl) return res.status(400).json({ message: 'Missing longUrl.' });

    let code = shortcode || nanoid(6);

    if (urls[code]) {
      return res.status(400).json({ message: `Shortcode "${code}" already exists.` });
    }

    const now = Date.now();
    const expiry = now + validity * 60 * 1000;

    urls[code] = {
      longUrl,
      expiry,
      createdAt: now
    };

    stats[code] = [];

    result.push({
      longUrl,
      shortcode: code,
      expiry
    });
  }

  return res.json(result);
});

app.get('/api/resolve/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const record = urls[shortcode];

  if (!record || Date.now() > record.expiry) {
    return res.status(404).json({ message: 'Short URL expired or invalid.' });
  }

  stats[shortcode].push({
    timestamp: Date.now(),
    source: 'browser',
    location: 'IN' // mock location
  });

  res.json({ longUrl: record.longUrl });
});

app.get('/api/statistics', (req, res) => {
  const response = Object.entries(urls).map(([shortcode, data]) => ({
    shortcode,
    longUrl: data.longUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    clicks: stats[shortcode] || []
  }));
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
