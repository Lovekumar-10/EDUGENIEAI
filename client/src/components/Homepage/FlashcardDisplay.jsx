








// import React, { useState, useEffect, useRef } from "react";
// import { Box, Button, Typography, Card, useMediaQuery } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";

// import { getFlashcards } from "../../api/api";
// import ProgressTimeline from "../ProgressTimeline";
// import Notification from "./Notification";

// export default function FlashcardDisplay({ pdfId, userId, count }) {
//   const isBelow660 = useMediaQuery("(max-width:660px)");
//   const scrollRef = useRef(null);
//   const autoPlayRef = useRef(null);

//   const [flashcards, setFlashcards] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [chunkIndex, setChunkIndex] = useState(0);
//   const [totalChunks, setTotalChunks] = useState(0);

//   const [loading, setLoading] = useState(false);
//   const [flipped, setFlipped] = useState(false);
//   const [autoPlay, setAutoPlay] = useState(false);
//   const [showFlashcards, setShowFlashcards] = useState(false);
//   const [userCount, setUserCount] = useState(count);

//   const [notifOpen, setNotifOpen] = useState(false);
//   const [notifMessage, setNotifMessage] = useState("");
//   const [notifSeverity, setNotifSeverity] = useState("success");

//   // Notification helper
//   const handleNotif = (message, severity = "info") => {
//     setNotifMessage(message);
//     setNotifSeverity(severity);
//     setNotifOpen(true);
//   };

//   // Auto-scroll when flashcards change
//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [currentIndex]);



// // Auto-play effect (question → show answer → next card)
// useEffect(() => {
//   if (autoPlay && flashcards.length > 0) {
//     let step = 0; // track if showing question or answer

//     const showNext = () => {
//       if (step === 0) {
//         // 1️ Show question
//         setFlipped(false);
//         step = 1;
//         // After 2 sec, flip to answer
//         setTimeout(() => {
//           setFlipped(true);
//         }, 2000);
//       } else {
//         // 2️ Move to next card after 3 sec of answer
//         setTimeout(() => {
//           setFlipped(false);
//           setCurrentIndex((prev) => {
//             if (prev === flashcards.length - 1) {
//               stopAutoPlay();
//               return prev;
//             }
//             return prev + 1;
//           });
//         }, 3000);
//         step = 0;
//       }
//     };

//     showNext(); // start immediately
//     autoPlayRef.current = setInterval(showNext, 5000);

//   } else {
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//       autoPlayRef.current = null;
//     }
//   }

//   return () => {
//     if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//   };
// }, [autoPlay, flashcards.length]);




//   // Generate initial flashcards
//   const handleGenerate = async () => {
//     setLoading(true);
//     try {
//       const res = await getFlashcards(pdfId, 0, userId, count);
//       const fetchedFlashcards = res.data?.flashcards || [];

//       if (fetchedFlashcards.length === 0) {
//         handleNotif("No flashcards found.", "info");
//       } else {
//         handleNotif("Flashcards generated successfully!", "success");
//       }

//       setFlashcards(fetchedFlashcards);
//       setCurrentIndex(0);
//       setChunkIndex(0);
//       setTotalChunks(res.data.totalChunks || 0);
//       setShowFlashcards(true);
//     } catch (err) {
//       console.error(err);
//       setFlashcards([]);
//       setCurrentIndex(0);
//       setChunkIndex(0);
//       setShowFlashcards(true);
//       handleNotif("Failed to generate flashcards.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load next chunk
//   const handleMoreClick = async () => {
//     if (chunkIndex + 1 >= totalChunks) {
//       handleNotif("🎉 All flashcards are already loaded!", "info");
//       return;
//     }

//     setLoading(true);
//     try {
//       const nextChunk = chunkIndex + 1;
//       const res = await getFlashcards(pdfId, nextChunk, userId, count);
//       const nextFlashcards = res.data?.flashcards || [];

//       if (nextFlashcards.length === 0) {
//         handleNotif("No more flashcards available.", "info");
//       } else {
//         setFlashcards((prev) => [...prev, ...nextFlashcards]);
//         setCurrentIndex(flashcards.length); // jump to first card of new chunk
//         setChunkIndex(nextChunk);
//         setTotalChunks(res.data.totalChunks || totalChunks);

