"use client";
import { useRef, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Modal,
  IconButton,
  Fade,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { Camera } from "react-camera-pro";
import { convertImage } from "@requrv/image-to-base64";
import OpenAI from "openai";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95vw", sm: 600 },
  maxWidth: 600,
  bgcolor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 4,
  boxShadow: "var(--shadow-xl)",
  p: 0,
  outline: "none",
  overflow: "hidden",
};

const CameraModal = ({ cameraOpen, handleCameraClose, itemName }) => {
  const camera = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const recognizeImage = async (imageBase64) => {
    try {
      const response = await fetch("/api/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageBase64 }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to recognize image");
      }

      const result = await response.json();
      console.log("Recognition result:", result);
    } catch (error) {
      console.error("Error recognizing image:", error);
      setError(error.message || "Failed to recognize image");
    }
  };

  const takePicture = async () => {
    if (!camera.current) return;

    setIsLoading(true);
    setError("");

    try {
      const imageSrc = camera.current.takePhoto();

      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], `${itemName}.jpg`, { type: blob.type });

      const base64Image = await convertImage(file);

      // Check if Firebase storage is available
      if (!storage) {
        console.warn("Firebase storage not available, skipping upload");
        // Still try to recognize the image
        await recognizeImage(base64Image);
        handleCameraClose();
        return;
      }

      const storageRef = ref(storage, `images/${itemName}.jpg`);
      await uploadString(storageRef, base64Image, "data_url");

      const downloadURL = await getDownloadURL(storageRef);
      handleCameraClose();

      await recognizeImage(downloadURL);
    } catch (error) {
      console.error("Error taking picture or converting image:", error);
      setError("Failed to process image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCamera = () => {
    if (camera.current) {
      camera.current.switchCamera();
      setIsFrontCamera(!isFrontCamera);
    }
  };

  return (
    <Modal
      open={cameraOpen}
      onClose={handleCameraClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={cameraOpen}>
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-light) 100%)",
              p: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleCameraClose}
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
              <CameraAltIcon sx={{ fontSize: 32, color: "white" }} />
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Capture Image
              </Typography>
            </Stack>
            {itemName && (
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  mt: 1,
                  fontStyle: "italic",
                }}
              >
                Capturing for: {itemName}
              </Typography>
            )}
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ m: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Camera Container */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Camera
              ref={camera}
              facingMode={isFrontCamera ? "user" : "environment"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Camera Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                pointerEvents: "none",
              }}
            />
          </Box>

          {/* Controls */}
          <Box sx={{ p: 3, background: "rgba(255, 255, 255, 0.9)" }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={toggleCamera}
                startIcon={<FlipCameraIosIcon />}
                disabled={isLoading}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                  "&:hover": {
                    background: "var(--primary-color)",
                    color: "white",
                    borderColor: "var(--primary-color)",
                    transform: "translateY(-2px)",
                    boxShadow: "var(--shadow-md)",
                  },
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Switch Camera
              </Button>

              <Button
                variant="contained"
                onClick={takePicture}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <PhotoCameraIcon />
                  )
                }
                disabled={isLoading}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background:
                    "linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-light) 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, var(--secondary-light) 0%, var(--secondary-color) 100%)",
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
                {isLoading ? "Processing..." : "Capture"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CameraModal;
