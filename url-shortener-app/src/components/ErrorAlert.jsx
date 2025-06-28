import { Alert } from '@mui/material';

export default function ErrorAlert({ error }) {
  return error ? <Alert severity="error" sx={{ my: 2 }}>{error}</Alert> : null;
}