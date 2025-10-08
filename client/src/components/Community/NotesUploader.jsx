
// // src/components/Community/NotesUploader.jsx
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Card,
//   CardContent,
//   MenuItem,
// } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { uploadCommunityNote } from "../../api/api"; // your API function
// import Notification from "../Homepage/Notification"; // notification component
// import CategorySelector from "./CategorySelector";

// export default function NotesUploader({ onUpload }) {
//   const [file, setFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [uploaderName, setUploaderName] = useState("");

//   const [loading, setLoading] = useState(false);     // to disable button
//   const [progress, setProgress] = useState(0);       // for upload progress

//   // Category states
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");

//   // Notification state
//   const [notif, setNotif] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const showNotification = (message, severity = "success") => {
//     setNotif({ open: true, message, severity });
//   };


//   const handleFileChange = (e) => {
//   const selectedFile = e.target.files[0];
//   if (!selectedFile) return;

//   if (selectedFile.type !== "application/pdf") {
//     alert("Please select a PDF file");
//     return;
//   }

//   if (selectedFile.size > 10 * 1024 * 1024) { // 10 MB limit
//     alert("File too large. Max 10 MB allowed.");
//     return;
//   }

//   setFile(selectedFile);
//   setUploadedFile(null);
// };


//   // Upload PDF to backend

// const handleUpload = async () => {
//   if (!file) return showNotification("Please select a PDF file", "error");
//   if (!uploaderName) return showNotification("Please enter your name", "error");
//   if (!title) return showNotification("Please enter a topic or book name", "error");

//   try {
//     setLoading(true);   // disable button
//     setProgress(0);     // reset progress

//     // Use API function that builds FormData internally
//     const res = await uploadCommunityNote(
//       {
//         file,
//         name: uploaderName,
//         title,
//         category,
//         subCategory,
//         tags,
//       },
//       {
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress(percent);
//         },
//       }
//     );

//     setUploadedFile(res.data.note);
//     showNotification("Note uploaded successfully!", "success");

//     // Reset fields
//     setFile(null);
//     setTitle("");
//     setCategory("");
//     setSubCategory("");
//     setTags("");
//     setUploaderName("");
//     setProgress(0);

//     if (onUpload) onUpload(res.data.note);

//   } catch (err) {
//     console.error("Upload failed:", err);
//     showNotification("Upload failed. Please try again.", "error");
//     setProgress(0);
//   } finally {
//     setLoading(false);
//   }
// };





//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "center", px: 0, py: 0 }}>
//         <Card
//           sx={{
//             width: "100%",
//             maxWidth: 600,
//             borderRadius: 3,
//             boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
//             overflow: "hidden",
//           }}
//         >
//           <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
//             <Typography variant="h6" fontWeight={700} textAlign="center">
//               Upload Your Note
//             </Typography>

//             <TextField
//               label="Your Name"
//               placeholder="Lovekumar"
//               value={uploaderName}
//               onChange={(e) => setUploaderName(e.target.value)}
//               fullWidth
//               variant="filled"
//             />

//             <TextField
//               label="Topic or Books Name"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               fullWidth
//               variant="filled"
//               placeholder="E.g., NCERT Physics,  Algebra, Computer Networks, DBMS"
  
//             />

//             {/* Category Selector */}
//             <CategorySelector
//               category={category}
//               subCategory={subCategory}
//               setCategory={setCategory}
//               setSubCategory={setSubCategory}
//             />

//             <TextField
//               label="Tags"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               fullWidth
//               variant="filled"
//               placeholder="E.g. Algebra"
//               helperText="Add keywords for easy search"
//             />

//             {/* Uploaded File Preview */}
//             {uploadedFile && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   p: 1.5,
//                   borderRadius: 2,
//                   bgcolor: "#d4edda",
//                   color: "#155724",
//                 }}
//               >
//                 <CheckCircleOutlineIcon />
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="body1" noWrap>
//                     {uploadedFile.title}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Uploaded by {uploadedFile.name} on{" "}
//                     {new Date(uploadedFile.createdAt).toLocaleDateString()}
//                   </Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: "#28a745", "&:hover": { bgcolor: "#218838" } }}
//                   onClick={() => window.open(uploadedFile.fileUrl, "_blank")}
//                 >
//                   Open
//                 </Button>
//               </Box>
//             )}

