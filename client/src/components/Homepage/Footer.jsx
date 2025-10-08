// Footer.jsx
import React from 'react';
import { Box, Typography, Link, useTheme, useMediaQuery } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: isMobile ? 2 : 4,
        bgcolor: '#f3f5f9',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      {/* Column layout */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {/* Powered by with clickable name */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.85rem', fontWeight: 600 }}
        >
          Powered by ~{' '}
          <Link
            href="https://www.instagram.com/love_kumar9654"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: '#4B0082',
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: '#4B0082',
                transition: 'width 0.3s ease',
              },
              '&:hover::after': {
                width: '100%',
              },
            }}
          >
            LoveKumar 💜
          </Link>
        </Typography>

        {/* Legal text */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.75rem' }}
        >
          By embarking on this quest, you agree to our{' '}
          <Link
            href="#"
            underline="hover"
            sx={{ color: '#4B0082', cursor: 'pointer' }}
          >
            Scrolls of Agreement
          </Link>{' '}
          and{' '}
          <Link
            href="#"
            underline="hover"
            sx={{ color: '#4B0082', cursor: 'pointer' }}
          >
            Privacy Codex
          </Link>.
        </Typography>
      </Box>
    </Box>
  );
}
