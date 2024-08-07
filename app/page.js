"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
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
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
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
      <SearchBar setSearchQuery={setSearchQuery} handleOpen={handleOpen} />
      <PantryList pantry={filteredPantry} />
    </Box>
  );
}
