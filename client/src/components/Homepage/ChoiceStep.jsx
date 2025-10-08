


















import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const defaultPrompts = {
  summary: [
    { title: "Short summary", desc: "Get a brief overview highlighting the main points and key ideas quickly." },
    { title: "Detailed summary", desc: "Provides an in-depth summary covering all essential aspects and examples clearly." },
    { title: "Pointwise summary", desc: "Organize content into clear bullet points for easy reading and quick reference." },
    { title: "Concise summary", desc: "Short, clear summary, highlighting the main ideas in a few words?" },
  ],
  notes: [
    { title: "Bullet notes", desc: "Generate concise bullet-style notes capturing important facts and ideas efficiently." },
    { title: "Descriptive notes", desc: "Write detailed notes with explanations, examples, and clarifications for better understanding." },
    { title: "Q&A style notes", desc: "Convert the content into a question and answer format for study purposes." },
    { title: "Key points notes", desc: "Highlight the most important points in clear, organized notes." },
  ],
};

const ChoiceStep = ({ onContinue }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [step, setStep] = useState(1);
  const [choiceType, setChoiceType] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [customInput, setCustomInput] = useState("");

  // Reset state when going back
  const handleBack = () => {
    setStep(1);
    setChoiceType("");
    setSelectedOption(null);
    setCustomInput("");
  };

  const handleMainChoice = (type) => {
    setChoiceType(type);
    setStep(2);
    setSelectedOption(null);
    setCustomInput("");
  };

  const handleSelectCard = (option) => {
    setSelectedOption(option);
  };

  const handleInputClick = () => {
    setSelectedOption("input");
  };

  const handleContinue = () => {
    const value = selectedOption === "input" ? customInput : selectedOption.desc;
    onContinue({ choiceType, prompt: value });
    // Reset after sending so old input doesn't stay
    setSelectedOption(null);
    setCustomInput("");
  };

  const handleFlashcardSubmit = () => {
    if (!customInput) return;
    const count = parseInt(customInput, 10);
    onContinue({ choiceType, count });
    setCustomInput("");
  };

  const cardStyle = (selected) => ({
    border: selected ? "2px solid #6a11cb" : "1px solid #ccc",
    borderRadius: 3,
    p: 2,
    mb: 1.5,
    cursor: "pointer",
    textAlign: "center",
    opacity: selectedOption === "input" ? 0.6 : 1,
    transition: "all 0.2s",
    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  });

  return (
    <Box mt={3} sx={{ width: "100%", mx: "auto" }}>
      {step === 1 && (
        <>
          <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
            What do you want to create?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap",
            }}
          >
            <Button variant="outlined" fullWidth onClick={() => handleMainChoice("summary")} sx={{ p: 2, fontWeight: "bold" }}>Summary</Button>
            <Button variant="outlined" fullWidth onClick={() => handleMainChoice("notes")} sx={{ p: 2, fontWeight: "bold" }}>Notes</Button>
            <Button variant="outlined" fullWidth onClick={() => handleMainChoice("flashcards")} sx={{ p: 2, fontWeight: "bold" }}>Flash Cards</Button>
       
          </Box>
        </>
      )}

      {step === 2 && (choiceType === "summary" || choiceType === "notes") && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleBack}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              {choiceType.charAt(0).toUpperCase() + choiceType.slice(1)} Options
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 1, flexWrap: "wrap" }}>
            {defaultPrompts[choiceType].map((p, idx) => (
              <Card key={idx} sx={{ ...cardStyle(selectedOption === p), flex: isMobile ? "1 0 100%" : "1 0 45%" }} onClick={() => handleSelectCard(p)}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{p.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <TextField
            fullWidth
            placeholder="Write your own instructions..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onClick={handleInputClick}
            sx={{
              mt: 2,
              border: selectedOption === "input" ? "2px solid #6a11cb" : "1px solid #ccc",
              borderRadius: 2,
              opacity: selectedOption === "input" ? 1 : 0.8,
              transition: "all 0.2s",
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={selectedOption === null || (selectedOption === "input" && !customInput)}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </>
      )}

      {step === 2 && choiceType === "flashcards" && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleBack}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>Flashcards Options</Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>How many flashcards do you want me to generate?</Typography>
          <TextField
            type="number"
            fullWidth
            placeholder="Enter number (e.g. 10)"
            value={customInput}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (val >= 1 || e.target.value === "") setCustomInput(e.target.value);
            }}
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth disabled={!customInput} onClick={handleFlashcardSubmit}>
            Continue
          </Button>
        </>
      )}
    </Box>
  );
};

export default ChoiceStep;
