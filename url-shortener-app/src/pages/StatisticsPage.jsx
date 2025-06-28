import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';

export default function StatisticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/statistics').then(res => setData(res.data));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4">URL Statistics</Typography>
      {data.map((entry, idx) => (
        <Card key={idx} sx={{ my: 2 }}>
          <CardContent>
            <Typography><strong>Short URL:</strong> http://localhost:3000/{entry.shortcode}</Typography>
            <Typography><strong>Created:</strong> {new Date(entry.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Expires:</strong> {new Date(entry.expiry).toLocaleString()}</Typography>
            <Typography><strong>Total Clicks:</strong> {entry.clicks.length}</Typography>
            <Divider sx={{ my: 1 }} />
            {entry.clicks.map((click, i) => (
              <Box key={i} mb={1}>
                <Typography variant="body2">[{new Date(click.timestamp).toLocaleString()}] from {click.source} - {click.location}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}