







// src/pages/Quiz.jsx
import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import AppNavbar from '../components/Homepage/AppNavbar';
import Footer from '../components/Homepage/Footer';
import QuizSetup from '../components/QuizPage/QuizSetup';
import QuizQuestions from '../components/QuizPage/QuizQuestions';
import QuizResult from '../components/QuizPage/QuizResult';

export default function Quiz() {
  const [quizStage, setQuizStage] = useState('setup'); // 'setup' | 'questions' | 'result'
  const [quizData, setQuizData] = useState({});

  // Start quiz from setup
  const handleStartQuiz = (data) => {
    setQuizData(data);
    setQuizStage('questions');
  };

  // Submit quiz from QuizQuestions
  const handleSubmitQuiz = (score) => {
    setQuizData((prev) => ({ ...prev, score }));
    setQuizStage('result');
  };

  // Retry quiz → back to setup
  const handleRetryQuiz = () => {
    setQuizData({});
    setQuizStage('setup');
  };

  return (
    <Box sx={{ bgcolor: '#f3f5f9', minHeight: '100vh', display: 'flex', flexDirection: 'column',}}>
      {/* Sticky Navbar */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <AppNavbar />
      </Box>

      {/* Page Content */}
      <Container maxWidth="sm" sx={{ flexGrow: 1, py: 0 , px:0.3 }}>
        {quizStage === 'setup' && <QuizSetup onStartQuiz={handleStartQuiz} />}
        {quizStage === 'questions' && (
          <QuizQuestions  backendData={quizData.backendData} onSubmitQuiz={handleSubmitQuiz} />
        )}
        {quizStage === 'result' && <QuizResult quizData={quizData} onRetry={handleRetryQuiz} />}
      </Container>

      <Footer />
    </Box>
  );
}
