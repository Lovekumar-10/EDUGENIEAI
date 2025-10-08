import React from "react";
import { Box } from "@mui/material";

const PDFThumbnail = ({ fileUrl }) => {
  return (
    <Box
      sx={{
        width: '100vw',       // full width of screen
        height: '100vh',      // full height of screen
        overflow: 'hidden',   // hide any overflow
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f6f9fb',
      }}
    >
      <Box
        component="iframe"
        src={fileUrl}
        title="PDF Preview"
        sx={{
          width: "100%",
          height: "100%",
          border: "none",
          overflow: 'hidden',     // hides iframe scrollbars
              "&::-webkit-scrollbar": { display: 'none' }, // Chrome, Safari
          scrollbarWidth: 'none', // Firefox
        }}
      />
    </Box>
  );
};

export default PDFThumbnail;
