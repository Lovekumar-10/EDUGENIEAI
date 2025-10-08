import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Button, IconButton } from "@mui/material";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CloseIcon from "@mui/icons-material/Close";

export default function ContributeCard({ onClose, onContribute }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)", // dark overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1500,
        padding: 0, // remove padding to center properly
        boxSizing: "border-box",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: { xs: "90vw", sm: 400, md: 360 }, // responsive width
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            background: "linear-gradient(135deg, #f3e7ff, #ffffff)",
            position: "relative",
            overflow: "visible",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              bgcolor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#f8f8f8" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <CardContent
            sx={{
              textAlign: "center",
              py: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Diversity1Icon sx={{ fontSize: 50, color: "red" }} />

            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Share Knowledge
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                px: { xs: 1, sm: 2 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                lineHeight: 1.4,
              }}
            >
              Help others, <span style={{ color: "#ff4545ff", fontWeight: 600 }}>Share</span> your{" "}
              <span style={{ color: "#ff3d71", fontWeight: 600 }}>notes</span>! <br /> 
              Your contribution strengthens our community 💪
            </Typography>

            <Button
              variant="contained"
              onClick={onContribute}
              sx={{
                mt: 2,
                bgcolor: "#6a11cb",
                backgroundImage: "linear-gradient(315deg, #6a11cb 0%, #2575fc 74%)",
                color: "white",
                fontWeight: 600,
                px: { xs: 3, sm: 4 }, // smaller on phones
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.8rem", sm: "1rem" },
                borderRadius: 3,
                "&:hover": {
                  backgroundImage: "linear-gradient(315deg, #5b0eb1 0%, #1e63d9 74%)",
                },
              }}
            >
              Upload Notes
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
