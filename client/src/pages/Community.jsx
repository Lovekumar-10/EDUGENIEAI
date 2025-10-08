


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
//   Chip,
//   Drawer,
//   IconButton,
//   MenuItem,
//   Tooltip,
//   Dialog,
//   CircularProgress,
// } from '@mui/material';
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { motion } from "framer-motion";


// import TuneIcon from '@mui/icons-material/Tune';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import DownloadIcon from '@mui/icons-material/Download';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// import { fetchCommunityNotes } from '../api/api';

// import AppNavbar from '../components/Homepage/AppNavbar';
// import Footer from '../components/Homepage/Footer';
// import PDFPreviewModal from '../components/Community/PDFPreviewModal';
// import NotesUploader from "../components/Community/NotesUploader";
// import PDFThumbnail from '../components/Community/PDFThumbnail';

// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

// const categories = {
//   Academic: [
//     "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
//     "BA", "B.Sc", "B.Com", "BCA", "B.Tech", "BBA", "LLB", "BVSc", "B.Pharm", "B.Des",
//     "MA", "M.Sc", "M.Com", "MBA", "MCA", "M.Tech", "LLM", "M.Pharm", "M.Des", "PH.D", "Others"
//   ],
//   "Competitive Exams": [
//     "UPSC", "SSC", "Banking", "Railway", "NDA", "CDS", "JEE", "NEET", "GATE", "CAT", "Others"
//   ],
//   Coding: [
//     "C", "C++", "C#", "Java", "Python", "Go", "Rust", "Ruby", "Swift", "Kotlin", "PHP",
//     "Backend", "Frontend", "Full Stack", "Frame Work", "App Development",
//     "JavaScript", "TypeScript", "HTML", "CSS", "React", "Angular", "Vue.js", "Svelte",
//     "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "Laravel", "Ruby on Rails",
//     "SQL", "MySQL", "PostgreSQL", "MongoDB", "Firebase",
//     "React Native", "Flutter", "SwiftUI", "Jetpack Compose",
//     "MATLAB", "R", "Perl", "Scala", "Assembly", "Others"
//   ],
//   "General Studies": [
//     "Communication Skills", "Grammar", "Aptitude", "Interview Prep",
//     "Personality Development", "Cheat Sheets", "Others"
//   ],
//   Others: [
//     "Uncategorized", "Other Notes", "Reference Material", "Miscellaneous"
//   ],
// };



// export default function StudyQuest( fileUrl ) {
//   const categoryList = Object.keys(categories);

//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [downloadingId, setDownloadingId] = useState(null);
//   const [downloadCompleteId, setDownloadCompleteId] = useState(null);


//   const [searchText, setSearchText] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSubCategory, setFilterSubCategory] = useState("");
//   const [filterTag, setFilterTag] = useState("");
//   const [tagList, setTagList] = useState([]);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewFile, setPreviewFile] = useState("");
//   const [uploadOpen, setUploadOpen] = useState(false);

//   const getSubCategories = () => filterCategory ? categories[filterCategory] : [];

//   useEffect(() => {
//     async function loadNotes() {
//       setLoading(true);
//       try {
//         const response = await fetchCommunityNotes(1, 50);
//         if (response.data && response.data.notes) {
//           setNotes(response.data.notes);
//           const fetchedTags = [...new Set(response.data.notes.map(n => n.tag).filter(Boolean))];
//           setTagList(fetchedTags);
//         }
//       } catch (error) {
//         console.error("Failed to fetch notes", error);
//       }
//       setLoading(false);
//     }
//     loadNotes();
//   }, []);


//   const formatDateIndian = (dateString) => {
//   const options = { 
//     timeZone: "Asia/Kolkata", 
//     day: "2-digit", 
//     month: "2-digit", 
//     year: "numeric", 
   
//   };
//   return new Date(dateString).toLocaleString("en-IN", options);
// };

// const handleDownload = async (note) => {
//   setDownloadingId(note._id); // start loading
//   setDownloadCompleteId(null);

