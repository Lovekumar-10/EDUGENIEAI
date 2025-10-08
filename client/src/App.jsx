
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Community from "./pages/Community";
import MindMap from "./pages/MindMap";
import Quiz from "./pages/Quiz";
import MindMapCreator from "./pages/MindMapCreator";

export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mindMap" element={<MindMap />} />
        <Route path="/mindMap/creator" element={<MindMapCreator />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* Catch-all route: redirect unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