//         if (nextChunk + 1 === res.data.totalChunks) {
//           handleNotif("🎉 You’ve reached the last chunk!", "success");
//         } else {
//           handleNotif("More flashcards loaded!", "success");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       handleNotif("Failed to load more flashcards.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrev = () => {
//     setFlipped(false);
//     setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
//     stopAutoPlay();
//   };

//   const handleNext = () => {
//     setFlipped(false);
//     setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
//     stopAutoPlay();
//   };

//   const toggleAutoPlay = () => setAutoPlay((prev) => !prev);
//   const stopAutoPlay = () => {
//     setAutoPlay(false);
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//       autoPlayRef.current = null;
//     }
//   };

//   const card = flashcards[currentIndex];

//   return (
//     <>
//       <Card
//         sx={{
//           width: "100%",
//           minHeight: 400,
//           borderRadius: 3,
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//         }}
//       >
//         {!showFlashcards ? (
//           <>
//             <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
//               Ready to generate your flashcards?
//             </Typography>
//             <Button variant="contained" onClick={handleGenerate} disabled={loading}>
//               {loading ? "Generating..." : "Generate Flashcards"}
//             </Button>
//           </>
//         ) : flashcards.length === 0 ? (
//           <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
//             No flashcards found.
//           </Typography>
//         ) : (
//           <>
//             <Box
//               ref={scrollRef}
//               sx={{
//                 flex: 1,
//                 width: "100%",
//                 maxHeight: 400,
//                 overflowY: "auto",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 mb: 2,
//                 cursor: "pointer",
//               }}
//               onClick={() => setFlipped((f) => !f)}
//             >
//               <Box
//                 sx={{
//                   width: 380,
//                   height: 230,
//                   borderRadius: 3,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   fontSize: "1.3rem",
//                   color: flipped ? "#ffeb3b" : "#ffffffff",
//                   bgcolor: flipped ? "#003455ae" : "#002747af",
//                   transformStyle: "preserve-3d",
//                   transition: "transform 0.8s, color 0.3s",
//                   transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
//                   position: "relative",
//                 }}
//               >
//                 <Box sx={{ position: "absolute", width: "90%", backfaceVisibility: "hidden" }}>
//                   {card?.question}
//                 </Box>
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     width: "90%",
//                     transform: "rotateY(180deg)",
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {card?.answer}
//                 </Box>
//               </Box>
//             </Box>

//             {/* Navigation & Progress */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-evenly",
//                 alignItems: "center",
//                 gap: 1.5,
//                 mb: 2,
//               }}
//             >
//               <ProgressTimeline current={chunkIndex + 1} total={totalChunks} />

//               <Button onClick={handlePrev}>
//                 <ArrowBackIosNewIcon fontSize="small" />
//               </Button>
//               <Typography>
//                 {currentIndex + 1} / {flashcards.length}
//               </Typography>
//               <Button onClick={handleNext}>
//                 <ArrowForwardIosIcon fontSize="small" />
//               </Button>
//               <Button variant="outlined" onClick={toggleAutoPlay}>
//                 {autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
//               </Button>

//               <Button
//                 variant="contained"
//                 onClick={handleMoreClick}
//                 disabled={loading || flashcards.length === 0 || chunkIndex + 1 >= totalChunks}
//               >
//                 {loading ? "Loading..." : "More Flashcards"}
//               </Button>
//             </Box>
//           </>
//         )}
//       </Card>

//       {/* Notification */}
//       <Notification
//         open={notifOpen}
//         message={notifMessage}
//         severity={notifSeverity}
//         onClose={() => setNotifOpen(false)}
//       />
//     </>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Card, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { getFlashcards } from "../../api/api";
import ProgressTimeline from "../ProgressTimeline";
import Notification from "./Notification";