//   try {
//     const response = await fetch(note.fileUrl);
//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = note.title || "download.pdf";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();

//     // ✅ success — show green tick
//     setDownloadCompleteId(note._id);
//   } catch (error) {
//     console.error("Download failed", error);
//   } finally {
//     setDownloadingId(null);

//     // reset green tick after 2 sec
//     setTimeout(() => setDownloadCompleteId(null), 2000);
//   }
// };



//   const filteredNotes = notes.filter(note => {
//     const searchLower = searchText.toLowerCase();
//     const matchesSearch = 
//       (note.title?.toLowerCase().includes(searchLower)) ||
//       (note.uploaderName?.toLowerCase().includes(searchLower)) ||
//       (note.tag?.toLowerCase().includes(searchLower));

//     const matchesCategory = filterCategory === "" || note.category === filterCategory;
//     const matchesSubCategory = filterSubCategory === "" || note.subCategory === filterSubCategory;
//     const matchesTag = filterTag === "" || note.tag === filterTag;

//     return matchesSearch && matchesCategory && matchesSubCategory && matchesTag;
//   });

//   const applyFilters = () => setDrawerOpen(false);
//   const handleSearchExecute = () => {}; // optionally handle search submit

//   return (
//     <Box sx={{ bgcolor: '#f3f5f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <AppNavbar />

//       <Box sx={{
//         position: 'sticky',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         px: { xs: 1, sm: 2, md: 2,  },
//         pt: { xs: 0.8,  },
//         pb: { xs: 0.8, },
//         p:1.5,
//         boxShadow: '0 2px 6px rgb(0 0 0 / 0.1)',
//         borderRadius: 6,
//         mx: { xs: 1, sm: 2, md: 4, lg: 6, xl: 25 },
//         mt: 3,
//         top:10,
//         bgcolor: '#ffffffff',
//         zIndex: 1000
//       }}>
//         <TextField
//           size="small"
//           placeholder="Search notes by Topic, Book Name, or Tags"
//           value={searchText}
//           onChange={e => setSearchText(e.target.value)}
//           onKeyDown={e => e.key === "Enter" && handleSearchExecute()}
//           sx={{
//             borderRadius: '9999px',
//             fontSize: { xs: '0.8rem', sm: '0.9rem' },
//             width: { xs: '60%', sm: '70%', md: '50%', lg: '600px' },
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '9999px',
//               bgcolor: '#e6d0fc44',
//               paddingRight: 0
//             }
//           }}
//         />

//         <Box>
//           <Tooltip title="Upload your notes to the community" arrow>
//             <IconButton
//               size="large"
//               onClick={() => setUploadOpen(true)}
//               sx={{
//                 bgcolor: '#3500590a',
//                 borderRadius: '9999px',
//                 p: 1.2,
//                 mx: 1,
//                 boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
//                 '&:hover': { bgcolor: '#e0b2ff42' }
//               }}
//               aria-label="Open Upload Dialog"
//             >
//               <UploadFileIcon sx={{ color: "#4B0082" }} fontSize="medium" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Apply Filters" arrow>
//             <IconButton
//               size="large"
//               onClick={() => setDrawerOpen(true)}
//               sx={{
//                 bgcolor: '#3500590a',
//                 borderRadius: '9999px',
//                 p: 1.2,
//                 boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
//                 '&:hover': { bgcolor: '#e0b2ff42' }
//               }}
//               aria-label="Open Filters Drawer"
//             >
//               <TuneIcon sx={{ color: "#4B0082" }} fontSize="medium" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, px: 0 }}>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
//             <CircularProgress />
//           </Box>
//         ) : filteredNotes.length === 0 ? (
//           <Box sx={{ textAlign: 'center', py: 8, color: '#888', fontWeight: 600 }}>
//             No notes found matching your criteria.
//           </Box>
//         ) : (
//           <Box sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             gap: { xs: 2, sm: 1.5, md: 3 },
//             px: { xs: 1, sm: 2, md: 3 },
//           }}>
//             {filteredNotes.map(note => (
//               <Card key={note.id} sx={{
//                 borderRadius: 3,
//                 bgcolor: '#fff',
//                 boxShadow: '0 6px 32px 4px #e3e9f6, 0px 1.5px 1.5px #dce3f0',
//                 overflow: 'hidden',
//                 flexGrow: 1,
//                 minWidth: { xs: 280, sm: 250, md: 280 },
//                 maxWidth: { xs: 350, sm: 350, md: 350 },
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}>
//                 <Box sx={{
//                   width: '100%',
//                   aspectRatio: '2.5/1',
//                   overflow: 'hidden',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   bgcolor: '#f6f9fb',
//                   borderTopLeftRadius: 12,
//                   borderTopRightRadius: 12,
//                   borderBottom: '1px solid #f0f0f0'
//                 }}>
//                   <PDFThumbnail fileUrl={note.fileUrl} />
//                 </Box>

