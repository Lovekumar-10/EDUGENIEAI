
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Slider,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"; // Easy
import PsychologyIcon from "@mui/icons-material/Psychology"; // Medium
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Hard
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function QuizSetup({ onStartQuiz }) {
  const [category, setCategory] = useState("");
  const [customText, setCustomText] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(10);
  const [error, setError] = useState(false);

  const difficulties = [
    { key: "easy", label: "Easy", icon: <EmojiEmotionsIcon fontSize="large" /> },
    { key: "medium", label: "Medium", icon: <PsychologyIcon fontSize="large" /> },
    { key: "hard", label: "Hard", icon: <WhatshotIcon fontSize="large" /> },
  ];

  const libraryOptions = [
    { key: "data_structures", label: "Data Structures" },
    { key: "algorithms", label: "Algorithms" },
    { key: "react_js", label: "React.js" },
    { key: "node_js", label: "Node.js" },
    { key: "python", label: "Python" },
    { key: "javascript", label: "JavaScript" },
    { key: "machine_learning", label: "Machine Learning" },
    { key: "web_development", label: "Web Development" },
    { key: "mobile_development", label: "Mobile Development" },
    { key: "cyber_security", label: "Cyber Security" },
  ];

  const handleStart = () => {
    if (!category && !customText.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const backendData = {
      topic: category || null,
      customText: customText.trim() || null,
      difficulty,
      numQuestions,
    };

    // Console log in readable format
    console.log("Sending to backend:");
    if (backendData.topic) console.log(`Topic: ${backendData.topic}`);
    if (backendData.customText) console.log(`CustomText: ${backendData.customText}`);
    console.log(`Difficulty: ${backendData.difficulty}`);
    console.log(`QuestionsNo: ${backendData.numQuestions}`);


    onStartQuiz({ backendData});
  };

  const isDisabled = !category && !customText.trim();

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", bgcolor: "#f9f9fb", p: 4, borderRadius: 3 }}>
      {/* Title */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          🎓 AI Quiz Maker
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Tell me what to quiz you on and I’ll generate questions instantly!
        </Typography>
       
      </Box>
       <Typography variant="h6" sx={{ mb: 2 }}>
          Choose any of the given below
        </Typography>

      {/* Topic Selection */}
      <FormControl
        fullWidth
        sx={{ mb: 2 }}
        error={error && !category && !customText.trim()}
      >
        <InputLabel>Select Topic</InputLabel>
        <Select
          value={category}
          label="Select Topic"
          onChange={(e) => {
            setCategory(e.target.value);
            setCustomText(""); // Clear text when topic selected
          }}
          disabled={customText.trim() !== ""} // Disable if text is entered
        >
          {libraryOptions.map((opt) => (
            <MenuItem key={opt.key} value={opt.key}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {error && !category && !customText.trim() && (
          <FormHelperText>Please select a topic or paste your own notes.</FormHelperText>
        )}
      </FormControl>

      {/* OR Divider */}
      <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
        <Box sx={{ flex: 1, height: 1, bgcolor: "#ccc" }} />
        <Typography sx={{ mx: 2, color: "text.secondary", fontWeight: 500 }}>OR</Typography>
        <Box sx={{ flex: 1, height: 1, bgcolor: "#ccc" }} />
      </Box>

      {/* Custom Text */}
      <TextField
        placeholder="Paste your own notes or text on the topic you want a quiz for. (max 5000 chars)"
        fullWidth
        multiline
        rows={4}
        value={customText}
        onChange={(e) => {
          setCustomText(e.target.value);
          setCategory(""); // Clear topic when text is entered
        }}
        inputProps={{ maxLength: 5000 }}
        error={error && !category && !customText.trim()}
        helperText={
          error && !category && !customText.trim()
            ? "Paste text or select a topic first."
            : ""
        }
        sx={{ mb: 3 }}
        disabled={category !== ""} // Disable if topic is selected
      />

      {/* Difficulty */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Choose Difficulty Level
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", justifyContent: "center" }}>
        {difficulties.map(({ key, label, icon }) => (
          <Tooltip key={key} title={label}>
            <IconButton
              onClick={() => setDifficulty(key)}
              sx={{
                flexDirection: "column",
                width: { xs: 100, sm: 120, md: 140 },
                height: { xs: 80, sm: 100, md: 120 },
                borderRadius: 2,
                border: difficulty === key ? "3px solid #1976d2" : "2px solid #ccc",
                transition: "all 0.3s ease",
                color: difficulty === key ? "primary.main" : "text.secondary",
                "&:hover": { transform: "scale(1.08)", borderColor: "#1976d2" },
                animation: difficulty === key ? `${pulse} 0.5s infinite` : "none",
              }}
            >
              {icon}
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  fontWeight: 500,
                  textAlign: "center",
                  fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                }}
              >
                {label}
              </Typography>
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Number of Questions */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Choose Number of Questions
      </Typography>
      <Slider
        value={numQuestions}
        step={null}
        min={3}
        max={30}
        marks={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 15, label: "15" },
          { value: 20, label: "20" },
          { value: 25, label: "25" },
          { value: 30, label: "30" },
        ]}
        valueLabelDisplay="auto"
        sx={{
          mb: 8,
          mt: 1,
          "& .MuiSlider-markLabel": { fontWeight: 500, color: "text.secondary" },
          "& .MuiSlider-markLabel-active": {
            color: "#1976d2",
            fontWeight: "bold",
            textShadow: "0 0 8px rgba(25,118,210,0.6)",
          },
        }}
        onChange={(e, val) => setNumQuestions(val)}
      />

      {/* Start Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ py: 1.5, fontWeight: 600 }}
        onClick={handleStart}
        disabled={isDisabled}
      >
         Generate Quiz
      </Button>
    </Box>
  );
}

