
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/pdf", // your backend PDF route
  headers: {
    "Content-Type": "application/json",
  },
});

// Upload PDF
export const uploadPdf = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


// Get summary for a chunk with userId and optional prompt
export const getSummary = (pdfId, chunkIndex, userId, choices = {}) => {
  return api.post(`/summary/${pdfId}/${chunkIndex}/${userId}`, {
    // subChoice: choices.subChoice || "",
    customInput: choices.customInput || "",
  });
};


// ✅ New: Get flashcards for a chunk with count
export const getFlashcards = (pdfId, chunkIndex, userId, count) => {
  return api.post(`/flashcards/${pdfId}/${chunkIndex}/${userId}`, { count });
};


export const generateQuiz = ({ topic, customText, difficulty, numQuestions }) => {
  // We'll send this to a new backend route like /api/quiz/generate
  return axios.post("http://localhost:5000/api/quiz/generate", {
    topic,
    customText,
    difficulty,
    numQuestions,
  });
};




/* ✅ NEW: Community Notes upload API (separate route) */
const communityApi = axios.create({
  baseURL: "http://localhost:5000/api/notes", // new backend route
});

export const uploadCommunityNote = (data) => {
  const formData = new FormData();
  formData.append("noteFile", data.file); // matches your noteRoute
  formData.append("name", data.name);
  formData.append("title", data.title);
  formData.append("category", data.category);  // main category
  formData.append("subCategory", data.subCategory); // sub category
  formData.append("tags", data.tags);

  return communityApi.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchCommunityNotes = (page = 1, limit = 9) => {
  return communityApi.get(`/?page=${page}&limit=${limit}`);
};




export default api;
