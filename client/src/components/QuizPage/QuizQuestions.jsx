


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  keyframes
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import confetti from "canvas-confetti";
import { generateQuiz } from "../../api/api";
import Notification from "../Homepage/Notification";

export default function QuizQuestions({ backendData, onSubmitQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("success");
  const [reminderPlayed, setReminderPlayed] = useState(false);

  // --- Notification handler ---
  const handleNotif = (message, severity = "info") => {
    setNotifMessage(message);
    setNotifSeverity(severity);
    setNotifOpen(true);
  };

  // --- Fetch questions ---
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await generateQuiz(backendData);
        setQuestions(response.data.questions || []);
        setTimeLeft((response.data.questions?.length || 10) * 60);
        setTimeUp(false);
        setReminderPlayed(false);
        setLoading(false);
      } catch (err) {
        handleNotif("Failed to load questions.", "error");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [backendData]);

  // --- Countdown timer with reminder ---
  useEffect(() => {
    if (loading || timeUp) return;
    if (timeLeft <= 0) {
      setTimeUp(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime === 120 && !reminderPlayed) {
          setReminderPlayed(true);
          const alarm = new Audio(
            "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
          );
          alarm.play();
          setTimeout(() => {
            alarm.pause();
            alarm.currentTime = 0;
          }, 5000);
        }
        if (newTime <= 0) {
          setTimeUp(true);
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, reminderPlayed, timeUp, timeLeft]);

  // --- Handle answer selection ---
  const handleSelect = (qId, option) => {
    if (revealed[qId] || timeUp) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));

    const question = questions.find((q) => q.id === qId);
    if (option === question.answer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#bb0000", "#ffffff", "#00bb00", "#ffcc00", "#00ccff"]
      });
      const correctAudio = new Audio(
        "https://actions.google.com/sounds/v1/cartoon/jingle_bells.ogg"
      );
      correctAudio.play();
      setTimeout(() => {
        correctAudio.pause();
        correctAudio.currentTime = 0;
      }, 2000);
    } else {
      const wrongAudio = new Audio(
        "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
      );
      wrongAudio.play();
      setTimeout(() => {
        wrongAudio.pause();
        wrongAudio.currentTime = 0;
      }, 2000);
    }
  };

  // --- Submit quiz ---
  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) score += 1;
    });
    onSubmitQuiz(score);
  };

  // --- Loading animation keyframes ---
  const bounce = keyframes`
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  `;

  if (loading)
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Typography
          sx={{ mb: 3, fontSize: "1.3rem", fontWeight: 500, color: "#fff" }}
        >
          Your Quiz is getting ready...
        </Typography>
        <Typography
  sx={{
    mb: 3,
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#FFD700", // bright yellow
    textAlign: "center",
    lineHeight: 1.5,
  }}
>
  You have 1 minute per question, <br />
  No Negative Marking <br /> 
</Typography>
  <Typography sx={{ mb: 3, fontSize: "1.3rem", fontWeight: 500, color: "#fff" }} > All The Best </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 15,
                height: 15,
                bgcolor: "#fff",
                borderRadius: "50%",
                animation: `${bounce} 1.4s infinite ease-in-out`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    );

  const numQuestions = questions.length;
  const duration = numQuestions * 60;

  return (
    <>
      <Box
        sx={{
          maxWidth: 1000,
          width:{ xs:"90%", sm: "90%", md: "100%",  lg: "100%" },
          mx: "auto",
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* TIMER (Floating Top-Right) */}
<Box
  sx={{
    position: "fixed",
    top: 90,      // space from top
    right: 20,    // space from right
    zIndex: 2000, // keep above all content
    bgcolor: "#fff",
    borderRadius: 3,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    p: 1.5,
     display: { xs: "none", md: "flex" }, 
    flexDirection: "column",
    alignItems: "center",
    gap: { xs: 0.5, sm: 1 },
  }}
>
  <Typography
    sx={{
      fontSize: { xs: "0.8rem", sm: "0.95rem" },
      fontWeight: 600,
      color: "#333",
    }}
  >
    Time Left
  </Typography>

  <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
    {/* Hours */}
    <Box
      sx={{
         bgcolor: { xs: "transparent", sm: "transparent", md: "#290062ff" },
        color: { xs: "#1e293ba7", sm: "#1e293b", md: "#fff" },
        px: { xs: 0, sm: 0 },
        py: { xs: 0, sm: 0 },
        borderRadius: 2,
         minWidth: { xs: 45, sm: 60 },
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: { xs: "1rem", sm: "1.0rem"  }, fontWeight: 700 }}>
        {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}
      </Typography>
      <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}>
        Hours
      </Typography>
    </Box>

    {/* Minutes */}
    <Box
      sx={{
         bgcolor: { xs: "transparent", sm: "transparent", md: "#290062ff" },
        color: { xs: "#1e293b", sm: "#1e293b", md: "#fff" },
        px: { xs: 0, sm: 0 },
        py: { xs: 0, sm: 0 },
        borderRadius: 2,
        minWidth: { xs: 45, sm: 60 },
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: { xs: "1rem", sm: "1.0rem"  }, fontWeight: 700 }}>
        {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}
      </Typography>
      <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}>
        Minutes
      </Typography>
    </Box>

    {/* Seconds */}
    <Box
      sx={{
        bgcolor: { xs: "transparent", sm: "transparent", md: "#290062ff" },
        color: { xs: "#1e293b", sm: "#1e293b", md: "#fff" },
        px: { xs: 0, sm: 0},
        py: { xs: 0, sm: 0},
        borderRadius: 2,
        minWidth: { xs: 45, sm: 60 },
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: { xs: "1rem", sm: "1.0rem" }, fontWeight: 700 }}>
        {String(timeLeft % 60).padStart(2, "0")}
      </Typography>
      <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}>
        Seconds
      </Typography>
    </Box>
  </Box>
