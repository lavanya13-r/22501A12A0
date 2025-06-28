import { useState } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { isValidURL, isValidShortcode } from '../utils/validators';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import ErrorAlert from '../components/ErrorAlert';

export default function ShortenerPage() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async () => {
    setError('');
    const payload = [];
    for (let urlObj of urls) {
      const { longUrl, validity, shortcode } = urlObj;
      if (!isValidURL(longUrl)) {
        setError('One or more URLs are invalid.');
        return;
      }
      if (validity && isNaN(parseInt(validity))) {
        setError('Validity must be an integer.');
        return;
      }
      if (shortcode && !isValidShortcode(shortcode)) {
        setError('Shortcode must be alphanumeric (4-20 chars).');
        return;
      }
      payload.push({ longUrl, validity: validity || 30, shortcode });
    }

    try {
      const response = await axios.post('/api/shorten', { urls: payload });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating short URLs.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      <ErrorAlert error={error} />
      <UrlForm urls={urls} onChange={handleChange} />
      <Button onClick={addUrlField} disabled={urls.length >= 5}>Add Another</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten URLs</Button>
      <UrlList results={results} />
    </Box>
  );
}
