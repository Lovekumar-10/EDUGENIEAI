import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Card, CircularProgress } from "@mui/material";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SyncIcon from "@mui/icons-material/Sync";
import { getSummary } from "../../api/api";
import ProgressTimeline from "../ProgressTimeline";
import Notification from "./Notification";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function SummaryDisplayCard({ pdfId, userId, summary, onEdit, sx }) {
  const [loading, setLoading] = useState(false);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("success");

  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedSummary]);

  const handleNotif = (message, severity = "info") => {
    setNotifMessage(message);
    setNotifSeverity(severity);
    setNotifOpen(true);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayedSummary);
      handleNotif("Summary copied to clipboard!", "success");
    } catch {
      handleNotif("Failed to copy summary.", "error");
    }
  };

  // Save as TXT
  const handleSaveTXT = () => {
    if (!displayedSummary) return;
    const blob = new Blob([displayedSummary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    handleNotif("TXT saved successfully!", "success");
  };

  // Save as PDF
  const handleSavePDF = async () => {
    if (!displayedSummary) return;
    try {
      const element = document.getElementById("summary-box");
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("summary.pdf");
      handleNotif("PDF saved successfully!", "success");
    } catch {
      handleNotif("Failed to save PDF.", "error");
    }
  };

  const handleSpeedDialAction = (name) => {
    if (name === "Copy") handleCopy();
    if (name === "Save") handleSaveTXT();
    if (name === "Print") handleSavePDF();
    // Share can be implemented later
  };

  // Generate initial summary
  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const res = await getSummary(pdfId, 0, userId);
      setDisplayedSummary(res.data.summary || "");
      setChunkIndex(0);
      setTotalChunks(res.data.totalChunks || 0);
      setShowGreeting(false);
      if (res.data.totalChunks === 1) handleNotif("Summary generated successfully!", "success");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) handleNotif(err.response.data.error, "warning");
      else handleNotif("Failed to generate summary.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Load next chunk
  const handleMoreClick = async () => {
    setLoading(true);
    try {
      const nextChunk = chunkIndex + 1;
      const res = await getSummary(pdfId, nextChunk, userId);
      setDisplayedSummary(prev => prev + "\n\n" + (res.data.summary || ""));
      setChunkIndex(nextChunk);
      setTotalChunks(res.data.totalChunks || totalChunks);
      if (nextChunk + 1 === res.data.totalChunks) {
        handleNotif("🎉 All chunks summarized successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) handleNotif(err.response.data.error, "warning");
      else handleNotif("Failed to load more summary.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: 250, sm: 280, md: 300 },
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          p: 3,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: showGreeting ? "center" : "flex-start",
          ...sx,
        }}
      >
        {/* Header */}
        {!showGreeting && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 2,
              borderBottom: "1px solid #eee",
              pb: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
              Notes
            </Typography>

            <SpeedDial
              ariaLabel="Summary actions"
              direction="left"
              icon={<SpeedDialIcon />}
              sx={{
                position: 'relative',
                '& .MuiSpeedDial-fab': {
                  width: { xs: 40, sm: 50, md: 60 },
                  height: { xs: 40, sm: 50, md: 60 },
                  '& .MuiSpeedDialIcon-icon': { fontSize: { xs: 18, sm: 22, md: 26 } },
                },
                '& .MuiSpeedDialAction-fab': {
                  width: { xs: 36, sm: 44, md: 52 },
                  height: { xs: 36, sm: 44, md: 52 },
                  '& svg': { fontSize: { xs: 16, sm: 20, md: 24 } },
                },
              }}
              onMouseEnter={() => setSpeedDialOpen(true)}
              onMouseLeave={() => setSpeedDialOpen(false)}
              open={speedDialOpen}
            >
              {actions.map(action => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleSpeedDialAction(action.name)}
                />
              ))}
            </SpeedDial>
          </Box>
        )}

        {/* Greeting or Notes */}
        {showGreeting ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 3, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
            >
              Ready to generate your notes?
            </Typography>
            <Button
              variant="contained"
              onClick={handleGenerateClick}
              disabled={loading}
              startIcon={loading && <CircularProgress size={18} color="inherit" />}
              sx={{ px: 3, py: 1.2, fontWeight: "bold" }}
            >
              {loading ? "Generating..." : "Generate Notes"}
            </Button>
          </Box>
        ) : (
          <>
            <Box
              id="summary-box"
              ref={scrollRef}
              sx={{
                flexGrow: 1,
                width: "100%",
                maxHeight: 400,
                pr: 1,
                overflowY: "auto",
                mb: 1,
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={materialLight}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props}>{children}</code>
                    );
                  },
                }}
              >
                {displayedSummary || "No notes available."}
              </ReactMarkdown>
            </Box>

            {/* Bottom Controls */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ProgressTimeline current={chunkIndex + 1} total={totalChunks} />
              <Button
                variant="contained"
                size="small"
                onClick={handleMoreClick}
                disabled={loading || chunkIndex + 1 >= totalChunks}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SyncIcon />}
                sx={{
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                  px: { xs: 1.5, sm: 2 },
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                {loading ? "Loading..." : "More Notes"}
              </Button>
            </Box>
          </>
        )}
      </Card>

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