</Box>

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            p: 2,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            bgcolor: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Advanced Knowledge Quiz
          </Typography>
           {/* TIMER (new style) */}
          {/* TIMER (responsive style) */}
<Box
  sx={{
   display: { xs: "flex", md: "none" }, 
    flexDirection: "column",
    alignItems: "center",
    gap: { xs: 0.5, sm: 1 },
  }}
>
  <Typography
    sx={{
      fontSize: { xs: "0.8rem", sm: "0.95rem" },
      fontWeight: 500,
      color: "#333",
    }}
  >
    Time Left
  </Typography>

  <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
    {/* Hours */}
    <Box
      sx={{
        bgcolor: { xs: "transparent", sm: "transparent", md: "#1e293b" },
        color: { xs: "#1e293b", sm: "#1e293b", md: "#fff" },
        px: { xs: 0, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        borderRadius: 2,
        minWidth: { xs: 55, sm: 70 },
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "1rem", sm: "1rem" }, fontWeight: "bold" }}
      >
        {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, color: "#94a3b8" }}
      >
        Hours
      </Typography>
    </Box>

    {/* Minutes */}
    <Box
      sx={{
        bgcolor: { xs: "transparent", sm: "transparent", md: "#1e293b" },
        color: { xs: "#1e293b", sm: "#1e293b", md: "#fff" },
        px: { xs: 0, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        borderRadius: 2,
        minWidth: { xs: 55, sm: 70 },
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "1rem", sm: "1rem" }, fontWeight: "bold" }}
      >
        {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, color: "#94a3b8" }}
      >
        Minutes
      </Typography>
    </Box>

    {/* Seconds */}
    <Box
      sx={{
        bgcolor: { xs: "transparent", sm: "transparent", md: "#1e293b" },
        color: { xs: "#1e293b", sm: "#1e293b", md: "#fff" },
        px: { xs: 0, sm: 2 },
        py: { xs: 0.5, sm: 1 },
        borderRadius: 2,
        minWidth: { xs: 55, sm: 70 },
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "1rem", sm: "1rem" }, fontWeight: "bold" }}
      >
        {String(timeLeft % 60).padStart(2, "0")}
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, color: "#94a3b8" }}
      >
        Seconds
      </Typography>
    </Box>
  </Box>
</Box>

        </Box>

        {/* QUESTIONS */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isRevealed = revealed[q.id];
            return (
              <Paper
                key={q.id}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                  ":hover": { boxShadow: "0 8px 25px rgba(0,0,0,0.15)" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 500, fontSize: { xs: "0.95rem", sm: "1.05rem" } }}
                >
                  Q{idx + 1}. {q.question}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {q.options.map((opt) => {
                    let bgColor = "#f5f5f5";
                    let icon = null;
                    if (isRevealed) {
                      if (opt === q.answer) {
                        bgColor = "#c8e6c9";
                        icon = <CheckCircleIcon sx={{ color: "green", ml: 1 }} />;
                      } else if (opt === userAnswer && userAnswer !== q.answer) {
                        bgColor = "#ffcdd2";
                        icon = <CancelIcon sx={{ color: "red", ml: 1 }} />;
                      }
                    }
                    return (
                      <Paper
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: revealed[q.id] || timeUp ? "default" : "pointer",
                          bgcolor: bgColor,
                          border: "1px solid #ddd",
                          transition: "all 0.3s",
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          ":hover": { transform: "scale(1.02)" },
                        }}
                      >
                        <Typography>{opt}</Typography>
                        {icon}
                      </Paper>
                    );
                  })}
                </Box>
              </Paper>
            );
          })}
        </Box>

        {/* SUBMIT BUTTON */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 3,
            px: 5,
            py: 1.5,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            borderRadius: 3,
            transition: "all 0.3s",
            ":hover": { transform: "scale(1.05)" },
          }}
        >
          Submit Quiz
        </Button>

        {/* TIME-UP POPUP */}
        <Dialog open={timeUp} onClose={() => {}} disableEscapeKeyDown>
          <DialogTitle>⏰ Time’s Up!</DialogTitle>
          <DialogContent>
            <Typography>Your allotted time has finished. Please submit your quiz now.</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Now
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* Notification */}
      <Notification
        open={notifOpen}
        message={notifMessage}
        severity={notifSeverity}
        onClose={() => setNotifOpen(false)}
      />
    </>
  );
}
