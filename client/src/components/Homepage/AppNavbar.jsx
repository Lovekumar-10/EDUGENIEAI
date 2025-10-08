
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";

// Menu items
const menuItems = [
  { label: "Home", path: "/" },
  { label: "MindMap", path: "/mindMap" },
  { label: "Quiz", path: "/quiz" },
  { label: "Community", path: "/community" },
];

export default function CustomResponsiveAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          p: 1,
          borderBottom: "1px solid #ddd",
        }}
      >
        <IconButton onClick={toggleDrawer(false)} aria-label="close drawer">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgb(0 0 0 / 0.1)",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        {/* Logo */}
       <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
  <Box
    component="img"
    src="/logo.png" 
    alt="EduGenieAI Logo"
    sx={{
      height: { xs: 40, sm: 50, md: 60 },
      width: "auto",
      mr: 1,
    }}
  />
</Box>


        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 4 }}>
            {menuItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  cursor: "pointer",
                  color: location.pathname === item.path ? "#4B0082" : "#333",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom:
                    location.pathname === item.path ? "2px solid #4B0082" : "none",
                  pb: 0.5,
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}

        {/* Mobile Drawer Menu */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ color: "#4B0082" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}









