// // src/components/QuizPage/QuizResult.jsx
// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// export default function QuizResult({ quizData, onRetry }) {
//   const { backendData, mode, score } = quizData || {};
//   const { category, customText, numQuestions } = backendData || {};

//   return (
//     <Box
//       sx={{
//         bgcolor: '#fff',
//         p: 4,
//         borderRadius: 2,
//         boxShadow: '0 2px 10px rgb(0 0 0 / 0.1)',
//       }}
//     >
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Quiz Result
//       </Typography>
      
//       <Typography sx={{ mb: 1 }}>
//         Topic: {category || customText || 'Custom Text'}
//       </Typography>
      
//       <Typography sx={{ mb: 3 }}>
//         You scored: {score || 0} / {numQuestions || 0}
//       </Typography>

//       <Button variant="contained" color="primary" onClick={onRetry}>
//         Retry Quiz
//       </Button>
//     </Box>
//   );
// }















// // src/components/QuizPage/QuizResult.jsx
// import React, { useEffect } from "react";
// import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import html2canvas from "html2canvas";
// import confetti from "canvas-confetti";

// export default function QuizResult({ quizData, onRetry }) {
//   const { backendData, score, userName } = quizData || {};
//   const { category, customText, numQuestions } = backendData || {};

//   const percentage = numQuestions ? Math.round((score / numQuestions) * 100) : 0;

//   // 🎯 Feedback messages
//   let feedback = "Keep trying 💪";
//   if (percentage >= 90) feedback = "Genius! 🌟 You nailed it!";
//   else if (percentage >= 60) feedback = "Great job! 👍 You're improving!";

//   // 🎉 Confetti for good scores
//   useEffect(() => {
//     if (percentage >= 60) {
//       confetti({
//         particleCount: 120,
//         spread: 80,
//         origin: { y: 0.6 },
//       });
//     }
//   }, [percentage]);

//   // 📸 Save result as image
//   const handleSaveImage = () => {
//     const card = document.getElementById("result-card");
//     html2canvas(card).then((canvas) => {
//       const link = document.createElement("a");
//       link.download = "quiz-result.png";
//       link.href = canvas.toDataURL();
//       link.click();
//     });
//   };

//   // 📤 Share result as image
//   const handleShareImage = (platform) => {
//     const card = document.getElementById("result-card");
//     html2canvas(card).then((canvas) => {
//       canvas.toBlob((blob) => {
//         const file = new File([blob], "quiz-result.png", { type: "image/png" });

//         if (navigator.canShare && navigator.canShare({ files: [file] })) {
//           navigator
//             .share({
//               files: [file],
//               title: "My Quiz Result - EdugenieAI",
//               text: `🏆 ${userName || "Player"} scored ${score}/${numQuestions} (${percentage}%) in ${
//                 category || customText
//               }! 🎉`,
//             })
//             .catch((err) => console.log("Share failed:", err));
//         } else {
//           alert(
//             `Direct image sharing not supported. Please save the image and share it on ${platform}.`
//           );
//         }
//       });
//     });
//   };

//   return (
//     <Box
//       id="result-card"
//       sx={{
//         bgcolor: "#fff",
//         p: 4,
//         borderRadius: 4,
//         boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
//         textAlign: "center",
//         maxWidth: 400,
//         mx: "auto",
//       }}
//     >
//       {/* 🏆 Trophy */}
//       <Typography variant="h3" sx={{ mb: 2 }}>
//         🏆
//       </Typography>

//       {/* Username + Score */}
//       <Typography
//         variant="h5"
//         sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}
//       >
//         🎉 {userName || "Player"} scored {score}/{numQuestions}
//       </Typography>

//       {/* Motivational Message */}
//       <Typography sx={{ fontSize: "14px", color: "gray", mb: 3 }}>
//         {feedback}
//       </Typography>

//       {/* Save & Share Image Buttons */}
//       <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
//         <Button variant="contained" color="primary" onClick={handleSaveImage}>
//           ⭐ Save
//         </Button>
//       </Stack>

//       {/* Social Media Icons */}
//       <Stack direction="row" spacing={2} justifyContent="center">
//         <IconButton sx={{ color: "#25D366" }} onClick={() => handleShareImage("WhatsApp")}>
//           <WhatsAppIcon fontSize="large" />
//         </IconButton>
//         <IconButton sx={{ color: "#1877F2" }} onClick={() => handleShareImage("Facebook")}>
//           <FacebookIcon fontSize="large" />
//         </IconButton>
//         <IconButton sx={{ color: "#E1306C" }} onClick={() => handleShareImage("Instagram")}>
//           <InstagramIcon fontSize="large" />
//         </IconButton>
//       </Stack>

//       {/* Retry Quiz Button */}
//       <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
//         <Button variant="outlined" color="secondary" onClick={onRetry}>
//           🔄 Retry Quiz
//         </Button>
//       </Stack>
//     </Box>
//   );
// }






// src/components/QuizPage/QuizResult.jsx
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack, IconButton, keyframes, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SyncIcon from "@mui/icons-material/Sync";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

// Trophy/glow animation
const bounceGlow = keyframes`
  0% { transform: scale(1); text-shadow: 0 0 0px gold; }
  25% { transform: scale(1.2); text-shadow: 0 0 10px gold; }
  50% { transform: scale(1); text-shadow: 0 0 20px gold; }
  75% { transform: scale(1.2); text-shadow: 0 0 10px gold; }
  100% { transform: scale(1); text-shadow: 0 0 0px gold; }
`;

