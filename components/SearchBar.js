"use client";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = ({ setSearchQuery, handleOpen }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <Box
      width="50vw"
      height="20vh"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
    >
      <TextField
        label="Search Items"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
      />
      <Button variant="contained" fullWidth onClick={handleOpen}>
        Add New Item
      </Button>
    </Box>
  );
};

export default SearchBar;
