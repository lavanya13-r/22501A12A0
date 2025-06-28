import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    axios.get(`/api/resolve/${shortcode}`).then(res => {
      window.location.href = res.data.longUrl;
    }).catch(() => {
      alert('Invalid or expired short URL');
    });
  }, [shortcode]);

  return <div>Redirecting...</div>;
}
