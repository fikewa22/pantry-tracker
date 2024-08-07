"use client";
import { useDispatch } from "react-redux";
import { Box, Typography, Stack, Button } from "@mui/material";
import { removeItem, deleteItem } from "@/redux/pantrySlice";
import DeleteIcon from "@mui/icons-material/Delete";

const PantryList = ({ pantry }) => {
  const dispatch = useDispatch();

  return (
    <Box border={"1px solid #333"}>
      <Box
        width="800px"
        height="100px"
        bgcolor={"#ADD8E6"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
          Pantry Items
        </Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
        {pantry.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bgcolor={"#f0f0f0"}
            paddingX={5}
          >
            <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
              Quantity: {quantity}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => dispatch(removeItem(name))}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(deleteItem(name))}
              >
                <DeleteIcon />
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PantryList;
