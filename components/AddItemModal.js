"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  Button,
  Modal,
  TextField,
  IconButton,
  Divider,
  Fade,
} from "@mui/material";
import { addItem } from "@/redux/pantrySlice";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InventoryIcon from "@mui/icons-material/Inventory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 500 },
  maxWidth: 500,
  bgcolor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 4,
  boxShadow: "var(--shadow-xl)",
  p: 0,
  outline: "none",
  overflow: "hidden",
};

const AddItemModal = ({ open, handleClose, handleCameraOpen }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleSubmit = () => {
    if (itemName.trim()) {
      dispatch(addItem({ item: itemName.trim(), quantity: itemQuantity }));
      setItemName("");
      setItemQuantity(1);
      handleClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
              p: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Stack direction="row" alignItems="center" spacing={2}>
              <InventoryIcon sx={{ fontSize: 32, color: "white" }} />
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Add New Item
              </Typography>
            </Stack>
          </Box>

          {/* Content */}
          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              <TextField
                label="Item Name"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Rice, Tomatoes, Olive Oil"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-color)",
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />

              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                fullWidth
                value={itemQuantity}
                onChange={(e) =>
                  setItemQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                onKeyPress={handleKeyPress}
                inputProps={{ min: 1 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-color)",
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<AddIcon />}
                  disabled={!itemName.trim()}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "var(--shadow-lg)",
                    },
                    "&:disabled": {
                      background: "var(--border-color)",
                      color: "var(--text-secondary)",
                    },
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Add Item
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleCameraOpen}
                  startIcon={<CameraAltIcon />}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    borderColor: "var(--secondary-color)",
                    color: "var(--secondary-color)",
                    "&:hover": {
                      background: "var(--secondary-color)",
                      color: "white",
                      borderColor: "var(--secondary-color)",
                      transform: "translateY(-2px)",
                      boxShadow: "var(--shadow-md)",
                    },
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Camera
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddItemModal;
