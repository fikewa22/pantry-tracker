"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const SearchBar = ({ setSearchQuery, handleOpen }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
      }}
    >
      <TextField
        label="Search your pantry items..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "var(--shadow-md)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "var(--text-secondary)",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "var(--primary-color)" }} />
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: { xs: "100%", md: "auto" },
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background:
              "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
            boxShadow: "var(--shadow-md)",
            "&:hover": {
              background:
                "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)",
              boxShadow: "var(--shadow-lg)",
              transform: "translateY(-2px)",
            },
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            minWidth: { xs: "100%", md: "auto" },
          }}
        >
          Add Item
        </Button>

        <Tooltip title="Quick camera scan">
          <IconButton
            onClick={handleOpen}
            sx={{
              borderRadius: 3,
              p: 1.5,
              background:
                "linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-light) 100%)",
              color: "white",
              boxShadow: "var(--shadow-md)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, var(--secondary-light) 0%, var(--secondary-color) 100%)",
                boxShadow: "var(--shadow-lg)",
                transform: "translateY(-2px)",
              },
              display: { xs: "none", md: "flex" },
            }}
          >
            <CameraAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SearchBar;