//                 <CardContent sx={{ py: 2, px: 2 }}>
//                   <Typography component="div" fontWeight={600} fontSize={16} mb={0.5}>
//                     {note.title}
//                   </Typography>
//                   <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
//                     <Chip label={note.category} size="small" sx={{ bgcolor: '#e6f0fc', color: '#3c73c7', fontWeight: 700 }} />
//                     <Chip label={note.subCategory} size="small" sx={{ bgcolor: '#d1e7dd', color: '#3a945f', fontWeight: 600 }} />
//                     {/* <Chip label={note.tag} size="small" sx={{ bgcolor: '#ebedf0', color: '#858eab' }} /> */}
//                   </Box>
//                   <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
//                     <Typography fontSize={13} color="text.secondary" sx={{ mb: 0.5 }}>
//                       Uploaded by: <span style={{ fontWeight: 600 }}>{note.name}</span>
//                     </Typography>
//                     <Typography fontSize={12} color="#92a3b6"> {formatDateIndian(note.createdAt)}</Typography>
//                   </Box>
//                 </CardContent>

//                 <Box sx={{
//                   display: 'flex',
//                   py: 2,
//                   pt: 0,
//                   px: 2,
//                   gap: 2,
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   bgcolor: '#fafdff'
//                 }}>
//                   {/* <Button variant="contained" sx={{
//                     bgcolor: '#3494fb',
//                     color: 'white',
//                     fontWeight: 600,
//                     borderRadius: 2,
//                     px: 3,
//                     boxShadow: 'none',
//                     '&:hover': { bgcolor: '#217fe6' },
//                     minWidth: 120
//                   }} startIcon={<DownloadIcon />}>
//                     Download
//                   </Button> */}

//                   <motion.div
//   key={note._id}
//   initial={{ scale: 1 }}
//   animate={{
//     scale:
//       downloadCompleteId === note._id
//         ? [1, 1.1, 1]
//         : downloadingId === note._id
//         ? [1, 0.95, 1]
//         : 1,
//   }}
//   transition={{ duration: 0.3 }}
// >
//   <Button
//     variant="contained"
//     onClick={() => handleDownload(note)}
//     disabled={downloadingId === note._id}
//     sx={{
//       bgcolor:
//         downloadCompleteId === note._id
//           ? "#4caf50"
//           : "#3494fb",
//       color: "white",
//       fontWeight: 520,
//       borderRadius: 2,
//       px: 3,
//       minWidth: 120,
//       boxShadow: "none",
//       display: "flex",
//       alignItems: "center",
//       gap: 1,
//       "&:hover": {
//         bgcolor:
//           downloadCompleteId === note._id
//             ? "#43a047"
//             : "#217fe6",
//       },
//     }}
//   >
//     {downloadingId === note._id ? (
//       <CircularProgress size={18} color="inherit" />
//     ) : downloadCompleteId === note._id ? (
//       <CheckCircleIcon sx={{ fontSize: 15, color: "white" }} />
//     ) : (
//       <DownloadIcon />
//     )}
//     {downloadingId === note._id
//       ? "Downloading"
//       : downloadCompleteId === note._id
//       ? "Downloaded"
//       : "Download"}
//   </Button>
// </motion.div>




