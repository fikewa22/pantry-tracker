"use client";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Fade,
  Divider,
} from "@mui/material";
import { removeItem, deleteItem } from "@/redux/pantrySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const PantryList = ({ pantry }) => {
  const dispatch = useDispatch();

  if (pantry.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 4,
        }}
      >
        <LocalGroceryStoreIcon
          sx={{
            fontSize: 80,
            color: "var(--text-secondary)",
            mb: 3,
            opacity: 0.5,
          }}
        />
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          Your pantry is empty
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: "auto" }}
        >
          Start by adding some items to keep track of your kitchen essentials
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
          p: 4,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
            opacity: 0.3,
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <InventoryIcon sx={{ fontSize: 40, color: "white" }} />
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Pantry Items
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            mt: 1,
            fontWeight: 400,
          }}
        >
          {pantry.length} item{pantry.length !== 1 ? "s" : ""} in your pantry
        </Typography>
      </Box>

      <Box
        sx={{
          p: 4,
          maxHeight: "600px",
          overflow: "auto",
        }}
      >
        <Stack spacing={3}>
          {pantry.map(({ name, quantity }, index) => (
            <Fade in timeout={300 + index * 100} key={name}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid var(--border-color)",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "var(--shadow-lg)",
                    borderColor: "var(--primary-color)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          mb: 1,
                          textTransform: "capitalize",
                        }}
                      >
                        {name}
                      </Typography>
                      <Chip
                        label={`Quantity: ${quantity}`}
                        color="primary"
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          fontWeight: 500,
                          borderColor: "var(--primary-color)",
                          color: "var(--primary-color)",
                        }}
                      />
                    </Box>

                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Remove one item">
                        <IconButton
                          onClick={() => dispatch(removeItem(name))}
                          sx={{
                            borderRadius: 2,
                            background: "var(--secondary-color)",
                            color: "white",
                            "&:hover": {
                              background: "var(--secondary-dark)",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete all items">
                        <IconButton
                          onClick={() => dispatch(deleteItem(name))}
                          sx={{
                            borderRadius: 2,
                            background: "#ef4444",
                            color: "white",
                            "&:hover": {
                              background: "#dc2626",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default PantryList;