export default function QuizResult({ quizData, onRetry }) {
  const { backendData, score, userName } = quizData || {};
  const { category, customText, numQuestions } = backendData || {};
  const percentage = numQuestions ? Math.round((score / numQuestions) * 100) : 0;

  const cardRef = useRef();
  const canvasRef = useRef();

  // Animated score
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let start = 0;
    if (score > 0) {
      const stepTime = Math.max(20, 150 / score);
      const interval = setInterval(() => {
        start += 1;
        setDisplayScore(start);
        if (start >= score) clearInterval(interval);
      }, stepTime);
    }
  }, [score]);

  // Celebration levels
  const getCelebration = (percentage) => {
    if (percentage < 40) return { icon: " 😔 ", message: "Keep trying!", confettiCount: 50 };
    else if (percentage < 60) return { icon: "🥉", message: "Bronze Achievement!", confettiCount: 80 };
    else if (percentage < 80) return { icon: "🥈", message: "Silver Award!", confettiCount: 120 };
    else if (percentage < 95) return { icon: "🥇", message: "Gold Achievement!", confettiCount: 180 };
    else return { icon: "👑", message: "Perfect Score! You're amazing!", confettiCount: 250 };
  };

  const celebration = getCelebration(percentage);

  // Confetti effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    confetti({
      particleCount: celebration.confettiCount,
      spread: 90,
      origin: { x: 0.5, y: rect.top / window.innerHeight + 0.3 },
    });
  }, [percentage]);

  // Galaxy background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const nebulaColors = ["rgba(57,0,111,0.3)","rgba(5,243,235,0.2)","rgba(255,0,128,0.2)"];
    const particles = [];
    const particleCount = 500;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.min(width, height) / 2,
        size: Math.random() * 1.5 + 0.3,
        speed: (Math.random() * 0.002 + 0.0005) * (Math.random() < 0.5 ? 1 : -1),
        alpha: Math.random(),
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach(p => {
        p.angle += p.speed;
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;
        p.alpha += (Math.random()*0.02 - 0.01);
        p.alpha = Math.min(1, Math.max(0.1, p.alpha));
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/0\.2/, p.alpha.toFixed(2));
        ctx.fill();
      });

      nebulaColors.forEach((color, i) => {
        const gradient = ctx.createRadialGradient(
          width/2 + Math.sin(Date.now()*0.0001*(i+1))*50,
          height/2 + Math.cos(Date.now()*0.0001*(i+1))*50,
          50, width/2, height/2, width/2
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,width,height);
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Save card
  const handleSaveImage = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "quiz-result.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Share card
  const handleShareImage = (platform) => {
    html2canvas(cardRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "quiz-result.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: "My Quiz Result",
            text: `🏆 ${userName || "Player"} scored ${score}/${numQuestions} (${percentage}%) in ${category || customText}! 🎉`,
          }).catch(console.log);
        } else {
          alert(`Direct sharing not supported. Please save and share on ${platform}.`);
        }
      });
    });
  };

  return (
    <Box sx={{ textAlign: "center", maxWidth: 450, mx: "auto", position: "relative" , mt:10,}}>
      <Box
        ref={cardRef}
        sx={{
          position: "relative",
          bgcolor: "#000000bb",
          borderRadius: 4,
          boxShadow: "0px 6px 25px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Galaxy Canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top:0, left:0, width:"100%", height:"100%", zIndex:0, borderRadius:"16px" }}
        />

        {/* Top Box - Result */}
        <Box sx={{ p:4, position:"relative", zIndex:1 }}>
          <Typography variant="h3" sx={{ mb:2, animation: percentage >=60 ? `${bounceGlow} 1.5s infinite` : "none" }}>
            {celebration.icon}
          </Typography>
          <Typography variant="h6" sx={{ mb:1, fontWeight:"bold", color:"#fff" }}>
            {celebration.message} {userName || "Player"}!
          </Typography>
          <Typography variant="h5" sx={{ fontWeight:"bold", color:"#2e7d32", mb:1 }}>
            Score: {displayScore}/{numQuestions} ({percentage}%)
          </Typography>
        </Box>

        {/* Bottom Box - Icons */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ p:2, borderTop:"1px solid #444", position:"relative", zIndex:1, flexWrap:"wrap" }}>
          <Tooltip title="Save Result">
            <IconButton onClick={handleSaveImage} sx={{ color:"#FFD700" }}>
              <CameraAltIcon sx={{ fontSize:{ xs:20, sm:24, md:28 } }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Retry Quiz">
            <IconButton onClick={onRetry} sx={{ color:"#00BFFF" }}>
              <SyncIcon sx={{ fontSize:{ xs:20, sm:24, md:28 } }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on WhatsApp">
            <IconButton onClick={()=>handleShareImage("WhatsApp")} sx={{ color:"#25D366" }}>
              <WhatsAppIcon sx={{ fontSize:{ xs:20, sm:24, md:28 } }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on Facebook">
            <IconButton onClick={()=>handleShareImage("Facebook")} sx={{ color:"#1877F2" }}>
              <FacebookIcon sx={{ fontSize:{ xs:20, sm:24, md:28 } }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on Instagram">
            <IconButton onClick={()=>handleShareImage("Instagram")} sx={{ color:"#E1306C" }}>
              <InstagramIcon sx={{ fontSize:{ xs:20, sm:24, md:28 } }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
}