//                   <Button variant="outlined" sx={{
//                     borderColor: '#c2dafc',
//                     color: '#3494fb',
//                     fontWeight: 510,
//                     bgcolor: '#eff8ff',
//                     borderRadius: 2,
//                     px: 3,
//                     '&:hover': { borderColor: '#3494fb', bgcolor: '#e1efff' },
//                     minWidth: 112
//                   }} startIcon={<VisibilityIcon />}
//                     onClick={() => { setPreviewFile(note.fileUrl); setPreviewOpen(true); }}>
//                     Preview 
//                   </Button>
//                 </Box>
//               </Card>
//             ))}
//           </Box>
//         )}
//       </Container>

//       <Footer />

//       <PDFPreviewModal open={previewOpen} handleClose={() => setPreviewOpen(false)} fileUrl={previewFile} />

//       <Drawer
//         anchor='right'
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         ModalProps={{ keepMounted: true }}
//       >
//         <Box sx={{ width: { xs: '60vw', sm: 400, md: 300 }, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>Apply Filters</Typography>

//           <TextField
//             label="Search"
//             placeholder="Search by keyword, uploader, topic..."
//             size="small"
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//             variant="outlined"
//             fullWidth
//           />

//           <TextField
//             select
//             label="Category"
//             size="small"
//             value={filterCategory}
//             onChange={e => {
//               setFilterCategory(e.target.value);
//               setFilterSubCategory("");
//             }}
//           >
//             <MenuItem value="">All Categories</MenuItem>
//             {categoryList.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
//           </TextField>

//           <TextField
//             select
//             label="Sub Category"
//             size="small"
//             value={filterSubCategory}
//             onChange={e => setFilterSubCategory(e.target.value)}
//             disabled={!filterCategory}
//           >
//             <MenuItem value="">All Sub Categories</MenuItem>
//             {getSubCategories().map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
//           </TextField>

//           <TextField
//             select
//             label="Tag"
//             size="small"
//             value={filterTag}
//             onChange={e => setFilterTag(e.target.value)}
//           >
//             <MenuItem value="">All Tags</MenuItem>
//             {tagList.map(tag => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
//           </TextField>

//           <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={applyFilters}>
//             Apply Filters
//           </Button>
//           <Button variant="outlined" size="large" onClick={() => {
//             setSearchText("");
//             setFilterCategory("");
//             setFilterSubCategory("");
//             setFilterTag("");
//           }}>
//             Clear Filters
//           </Button>
//           <Button variant="contained" color="primary" sx={{ height: 56 }} onClick={() => setUploadOpen(true)}>
//             Upload Note
//           </Button>
//         </Box>
//       </Drawer>

//       <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)} maxWidth="sm" fullWidth>
//         <NotesUploader onUpload={(newNote) => { setUploadOpen(false); }} />
//       </Dialog>
//     </Box>
//   );
// }







import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Drawer,
  IconButton,
  MenuItem,
  Tooltip,
  Dialog,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";


import TuneIcon from '@mui/icons-material/Tune';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { fetchCommunityNotes } from '../api/api';

