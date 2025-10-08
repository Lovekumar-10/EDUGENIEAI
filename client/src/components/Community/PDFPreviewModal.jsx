// src/components/Community/PDFPreviewModal.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

export default function PDFPreviewModal({ open, handleClose, fileUrl }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    //   maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "transparent",
          boxShadow: "none",
          display: "flex",
          maxWidth:"100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        },
      }}
    >
      <DialogContent
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        sx={{
          p: 0,
          position: "relative",
          minHeight: "90vh",        // ↑ almost full screen
          height: "90vh",           // ↑ ensures full height
          width: { xs: "95%", sm: "90%", md: "85%" },
          bgcolor: "#121212",
          borderRadius: 3,
         
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: { xs: 14, sm: 16, md: 16 }, }}>
            PDF Preview
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            <CloseIcon  sx={{  fontSize: { xs: 14, sm: 16, md: 16 }, }} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* PDF Viewer */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",   // ↑ stretch iframe vertically
          }}
        >
          <iframe
            src={fileUrl}
            title="PDF Preview"
            style={{
              width: "100%",
              height: "100%",       // ↑ fill the Box
              border: "none",
              borderRadius: "0px",
              background: "#fff",
            }}
          />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Footer toolbar */}
    
    
      </DialogContent>
    </Dialog>
  );
}
