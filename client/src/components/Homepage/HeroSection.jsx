
import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Typewriter from 'typewriter-effect';

const buttonStyles = {  
  borderRadius: '25px',
  padding: '10px 22px',
  fontWeight: 700,
  boxShadow: '0 6px 16px rgb(0 0 0 / 0.1)',
  textTransform: 'none',
};

const buttons = [
  { label: 'Summon Notes', color: 'purple', bg: 'linear-gradient(145deg, #6a11cb, #2575fc)', icon: <NoteIcon /> },
  { label: 'Forge Flashcards', color: '#BCAAA4', bg: 'linear-gradient(145deg, #fffce1, #f7d794)', icon: <AutoAwesomeIcon /> },
  { label: 'Build Mind Maps', color: '#ff9800', bg: 'linear-gradient(145deg, #ffb74d, #ff9800)', icon: <AutoAwesomeIcon /> },
  { label: 'AI Summaries', color: '#4caf50', bg: 'linear-gradient(145deg, #81c784, #4caf50)', icon: <NoteIcon /> },
  { label: 'Practice Quizzes', color: '#03a9f4', bg: 'linear-gradient(145deg, #29b6f6, #03a9f4)', icon: <SportsEsportsIcon /> },
  
];

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));    

  return (
    <Box sx={{ px: 0, py: 4, textAlign: 'center', backgroundColor: '#f3f5f9' }}>
      {/* Header */}
      <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold" color="#4B0082" mb={1}>
        Level Up Your Skills with <span style={{ color: "rgba(241, 134, 3, 1)", marginLeft: "0.3rem" }}>EduGenie</span>Ai
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Your next learning adventure awaits!
      </Typography>

      {/* Typing Effect */}
      <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4  }}>
        <Typography 
         sx={{
      fontSize: {
        xs: '1rem', // mobile
        sm: '2rem',   // small tablets
        md: '2rem', // larger tablets
        lg: '2rem',   // desktops
      },
      color: "rgba(113, 0, 205, 1)",
    }}
        >
          <Typewriter
            options={{
              strings: [
                'Summarize your notes instantly📚',
                'Create Flashcards in seconds ⚡',
                'Test yourself with quizzes 🎯',
                'Convert chapters into notes 📝',
                'Turn thoughts into a mind map🧠',
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 25,
            }}
          />
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          overflowX: isMobile ? 'auto' : 'visible',
          px: isMobile ? 1 : 0,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {buttons.map(({ label, color, bg, icon }) => (
          <Button
            key={label}
            startIcon={icon}
            sx={{
              ...buttonStyles,
              background: bg,
              color: color === 'purple' ? '#fff' : '#4B0082',
              minWidth: 160,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': {
                filter: 'brightness(1.1)',
                background: bg,
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
