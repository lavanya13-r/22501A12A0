import { Grid, TextField } from '@mui/material';

export default function UrlForm({ urls, onChange }) {
  return (
    <>
      {urls.map((url, idx) => (
        <Grid container spacing={2} key={idx} my={1}>
          <Grid item xs={5}>
            <TextField fullWidth label="Long URL" value={url.longUrl} onChange={(e) => onChange(idx, 'longUrl', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Validity (minutes)" value={url.validity} onChange={(e) => onChange(idx, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Custom Shortcode" value={url.shortcode} onChange={(e) => onChange(idx, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
    </>
  );
}