


import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { uploadPdf } from "../../api/api";
import UploadIcon from "@mui/icons-material/Upload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";

// Choice Step Component
import ChoiceStep from "./ChoiceStep";

// Summary and Flashcard components
import SummaryDisplayCard from "./SummaryDisplayCard";
import FlashcardDisplay from "./FlashcardDisplay";

export default function FileUploader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState("");
  const [pdfId, setPdfId] = useState(null);
  const [showChoice, setShowChoice] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [choices, setChoices] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = "user_123";

  const handleFileChange = (event) => {
    setError("");
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed!");
        setUploadedFile(null);
      } else {
        setUploadedFile(file);
      }
    }
  };

  const handleContinue = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    try {
      const res = await uploadPdf(uploadedFile);
      setPdfId(res.data.pdfId);
      setShowChoice(true);
      setShowSummary(false);
      setChoices(null);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSummary = () => {
    alert("Edit summary clicked");
  };

  const handleNewUpload = () => {
    setUploadedFile(null);
    setPdfId(null);
    setChoices(null);
    setShowChoice(false);
    setShowSummary(false);
    setError("");
  };

  return (
    <>
      {/* Upload Panel */}
      {!showChoice && !showSummary && (
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
            px: 2,
            py: 4,
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: "0 10px 18px rgb(0 0 0 / 0.05)",
              position: "relative",
              minHeight: 220,
              maxHeight: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Your Learning Path
              </Typography>

              {/* Entire area clickable */}
              <label style={{ width: "100%", cursor: "pointer" }}>
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="application/pdf"
                />

                <Box
                  sx={{
                    borderRadius: 3,
                    height: 150,
                    px: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "#6a11cb",
                    bgcolor: uploadedFile ? "#f0e5ff" : "transparent",
                    border: "2px dashed #ccc",
                    overflow: "hidden",
                  }}
                >
                  {uploadedFile ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <PictureAsPdfIcon sx={{ color: "#E91E63", fontSize: 32 }} />
                      <Typography
                        sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                        fontWeight={700}
                        noWrap
                      >
                        {uploadedFile.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
                        color="text.secondary"
                        noWrap
                      >
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{
                          bgcolor: "#d1c4e9",
                          borderRadius: "50%",
                          width: 56,
                          height: 40,
                          mb: 1.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 32,
                          color: "#002182ff",
                          fontWeight: "bold",
                        }}
                      >
                        <DescriptionIcon fontSize="inherit" />
                      </Box>
                      <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
                        No files uploaded yet
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        maxWidth={220}
                      >
                        Upload your PDF study material to get started
                      </Typography>
                    </>
                  )}
                  {error && (
                    <Typography variant="caption" color="error" mt={1}>
                      {error}
                    </Typography>
                  )}
                </Box>
              </label>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end", pr: 3, pb: 2 }}>
              {uploadedFile ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    px: 3,
                    textTransform: "none",
                  }}
                  onClick={handleContinue}
                  disabled={loading}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    px: 3,
                    textTransform: "none",
                  }}
                  disabled={loading}
                >
                  Upload File
                  <input type="file" hidden onChange={handleFileChange} accept="application/pdf" />
                </Button>
              )}
            </CardActions>

            {/* Loader Overlay */}
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.7)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                  borderRadius: 3,
                }}
              >
                <CircularProgress />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Uploading... Please wait
                </Typography>
              </Box>
            )}
          </Card>
        </Box>
      )}

      {/* Choice Step */}
      {showChoice && pdfId && !showSummary && (
        <Box sx={{ px: 2, mt: 4, display: "flex", justifyContent: "center" }}>
          <ChoiceStep
            onContinue={(data) => {
              setChoices(data);
              setShowSummary(true);
            }}
          />
        </Box>
      )}

      {/* Summary / Flashcards Display */}
      {showSummary && pdfId && choices && (
        <Box
          sx={{
            px: 2,
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {(choices.choiceType === "summary" || choices.choiceType === "notes") && (
            <SummaryDisplayCard
              pdfId={pdfId}
              userId={userId}
              choiceType={choices.choiceType}
              prompt={choices.prompt}
              summary={""}
              onEdit={handleEditSummary}
            />
          )}

          {choices.choiceType === "flashcards" && (
            <FlashcardDisplay
              pdfId={pdfId}
              userId={userId}
              choiceType={choices.choiceType}
              count={choices.count}
            />
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleNewUpload}
            sx={{
              mt: 2,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Upload Another File
          </Button>
        </Box>
      )}
    </>
  );
}
