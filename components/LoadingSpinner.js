import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        gap: 3,
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: "var(--primary-color)",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