import AppNavbar from '../components/Homepage/AppNavbar';
import Footer from '../components/Homepage/Footer';
import PDFPreviewModal from '../components/Community/PDFPreviewModal';
import NotesUploader from "../components/Community/NotesUploader";
import PDFThumbnail from '../components/Community/PDFThumbnail';
import ContributeCard from '../components/Community/ContributeCard';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const categories = {
  Academic: [
    "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
    "BA", "B.Sc", "B.Com", "BCA", "B.Tech", "BBA", "LLB", "BVSc", "B.Pharm", "B.Des",
    "MA", "M.Sc", "M.Com", "MBA", "MCA", "M.Tech", "LLM", "M.Pharm", "M.Des", "PH.D", "Others"
  ],
  "Competitive Exams": [
    "UPSC", "SSC", "Banking", "Railway", "NDA", "CDS", "JEE", "NEET", "GATE", "CAT", "Others"
  ],
  Coding: [
    "C", "C++", "C#", "Java", "Python", "Go", "Rust", "Ruby", "Swift", "Kotlin", "PHP",
    "Backend", "Frontend", "Full Stack", "Frame Work", "App Development",
    "JavaScript", "TypeScript", "HTML", "CSS", "React", "Angular", "Vue.js", "Svelte",
    "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "Laravel", "Ruby on Rails",
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "Firebase",
    "React Native", "Flutter", "SwiftUI", "Jetpack Compose",
    "MATLAB", "R", "Perl", "Scala", "Assembly", "Others"
  ],
  "General Studies": [
    "Communication Skills", "Grammar", "Aptitude", "Interview Prep",
    "Personality Development", "Cheat Sheets", "Others"
  ],
  Others: [
    "Uncategorized", "Other Notes", "Reference Material", "Miscellaneous"
  ],
};



export default function Community( fileUrl ) {




  const [page, setPage] = useState(1);      // Current page
  const [hasMore, setHasMore] = useState(true); // If more notes exist
  const [loadingMore, setLoadingMore] = useState(false); // Loading next batch






  const categoryList = Object.keys(categories);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);



  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadCompleteId, setDownloadCompleteId] = useState(null);


  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [tagList, setTagList] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const [showContributeCard, setShowContributeCard] = useState(false); // show first time immediately

useEffect(() => {
  // Show again after 1 min (testing)
  const firstTimer = setTimeout(() => {
    setShowContributeCard(true);
  }, 1 * 60 * 1000); // 1 minute for testing, later can remove or adjust

  // Then repeat every 20 minutes
  const interval = setInterval(() => {
    setShowContributeCard(true);
  }, 20 * 60 * 1000); // 20 minutes

  return () => {
    clearTimeout(firstTimer);
    clearInterval(interval);
  };
}, []);




  const getSubCategories = () => filterCategory ? categories[filterCategory] : [];




 


