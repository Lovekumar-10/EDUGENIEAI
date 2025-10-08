import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { forwardRef } from "react";

// Forward ref so parent can use it if needed
const Notification = forwardRef(({ open, message, severity, onClose }, ref) => {
  return (
    <Snackbar
      ref={ref}
      open={open}
      autoHideDuration={5000} // 3 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity || "success"}
        variant="filled" // ✅ make it filled
        sx={{ width: "100%", fontWeight: "bold", fontSize: "0.9rem" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});

export default Notification;