export default function FlashcardDisplay({ pdfId, userId, count }) {
  const isMobile = useMediaQuery("(max-width:660px)");
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);

  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("success");

  const handleNotif = (message, severity = "info") => {
    setNotifMessage(message);
    setNotifSeverity(severity);
    setNotifOpen(true);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [currentIndex]);

  // Auto-play question → answer → next
  useEffect(() => {
    if (autoPlay && flashcards.length > 0) {
      let step = 0;

      const showNext = () => {
        if (step === 0) {
          setFlipped(false);
          step = 1;
          setTimeout(() => setFlipped(true), 2000);
        } else {
          setTimeout(() => {
            setFlipped(false);
            setCurrentIndex((prev) => {
              if (prev === flashcards.length - 1) {
                stopAutoPlay();
                return prev;
              }
              return prev + 1;
            });
          }, 3000);
          step = 0;
        }
      };

      showNext();
      autoPlayRef.current = setInterval(showNext, 5000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, flashcards.length]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await getFlashcards(pdfId, 0, userId, count);
      const fetchedFlashcards = res.data?.flashcards || [];
      if (!fetchedFlashcards.length) handleNotif("No flashcards found.", "info");
      else handleNotif("Flashcards generated successfully!", "success");
      setFlashcards(fetchedFlashcards);
      setCurrentIndex(0);
      setChunkIndex(0);
      setTotalChunks(res.data.totalChunks || 0);
      setShowFlashcards(true);
    } catch (err) {
      console.error(err);
      handleNotif("Failed to generate flashcards.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMoreClick = async () => {
    if (chunkIndex + 1 >= totalChunks) {
      handleNotif("🎉 All flashcards are already loaded!", "info");
      return;
    }
    setLoading(true);
    try {
      const nextChunk = chunkIndex + 1;
      const res = await getFlashcards(pdfId, nextChunk, userId, count);
      const nextFlashcards = res.data?.flashcards || [];
      if (!nextFlashcards.length) handleNotif("No more flashcards available.", "info");
      else {
        setFlashcards((prev) => [...prev, ...nextFlashcards]);
        setCurrentIndex(flashcards.length);
        setChunkIndex(nextChunk);
        setTotalChunks(res.data.totalChunks || totalChunks);
        handleNotif(
          nextChunk + 1 === res.data.totalChunks ? "🎉 Last chunk reached!" : "More flashcards loaded!",
          "success"
        );
      }
    } catch (err) {
      console.error(err);
      handleNotif("Failed to load more flashcards.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
    stopAutoPlay();
  };
  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
    stopAutoPlay();
  };
  const toggleAutoPlay = () => setAutoPlay((prev) => !prev);
  const stopAutoPlay = () => {
    setAutoPlay(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const card = flashcards[currentIndex];

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: 400,
          borderRadius: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {!showFlashcards ? (
          <>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
              Ready to generate your flashcards?
            </Typography>
            <Button variant="contained" onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate Flashcards"}
            </Button>
          </>
        ) : flashcards.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
            No flashcards found.
          </Typography>
        ) : (
          <>
            {/* Flashcard */}
            <Box
              ref={scrollRef}
              sx={{
                flex: 1,
                width: "100%",
                maxHeight: 400,
                overflowY: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => setFlipped((f) => !f)}
            >
              <Box
                sx={{
                  width: isMobile ? "100%" : 380,
                  maxWidth: 380,
                  height: 230,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  color: flipped ? "#ffeb3b" : "#ffffffff",
                  bgcolor: flipped ? "#003455ae" : "#002747af",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s, color 0.3s",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", width: "90%", backfaceVisibility: "hidden" }}>
                  {card?.question}
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "90%",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {card?.answer}
                </Box>
              </Box>
            </Box>

            {/* Navigation & Progress */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <ProgressTimeline current={chunkIndex + 1} total={totalChunks} />

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
                <Button onClick={handlePrev}>
                  <ArrowBackIosNewIcon fontSize="small" />
                </Button>
                <Typography>
                  {currentIndex + 1} / {flashcards.length}
                </Typography>
                <Button onClick={handleNext}>
                  <ArrowForwardIosIcon fontSize="small" />
                </Button>
                <Button variant="outlined" onClick={toggleAutoPlay}>
                  {autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleMoreClick}
                  disabled={loading || flashcards.length === 0 || chunkIndex + 1 >= totalChunks}
                >
                  {loading ? "Loading..." : "More Flashcards"}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Card>

      <Notification
        open={notifOpen}
        message={notifMessage}
        severity={notifSeverity}
        onClose={() => setNotifOpen(false)}
      />
    </>
  );
}
