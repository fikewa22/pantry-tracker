"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Paper } from "@mui/material";
import AddItemModal from "@/components/AddItemModal";
import CameraModal from "@/components/CameraModal";
import PantryList from "@/components/PantryList";
import SearchBar from "@/components/SearchBar";
import { fetchPantry } from "@/redux/pantrySlice";

export default function Home() {
  const dispatch = useDispatch();
  const pantry = useSelector((state) => state.pantry.items);
  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPantry());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName("");
  };

  const handleCameraOpen = (name) => {
    setItemName(name);
    setCameraOpen(true);
  };

  const handleCameraClose = () => setCameraOpen(false);

  const filteredPantry = pantry.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          className="animate-fade-in"
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Pantry Tracker
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Keep track of your kitchen essentials with AI-powered recognition
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 4,
            p: 4,
            mb: 4,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <SearchBar setSearchQuery={setSearchQuery} handleOpen={handleOpen} />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <PantryList pantry={filteredPantry} />
        </Paper>

        <AddItemModal
          open={open}
          handleClose={handleClose}
          handleCameraOpen={() => handleCameraOpen(itemName)}
        />
        <CameraModal
          cameraOpen={cameraOpen}
          handleCameraClose={handleCameraClose}
          itemName={itemName}
        />
      </Container>
    </Box>
  );
}
