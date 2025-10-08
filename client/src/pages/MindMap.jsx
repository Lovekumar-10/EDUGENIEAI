// src/pages/MindMapLanding.jsx
import React, { useRef } from "react";
import { Box, Container, Button, Grid, Typography } from "@mui/material";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

import CropFreeIcon from '@mui/icons-material/CropFree';
import ShapesIcon from '@mui/icons-material/Category';
import BrushIcon from '@mui/icons-material/Brush';
import PeopleIcon from '@mui/icons-material/People';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DownloadIcon from '@mui/icons-material/Download';
import AppNavbar from "../components/Homepage/AppNavbar";
import Footer from "../components/Homepage/Footer";
import { useMediaQuery } from "@mui/material";

import { useNavigate } from "react-router-dom";

import imageSrc from "../assets/image.png";



function RiverBackground() {
  const pointsRef = useRef();
  const isMobile = useMediaQuery("(max-width:600px)");



  const particleCount = 1200; // more particles for galaxy effect
  const particles = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const palette = [
    "#ff0080","#ff00ff","#8000ff","#00ffff","#00ff80",
    "#ffff00","#ff8000","#ff0000","#00ff00","#0080ff",
    "#ff66ff","#ffcc00","#66ffcc","#ccff66","#ff6699",
    "#9966ff","#66ccff","#ff9966","#cc66ff","#66ff99",
    "#ffcc66","#66cc66","#ff66cc","#ccff99","#99ccff"
  ];

  for (let i = 0; i < particleCount; i++) {
    // create a spiral shape for galaxy
    const radius = Math.random() * 20; 
    const angle = Math.random() * Math.PI * 4; // spiral turns
    const height = (Math.random() - 0.5) * 5;

    particles[i * 3] = radius * Math.cos(angle); 
    particles[i * 3 + 1] = height; 
    particles[i * 3 + 2] = radius * Math.sin(angle);

    // random color
    const col = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    // random size for depth
    sizes[i] = Math.random() * 0.2 + 0.05;
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;
      pointsRef.current.rotation.x = 0.02 * Math.sin(Date.now() * 0.0005);
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} colors={colors} stride={3} frustumCulled>
      <PointMaterial 
        vertexColors 
        size={0.05} 
        sizeAttenuation 
        depthWrite={false} 
        transparent 
        alphaTest={0.5} 
      />
    </Points>
  );
}


// Features Data
const features = [
  {
    icon: <CropFreeIcon fontSize="large" />,
    title: "Infinite Canvas",
    desc: "Draw anywhere on an unlimited canvas, perfect for brainstorming and mind maps."
  },
  {
    icon: <ShapesIcon fontSize="large" />,
    title: "Multi-Shape Support",
    desc: "Add rectangles, circles, lines, arrows, and custom shapes to visualize your ideas."
  },
  {
    icon: <BrushIcon fontSize="large" />,
    title: "Freehand Drawing",
    desc: "Sketch freely, create connectors or doodles for your mind maps."
  },
  {
    icon: <PeopleIcon fontSize="large" />,
    title: "Collaboration",
    desc: "Work in real-time with friends or colleagues on the same canvas."
  },
  {
    icon: <DeviceHubIcon fontSize="large" />,
    title: "Node & Connectors",
    desc: "Easily connect nodes to build mind maps, flowcharts, and diagrams."
  },
  {
    icon: <DownloadIcon fontSize="large" />,
    title: "Export Options",
    desc: "Download your creations as PNG, SVG, or PDF for sharing and presentation."
  },
];



export default function MindMapLanding() {
  const navigate = useNavigate(); //  define navigate here
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <AppNavbar />
      </Box>

      {/* Hero Section */}
      <Box sx={{ flexGrow: 1, position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #9900ff29,  #ddd)", py: 15 }}>
        <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <RiverBackground />
        </Canvas>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#fff", px: 2 }}>
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h1" sx={{ fontSize: "5rem", fontWeight: 900, mb: 2, background: "linear-gradient(90deg, #ff0080, #ffcc66, #8000ff)", WebkitBackgroundClip: "text", color: "transparent" }}>
               Mind<span style={{ color: "#f0f", marginLeft: "0.3rem" }}>-Map</span>
            </Typography>
            <Typography variant="h2" sx={{ fontSize: "3rem", fontWeight: 700, background: "linear-gradient(90deg, #d206f6ff, #d997ffff, #f801a2ff)", WebkitBackgroundClip: "text", color: "transparent" }}>
              Think. Connect. Create.    <span  style={{color:"#590063ff" , fontSize:"2rem" }}>~by EduGenieAI</span> 
            </Typography>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/mindMap/creator")}
              sx={{ color: "#fff", borderRadius:2, bgcolor: "#590063ff", px: 4, py: 1.5, fontSize: "1.2rem", mt: 4, boxShadow: "0 0 15px rgba(0,2,2,0.23), 0 0 30px rgba(36,19,222,0.46)" }}
            >
              Start Mind Map
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      {/* Features Section */}
<Box sx={{ py: 10, bgcolor: "#11153d" }}>
  <Container maxWidth="lg">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ color: "#ffcc66", textAlign: "center", fontSize: "3rem", marginBottom: "3rem" }}
    >
      Features
    </motion.h2>

    {/* Flex container for rows */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // wrap cards to new line
        justifyContent: "center",
        gap: 4, // spacing between cards
      
      }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            cursor: "pointer",
            background: "#fff",
            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            width: "100%",
            flex: "1 1 45%", // 2 cards per row roughly
            minWidth: 250,  // prevent too small

          }}
        >
          {/* Top curved color section with icon */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #ff00809d, #bd66ffff, #8000ff)",
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <Box sx={{ color: "#fff", fontSize: { xs: 36, sm: 48 } }}>
              {feature.icon}
            </Box>
          </Box>

          {/* Bottom text section */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              sx={{ color: "#333", fontWeight: 700, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {feature.title}
            </Typography>
            <Typography sx={{ color: "#555", fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
              {feature.desc}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  </Container>
</Box>


      {/* Demo Section */}
      <Box sx={{ py: 10, bgcolor: "#0b0c3f" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} style={{ color: "#ffcc66", fontSize: "3rem", marginBottom: "2rem" }}>
            Demo
          </motion.h2>
          <motion.img  src={imageSrc} style={{ width: "100%", maxWidth: 900, borderRadius: 20, boxShadow: "0 0 40px #ffcc66" }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}















