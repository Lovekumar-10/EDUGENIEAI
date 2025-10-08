
// src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Container } from '@mui/material';

import AppNavbar from '../components/Homepage/AppNavbar';
import HeroSection from '../components/Homepage/HeroSection';
import FileUploader from '../components/Homepage/FileUploader';
import Footer from '../components/Homepage/Footer';


export default function DashboardPage() {
  return (
    <Box sx={{ bgcolor: '#f3f5f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <AppNavbar />
      </Box>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, px:0 }}>
        <HeroSection />
        <FileUploader />
    
      </Container>
      <Footer />
    </Box>
  );
}
