import React, { useRef, useEffect } from "react";
import { Box, Container, Button, Typography, IconButton } from "@mui/material";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

import { Tooltip } from "@mui/material"; 
import Footer from "../components/Homepage/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import { useNavigate } from "react-router-dom"; 

export default function MindMapCreator() {
  const tldrawAppRef = useRef(null);
  const navigate = useNavigate(); 

  // Optional: add some sample shapes when component mounts
  useEffect(() => {
    const app = tldrawAppRef.current;
    if (!app) return;

    // Clear previous shapes just in case
    app.resetDocument();

    // Add sample nodes

  }, []);

  return (
    <Box sx={{ bgcolor: "#f3f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Back Button */}
      <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 1000 }}>
        <Tooltip title="Go Back" arrow>
            <IconButton 
              onClick={() => navigate(-1)} // goes back to previous page
                sx={{
                 bgcolor: "#fff",
                    "&:hover": { bgcolor: "#e0e0e0" },
                    boxShadow: 2
                 }}
             >
          <ArrowBackIcon />
            </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, pt:1 , pb:0}}>
        {/* Canvas Preview */}
        <Box
          sx={{
            border: "2px solid #31313150",
            borderRadius: 2,
            height: "75vh",
            backgroundColor: "#f9f9f9",
            backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            boxShadow: "0 4px 12px rgba(56, 55, 55, 0.23)",
            mb: 4,
            
          }}
        >
          <Tldraw 
            licenseKey="tldraw-2026-01-17/WyJYUU1YY1FRVCIsWyIqIl0sMTYsIjIwMjYtMDEtMTciXQ.Bcq5u8a2aJzXMZg1Rr3VulW5hY68z3Dbm0KpQub38ur0bwFxxHEtF8G4KwVpZtTSjxkjUeLfQB6JQlqhrwn2ug"
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
            onMount={(app) => {
              tldrawAppRef.current = app;
              
            }}
          />
        </Box>
   ,
        <Typography variant="h1" sx={{ textAlign:"center",  fontSize: {
      xs: "2rem",   // small screens
      sm: "2.5rem", // medium screens
      md: "2rem",   // large screens

    }, fontWeight: 900,  background: "linear-gradient(90deg, #ff0080, #ffbf00ff, #e0c513a5)", WebkitBackgroundClip: "text", color: "transparent" }}>
            Create with<span style={{ color: "rgba(101, 0, 155, 1)", marginLeft: "0.3rem" }}>-EduGenie</span>Ai
        </Typography>
      </Container>

      <Footer />
    </Box>
  );
}


