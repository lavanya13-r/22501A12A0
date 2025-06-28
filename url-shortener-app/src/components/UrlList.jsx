import { Box, Typography, Card, CardContent } from '@mui/material';

export default function UrlList({ results }) {
  return (
    results.length > 0 && (
      <Box mt={4}>
        <Typography variant="h5">Shortened URLs</Typography>
        {results.map((res, idx) => (
          <Card key={idx} sx={{ my: 2 }}>
            <CardContent>
              <Typography><strong>Original:</strong> {res.longUrl}</Typography>
              <Typography><strong>Short:</strong> <a href={`/${res.shortcode}`} target="_blank" rel="noreferrer">http://localhost:3000/{res.shortcode}</a></Typography>
              <Typography><strong>Expires At:</strong> {new Date(res.expiry).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    )
  );
}