//             {/* Choose PDF + Upload Button */}
//             {!uploadedFile && (
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   sx={{
//                     flex: 1,
//                     borderRadius: 2,
//                     borderColor: "#3494fb",
//                     color: "#3494fb",
//                     bgcolor: "#eff8ff",
//                     fontWeight: 600,
//                     "&:hover": { bgcolor: "#e1f0ff", borderColor: "#217fe6" },
//                   }}
//                 >
//                   <UploadFileIcon sx={{ mr: 1 }} />
//                   {file ? file.name : "Choose PDF"}
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     hidden
//                     onChange={handleFileChange}
//                   />
//                 </Button>

//                 {file && (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       flex: 1,
//                       bgcolor: "#3494fb",
//                       color: "white",
//                       fontWeight: 600,
//                       borderRadius: 2,
//                       "&:hover": { bgcolor: "#217fe6" },
//                     }}
//                     onClick={handleUpload}
//                     disabled={loading} 
//                   >
//                     {loading ? `Uploading... ${progress}%` : "Upload"}
//                   </Button>
//                 )}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </Box>

//       <Notification
//         open={notif.open}
//         message={notif.message}
//         severity={notif.severity}
//         onClose={() => setNotif({ ...notif, open: false })}
//       />
//     </>
//   );
// }

























// // src/components/Community/NotesUploader.jsx
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { uploadCommunityNote } from "../../api/api";
// import Notification from "../Homepage/Notification";
// import CategorySelector from "./CategorySelector";

// export default function NotesUploader({ onUpload }) {
//   const [file, setFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [uploaderName, setUploaderName] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [notif, setNotif] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const showNotification = (message, severity = "success") => {
//     setNotif({ open: true, message, severity });
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     if (selectedFile.type !== "application/pdf") {
//       alert("Please select a PDF file");
//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) {
//       alert("File too large. Max 10 MB allowed.");
//       return;
//     }

//     setFile(selectedFile);
//     setUploadedFile(null);
//   };

//   const handleUpload = async () => {
//     if (!file) return showNotification("Please select a PDF file", "error");
//     if (!uploaderName) return showNotification("Please enter your name", "error");
//     if (!title) return showNotification("Please enter a topic or book name", "error");

//     try {
//       setLoading(true);

//       const res = await uploadCommunityNote({
//         file,
//         name: uploaderName,
//         title,
//         category,
//         subCategory,
//         tags,
//       });

//       setUploadedFile(res.data.note);
//       showNotification("Note uploaded successfully!", "success");

//       // Reset fields
//       setFile(null);
//       setTitle("");
//       setCategory("");
//       setSubCategory("");
//       setTags("");
//       setUploaderName("");

//       if (onUpload) onUpload(res.data.note);
//     } catch (err) {
//       console.error("Upload failed:", err);
//       showNotification("Upload failed. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "center", px: 0, py: 0 }}>
//         <Card
//           sx={{
//             width: "100%",
//             maxWidth: 600,
//             borderRadius: 3,
//             boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
//             overflow: "hidden",
//           }}
//         >
//           <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
//             <Typography variant="h6" fontWeight={700} textAlign="center">
//               Upload Your Note
//             </Typography>

//             <TextField
//               label="Your Name"
//               placeholder="Lovekumar"
//               value={uploaderName}
//               onChange={(e) => setUploaderName(e.target.value)}
//               fullWidth
//               variant="filled"
//             />

//             <TextField
//               label="Topic or Books Name"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               fullWidth
//               variant="filled"
//               placeholder="E.g., NCERT Physics, Algebra, Computer Networks, DBMS"
//             />

//             <CategorySelector
//               category={category}
//               subCategory={subCategory}
//               setCategory={setCategory}
//               setSubCategory={setSubCategory}
//             />

//             <TextField
//               label="Tags"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               fullWidth
//               variant="filled"
//               placeholder="E.g. Algebra"
//               helperText="Add keywords for easy search"
//             />

           

//             {!uploadedFile && (
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   sx={{
//                     flex: 1,
//                     borderRadius: 2,
//                     borderColor: "#3494fb",
//                     color: "#3494fb",
//                     bgcolor: "#eff8ff",
//                     fontWeight: 600,
//                     "&:hover": { bgcolor: "#e1f0ff", borderColor: "#217fe6" },
//                   }}
//                 >
//                   <UploadFileIcon sx={{ mr: 1 }} />
//                   {file ? file.name : "Choose PDF"}
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     hidden
//                     onChange={handleFileChange}
//                   />
//                 </Button>

//                 {file && (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       flex: 1,
//                       bgcolor: "#3494fb",
//                       color: "white",
//                       fontWeight: 600,
//                       borderRadius: 2,
//                       "&:hover": { bgcolor: "#217fe6" },
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 1,
//                     }}
//                     onClick={handleUpload}
//                     disabled={loading}
//                   >
//                     {loading && <CircularProgress size={20} color="inherit" />}
//                     {loading ? "Uploading..." : "Upload"}
//                   </Button>
//                 )}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </Box>

//       <Notification
//         open={notif.open}
//         message={notif.message}
//         severity={notif.severity}
//         onClose={() => setNotif({ ...notif, open: false })}
//       />
//     </>
//   );
// }







// src/components/Community/NotesUploader.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { uploadCommunityNote } from "../../api/api";
import Notification from "../Homepage/Notification";
import CategorySelector from "./CategorySelector";

export default function NotesUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [notif, setNotif] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showNotification = (message, severity = "success") => {
    setNotif({ open: true, message, severity });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File too large. Max 10 MB allowed.");
      return;
    }

    setFile(selectedFile);
    setUploadedFile(null);
  };

  const handleUpload = async () => {
    if (!file) return showNotification("Please select a PDF file", "error");
    if (!uploaderName) return showNotification("Please enter your name", "error");
    if (!title) return showNotification("Please enter a topic or book name", "error");

    try {
      setLoading(true);

      const res = await uploadCommunityNote({
        file,
        name: uploaderName,
        title,
        category,
        subCategory,
        tags,
      });

      const noteData = res.data.note || res.data;

      // Show notification first
      showNotification(res.data.message || "Thanks you , Notes uploaded successfully!", "success");

      setUploadedFile(noteData);

      // Reset fields
      setFile(null);
      setTitle("");
      setCategory("");
      setSubCategory("");
      setTags("");
      setUploaderName("");

      if (onUpload) onUpload(noteData);
    } catch (err) {
      console.error("Upload failed:", err);
      showNotification("Upload failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", px: 0, py: 0 }}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 3,
            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" fontWeight={700} textAlign="center">
              Upload Your Note
            </Typography>

            <TextField
              label="Your Name"
              placeholder="Lovekumar"
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
              fullWidth
              variant="filled"
            />

            <TextField
              label="Topic or Books Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="filled"
              placeholder="E.g., NCERT Physics, Algebra, Computer Networks, DBMS"
            />

            <CategorySelector
              category={category}
              subCategory={subCategory}
              setCategory={setCategory}
              setSubCategory={setSubCategory}
            />

            <TextField
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              fullWidth
              variant="filled"
              placeholder="E.g. Algebra"
              helperText="Add keywords for easy search"
            />

            {/* Uploaded File Preview */}

            {!uploadedFile && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    borderColor: "#3494fb",
                    color: "#3494fb",
                    bgcolor: "#eff8ff",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#e1f0ff", borderColor: "#217fe6" },
                  }}
                >
                  <UploadFileIcon sx={{ mr: 1 }} />
                  {file ? file.name : "Choose PDF"}
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>

                {file && (
                  <Button
                    variant="contained"
                    sx={{
                      flex: 1,
                      bgcolor: "#3494fb",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: 2,
                      "&:hover": { bgcolor: "#217fe6" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading && <CircularProgress size={20} color="inherit" />}
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Notification
        open={notif.open}
        message={notif.message}
        severity={notif.severity}
        onClose={() => setNotif({ ...notif, open: false })}
      />
    </>
  );
}