useEffect(() => {
  async function loadNotes() {
    setLoading(true);
    try {
      const response = await fetchCommunityNotes(page, 9); // 9 notes per page
      if (response.data && response.data.notes) {
        setNotes(response.data.notes); // first batch
        const fetchedTags = [...new Set(response.data.notes.map(n => n.tag).filter(Boolean))];
        setTagList(fetchedTags);
        setHasMore(response.data.notes.length === 9); // if less than 9, no more pages
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
    setLoading(false);
  }
  loadNotes();
}, []);


const loadMoreNotes = async () => {
  if (!hasMore) return;

  setLoadingMore(true);
  try {
    const nextPage = page + 1;
    const response = await fetchCommunityNotes(nextPage, 9);
    if (response.data && response.data.notes) {
      setNotes(prev => [...prev, ...response.data.notes]);
      setPage(nextPage);
      setHasMore(response.data.notes.length === 9); // if less than 9, no more pages
    }
  } catch (error) {
    console.error("Failed to fetch more notes", error);
  }
  setLoadingMore(false);
};



  const formatDateIndian = (dateString) => {
  const options = { 
    timeZone: "Asia/Kolkata", 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric", 
   
  };
  return new Date(dateString).toLocaleString("en-IN", options);
};

const handleDownload = async (note) => {
  setDownloadingId(note._id); // start loading
  setDownloadCompleteId(null);

  try {
    const response = await fetch(note.fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = note.title || "download.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // success — show green tick
    setDownloadCompleteId(note._id);
  } catch (error) {
    console.error("Download failed", error);
  } finally {
    setDownloadingId(null);

    // reset green tick after 2 sec
    setTimeout(() => setDownloadCompleteId(null), 2000);
  }
};



  const filteredNotes = notes.filter(note => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch = 
      (note.title?.toLowerCase().includes(searchLower)) ||
      // (note.uploaderName?.toLowerCase().includes(searchLower)) ||
      (note.name?.toLowerCase().includes(searchLower));

    const matchesCategory = filterCategory === "" || note.category === filterCategory;
    const matchesSubCategory = filterSubCategory === "" || note.subCategory === filterSubCategory;
    // const matchesTag = filterTag === "" || note.tag === filterTag;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const applyFilters = () => setDrawerOpen(false);
  const handleSearchExecute = () => {}; // optionally handle search submit

  return (
    <Box sx={{ bgcolor: '#f3f5f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar />

      <Box sx={{
        position: 'sticky',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 1, sm: 2, md: 2,  },
        pt: { xs: 0.8,  },
        pb: { xs: 0.8, },
        p:1.5,
        boxShadow: '0 2px 6px rgb(0 0 0 / 0.1)',
        borderRadius: 6,
        mx: { xs: 1, sm: 2, md: 4, lg: 6, xl: 25 },
        mt: 3,
        top:10,
        bgcolor: '#ffffffff',
        zIndex: 1000
      }}>
        <TextField
          size="small"
          placeholder="Search your notes here by topic , name "
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearchExecute()}
          sx={{
            borderRadius: '9999px',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            width: { xs: '60%', sm: '70%', md: '50%', lg: '600px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '9999px',
              bgcolor: '#e6d0fc44',
              paddingRight: 0
            }
          }}
        />

        <Box>
          <Tooltip title="Upload your notes to the community" arrow>
            <IconButton
              size="large"
              onClick={() => setUploadOpen(true)}
              sx={{
                bgcolor: '#3500590a',
                borderRadius: '9999px',
                p: 1.2,
                mx: 1,
                boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
                '&:hover': { bgcolor: '#e0b2ff42' }
              }}
              aria-label="Open Upload Dialog"
            >
              <UploadFileIcon sx={{ color: "#4B0082" }} fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Apply Filters" arrow>
            <IconButton
              size="large"
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: '#3500590a',
                borderRadius: '9999px',
                p: 1.2,
                boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)',
                '&:hover': { bgcolor: '#e0b2ff42' }
              }}
              aria-label="Open Filters Drawer"
            >
              <TuneIcon sx={{ color: "#4B0082" }} fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, px: 0 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredNotes.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, color: '#888', fontWeight: 600 }}>
            No notes found
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 2, sm: 1.5, md: 3 },
            px: { xs: 1, sm: 2, md: 3 },
          }}>
            {filteredNotes.map(note => (
              <Card key={note.id} sx={{
                borderRadius: 3,
                bgcolor: '#fff',
                boxShadow: '0 6px 32px 4px #e3e9f6, 0px 1.5px 1.5px #dce3f0',
                overflow: 'hidden',
                flexGrow: 1,
                minWidth: { xs: 280, sm: 250, md: 280 },
                maxWidth: { xs: 350, sm: 350, md: 350 },
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box sx={{
                  width: '100%',
                  aspectRatio: '2.5/1',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#f6f9fb',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <PDFThumbnail fileUrl={note.fileUrl} />
                </Box>

                <CardContent sx={{ py: 2, px: 2 }}>
                  <Typography component="div" fontWeight={600} fontSize={16} mb={0.5}>
                    {note.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Chip label={note.category} size="small" sx={{ bgcolor: '#e6f0fc', color: '#3c73c7', fontWeight: 700 }} />
                    <Chip label={note.subCategory} size="small" sx={{ bgcolor: '#d1e7dd', color: '#3a945f', fontWeight: 600 }} />
                    {/* <Chip label={note.tag} size="small" sx={{ bgcolor: '#ebedf0', color: '#858eab' }} /> */}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography fontSize={13} color="text.secondary" sx={{ mb: 0.5 }}>
                      Uploaded by: <span style={{ fontWeight: 600 }}>{note.name}</span>
                    </Typography>
                    <Typography fontSize={12} color="#92a3b6"> {formatDateIndian(note.createdAt)}</Typography>
                  </Box>
                </CardContent>

                <Box sx={{
                  display: 'flex',
                  py: 2,
                  pt: 0,
                  px: 2,
                  gap: 2,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: '#fafdff'
                }}>

                  <motion.div
                    key={note._id}
                    initial={{ scale: 1 }}
                    animate={{
                      scale:
                        downloadCompleteId === note._id
                          ? [1, 1.1, 1]
                          : downloadingId === note._id
                          ? [1, 0.95, 1]
                          : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      v                  ariant="contained"
                      onClick={() => handleDownload(note)}
                      disabled={downloadingId === note._id}
                      sx={{
                        bgcolor:
                          downloadCompleteId === note._id
                            ? "#4caf50"
                            : "#3494fb",
                        color: "white",
                        fontWeight: 520,
                        borderRadius: 2,
                        px: 3,
                        minWidth: 120,
                        boxShadow: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": {
                          bgcolor:
                            downloadCompleteId === note._id
                              ? "#43a047"
                              : "#217fe6",
                        },
                      }}
                    >
                      {downloadingId === note._id ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : downloadCompleteId === note._id ? (
                        <CheckCircleIcon sx={{ fontSize: 15, color: "white" }} />
                      ) : (
                        <DownloadIcon />
                      )}
                      {downloadingId === note._id
                        ? "Downloading"
                        : downloadCompleteId === note._id
                        ? "Downloaded"
                        : "Download"}
                    </Button>
                  </motion.div>

                  <Button variant="outlined" sx={{
                    borderColor: '#c2dafc',
                    color: '#3494fb',
                    fontWeight: 510,
                    bgcolor: '#eff8ff',
                    borderRadius: 2,
                    px: 3,
                    '&:hover': { borderColor: '#3494fb', bgcolor: '#e1efff' },
                    minWidth: 112
                  }} startIcon={<VisibilityIcon />}
                    onClick={() => { setPreviewFile(note.fileUrl); setPreviewOpen(true); }}>
                    Preview 
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        )}

              {hasMore && (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <Button 
      variant="contained" 
      onClick={loadMoreNotes} 
      disabled={loadingMore}
      sx={{ minWidth: 140, display: 'flex', alignItems: 'center', gap: 1 }}
    >
      {loadingMore ? <CircularProgress size={20} color="inherit" /> : "Load More"}
    </Button>
  </Box>
)}
      </Container>

      {showContributeCard && (
  <ContributeCard
    onClose={() => setShowContributeCard(false)}
    onContribute={() => {
      setShowContributeCard(false);
      // Redirect or open upload page
     setUploadOpen(true);   // change if you have a route
    }}
  />
)}

      <Footer />

      <PDFPreviewModal open={previewOpen} handleClose={() => setPreviewOpen(false)} fileUrl={previewFile} />

      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: { xs: '60vw', sm: 400, md: 300 }, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Apply Filters</Typography>

          <TextField
            label="Search"
            placeholder="Search by keyword, uploader, topic..."
            size="small"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <TextField
            select
            label="Category"
            size="small"
            value={filterCategory}
            onChange={e => {
              setFilterCategory(e.target.value);
              setFilterSubCategory("");
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categoryList.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </TextField>

          <TextField
            select
            label="Sub Category"
            size="small"
            value={filterSubCategory}
            onChange={e => setFilterSubCategory(e.target.value)}
            disabled={!filterCategory}
          >
            <MenuItem value="">All Sub Categories</MenuItem>
            {getSubCategories().map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
          </TextField>

          <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" size="large" onClick={() => {
            setSearchText("");
            setFilterCategory("");
            setFilterSubCategory("");
            setFilterTag("");
          }}>
            Clear Filters
          </Button>
          <Button variant="contained" color="primary" sx={{ height: 56 }} onClick={() => setUploadOpen(true)}>
            Upload Note
          </Button>
        </Box>
      </Drawer>

      <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)} maxWidth="sm" fullWidth>
        <NotesUploader onUpload={(newNote) => { setUploadOpen(false); }} />
      </Dialog>
    </Box>
  );
}









