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
} from "@mui/material";
import { addItem } from "@/redux/pantrySlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const AddItemModal = ({ open, handleClose, handleCameraOpen }) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={"row"} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(parseInt(e.target.value))}
            inputProps={{ min: 1 }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(addItem({ item: itemName, quantity: itemQuantity }));
              setItemName("");
              setItemQuantity(1);
              handleClose();
            }}
          >
            Add
          </Button>
          <Button variant="outlined" onClick={handleCameraOpen}>
            Take Picture
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
