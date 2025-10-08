
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from "@mui/icons-material/Share";
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


// SpeedDial actions
const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save txt" },
  { icon: <DownloadIcon />, name: "Download pdf" },

];

export default function SummaryDisplayCard({ pdfId, userId, sx ,choiceType, prompt,}) {
  const [loading, setLoading] = useState(false);
  
  const [chunkIndex, setChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("success");

  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const isBelow660 = useMediaQuery("(max-width:660px)");
  const scrollRef = useRef(null);

  // Auto-scroll when new summary content is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedSummary]);

  // Notification helper
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

  // Save as PDF (multi-page)
  // const handleSavePDF = async () => {
  //   if (!displayedSummary) return;

  //   try {
  //     const element = document.getElementById("summary-box");

  //     // Clone element to capture full content
  //     const clone = element.cloneNode(true);
  //     clone.style.height = "auto";
  //     clone.style.maxHeight = "none";
  //     clone.style.overflow = "visible";
  //     clone.style.position = "absolute";
  //     clone.style.top = "-9999px";
  //     document.body.appendChild(clone);

  //     const canvas = await html2canvas(clone, { scale: 2 });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const margin = 20;

  //     const imgWidth = pdfWidth - margin * 2;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = margin;

  //     pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
  //     heightLeft -= pdfHeight - margin * 2;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight + margin;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
  //       heightLeft -= pdfHeight - margin * 2;
  //     }

  //     pdf.save("notes.pdf");
  //     document.body.removeChild(clone);
  //     handleNotif("PDF saved successfully!", "success");
  //   } catch (err) {
  //     console.error(err);
  //     handleNotif("Failed to save PDF.", "error");
  //   }
  // };

  // Save as PDF (multi-page, Word-style)
const handleSavePDF = async () => {
  if (!displayedSummary) return;

  try {
    const element = document.getElementById("summary-box");

    // Clone element to capture full content with clean styles
    const clone = element.cloneNode(true);
    clone.style.width = "800px";                // fixed width for A4
    clone.style.padding = "40px";               // default Word-like margin
    clone.style.backgroundColor = "#fff";       // white background
    clone.style.color = "#000";                 // text color
    clone.style.fontFamily = "Arial, sans-serif"; // readable font
    clone.style.fontSize = "12pt";              // normal font size
    clone.style.lineHeight = "1.5";             // line spacing
    clone.style.maxHeight = "none";
    clone.style.overflow = "visible";
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    
    // Add spacing between paragraphs
    clone.querySelectorAll("p").forEach(p => p.style.marginBottom = "12pt");

    document.body.appendChild(clone);

    // Capture as canvas
    const canvas = await html2canvas(clone, { scale:1.5 });
    const imgData = canvas.toDataURL("image/jpeg",0.8);


    const pdf = new jsPDF("p", "pt", "a4"); // portrait, points, A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40; // matches padding

    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin;

    // First page
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - margin * 2;

    // Remaining pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - margin * 2;
    }

    pdf.save("notes.pdf");
    document.body.removeChild(clone);
    handleNotif("PDF saved successfully!", "success");
  } catch (err) {
    console.error(err);
    handleNotif("Failed to save PDF.", "error");
  }
};

  // SpeedDial action handler
  const handleSpeedDialAction = (name) => {
    if (name === "Copy") handleCopy();
    if (name === "Save") handleSaveTXT();
    if (name === "Print") handleSavePDF();
  };


  const handleGenerateClick = async () => {
  setLoading(true);
  try {
    // send selected prompt to backend
    const res = await getSummary(pdfId, 0, userId, {
      subChoice: choiceType, // the type: "summary" or "notes"
      customInput: prompt,    // the actual text user selected/wrote
    });

    setDisplayedSummary(res.data.summary || "");
    setChunkIndex(0);
    setTotalChunks(res.data.totalChunks || 0);
    setShowGreeting(false);

    if (res.data.totalChunks === 1)
      handleNotif(
        `${choiceType.charAt(0).toUpperCase() + choiceType.slice(1)} generated successfully!`,
        "success"
      );
  } catch (err) {
    console.error(err);
    if (err.response?.status === 403) handleNotif(err.response.data.error, "warning");
    else
      handleNotif(
        `Oops! Something went wrong while generating your ${choiceType}.`,
        "error"
      );
  } finally {
    setLoading(false);
  }
};

  const handleMoreClick = async () => {
  setLoading(true);
  try {
    const nextChunk = chunkIndex + 1;

    // Send the same prompt and choiceType for all remaining chunks
    const res = await getSummary(pdfId, nextChunk, userId, {
      subChoice: choiceType, // "summary" or "notes"
      customInput: prompt,    // previously selected/written prompt
    });

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
          px: { xs: 1, sm: 3, md: 3 },
          py: { xs: 1, sm: 3, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          ...sx,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 2,
            pb: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
            {choiceType && choiceType.charAt(0).toUpperCase() + choiceType.slice(1)} 

          </Typography>

          <SpeedDial
            ariaLabel="Summary actions"
            direction={isBelow660 ? "down" : "left"}
            icon={<SpeedDialIcon />}
            sx={{
              position: "absolute",
              top: { xs: 3, sm: 5, md: 1 },
              right: { xs: -5, sm: 4, md: 10 },
              "& .MuiSpeedDial-fab": {
                width: { xs: 35, sm: 50, md: 50 },
                height: { xs: 35, sm: 50, md: 50 },
                "& .MuiSpeedDialIcon-icon": { fontSize: { xs: 18, sm: 22, md: 22 } },
              },
              "& .MuiSpeedDialAction-fab": {
                width: { xs: 34, sm: 44, md: 45 },
                height: { xs: 34, sm: 44, md: 45 },
                "& svg": { fontSize: { xs: 16, sm: 20, md: 24 } },
              },
            }}
            onMouseEnter={() => setSpeedDialOpen(true)}
            onMouseLeave={() => setSpeedDialOpen(false)}
            open={speedDialOpen}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleSpeedDialAction(action.name)}
              />
            ))}
          </SpeedDial>
        </Box>

        {/* Summary / Greeting */}
        <Box
          id="summary-box"
          ref={scrollRef}
          sx={{
            flexGrow: 1,
            width: "100%",
            maxHeight: 400,
            pr:1,
            overflowY: "auto", 
            mb: 1,
          }}
        >
          {showGreeting ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                  mb: 2,
                }}
              >
                Ready to generate your {choiceType && choiceType.charAt(0).toUpperCase() + choiceType.slice(1)} ?
              </Typography>

              <Button
                variant="contained"
                onClick={handleGenerateClick}
                disabled={loading}
                startIcon={loading && <CircularProgress size={18} color="inherit" />}
                sx={{
                  px: { xs: 1.5, sm: 2, md: 2 },
                  py: { xs: 0.8, sm: 1.2, md: 1.5 },
                  fontWeight: "bold",
                  fontSize: { xs: 8, sm: 8, md: 13 },
                }}
              >
                {loading ? "Generating..." : `Generate ${choiceType && choiceType.charAt(0).toUpperCase() + choiceType.slice(1)}`}
              </Button>
            </Box>
          ) : (
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
          )}
        </Box>

        {/* Bottom controls */}
        {!showGreeting && (
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
              {loading ? "Loading..." : "More Summary"}
            </Button>
          </Box>
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
