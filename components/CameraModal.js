"use client";
import { useRef, useState } from "react";
import { Box, Typography, Stack, Button, Modal } from "@mui/material";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { Camera } from "react-camera-pro";
import { convertImage } from "@requrv/image-to-base64";
import OpenAI from "openai";

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

const CameraModal = ({ cameraOpen, handleCameraClose, itemName }) => {
  const camera = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const client = new OpenAI({
    apiKey: `${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const recognizeImage = async (imageBase64) => {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            { type: "image", image: `data:image/jpeg;base64,${imageBase64}` },
          ],
        },
      ],
      max_tokens: 300,
      stream: false,
    });
    console.log(response.data.choices[0].message.content);
  };

  const takePicture = async () => {
    try {
      const imageSrc = camera.current.takePhoto();

      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], `${itemName}.jpg`, { type: blob.type });

      const base64Image = await convertImage(file);

      const storageRef = ref(storage, `images/${itemName}.jpg`);
      await uploadString(storageRef, base64Image, "data_url");
      const downloadURL = await getDownloadURL(storageRef);
      handleCameraClose();

      recognizeImage(downloadURL);
    } catch (error) {
      console.error("Error taking picture or converting image:", error);
    }
  };

  const toggleCamera = () => {
    camera.current.switchCamera();
    setIsFrontCamera(!isFrontCamera);
  };

  return (
    <Modal
      open={cameraOpen}
      onClose={handleCameraClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Capture Image
        </Typography>
        <Camera
          ref={camera}
          facingMode={isFrontCamera ? "user" : "environment"}
        />
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outlined" onClick={takePicture}>
            Capture
          </Button>
          <Button variant="outlined" onClick={toggleCamera}>
            Switch Camera
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CameraModal;
