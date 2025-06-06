import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

import axios from "axios";
dotenv.config({ path: "../../../.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;

    let upload = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    return upload;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

const getAIVisiontags = async (cloudinaryUrl) => {
  const endpoint = `https://api.cloudinary.com/v2/analysis/${process.env.CLOUDINARY_CLOUD_NAME}/analyze/ai_vision_tagging`;

  const payload = {
    source: {
      uri: cloudinaryUrl,
    },
    tag_definitions: [
      { name: "faces", description: "Does the image contain human faces?" },

      { name: "food", description: "Does the image contain food?" },

      { name: "mountain", description: "Is there a mountain in the image?" },
      { name: "beach", description: "Is the image taken at the beach?" },

      { name: "sky", description: "Does the image show the sky or clouds?" },
      { name: "water", description: "Does the image contain bodies of water?" },

      { name: "bird", description: "Is there a bird in the image?" },

      { name: "electronics", description: "Does the image show electronics?" },

      { name: "shoes", description: "Are shoes visible in the image?" },
    ],
  };

  try {
    const response = await axios.post(endpoint, payload, {
      auth: {
        username: process.env.CLOUDINARY_API_KEY,
        password: process.env.CLOUDINARY_API_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tags = response.data?.data?.analysis?.tags || [];

    return tags.map((tag) => tag.name);
  } catch (error) {
    console.error(
      "AI Vision Tagging Error:",
      error.response?.data || error.message
    );
    return [];
  }
};

export { uploadOnCloudinary, getAIVisiontags };
