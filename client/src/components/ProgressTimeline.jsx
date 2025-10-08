import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

const ProgressTimeline = ({ current, total }) => {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        Progress: {current} / {total} chunks
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mt: 1 }} />
    </Box>
  );
};

export default ProgressTimeline;
