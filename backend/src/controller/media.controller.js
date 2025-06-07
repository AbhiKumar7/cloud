import { uploadOnCloudinary } from "../utils/uploadCloudinary.js";
import { Media } from "../model/media.model.js";
import { getAIVisiontags } from "../utils/uploadCloudinary.js";
import { Album } from "../model/album.model.js";
export const uploadImage = async (req, res) => {
  try {
    const { title } = req.body;
    const { albumId } = req.params;

    const files = req.files?.avatar;

    if (!title || !files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Title and at least one photo are required" });
    }
    const mediaExits = await Media.findOne({
      $or: [{ title }],
    });
    if (mediaExits) {
      return res.status(400).json({ message: "media already exits" });
    }

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(400).json({ message: "album not found" });
    }
    const uploadedMedia = [];

    for (const file of files) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
       const aiTags = await getAIVisiontags(result.url)

        const mediaDoc = await Media.create({
          title,
          url: result.url,
          type: result.resource_type,
          public_id: result.public_id,
          tags: aiTags,
          albums: [album._id],
        });
        uploadedMedia.push(mediaDoc);

        album.media.push(mediaDoc._id);
      }
    }

    await album.save();
    return res.status(201).json({
      status: true,
      message: "Files uploaded successfully",
      media: uploadedMedia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
export const getAllImage = async (req, res) => {
  try {
    const { title, tags } = req.query;

    const filter = {};

    if (title?.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    if (tags?.trim()) {
      filter.tags = { $regex: tags.trim(), $options: "i" };
    }

    const images = await Media.find(filter);

    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    return res.status(200).json({
      status: true,
      message: "Images fetched successfully",
      count: images.length,
      images,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching images",
      error: error.message,
    });
  }
};
export const getImageById = async (req, res) => {
  try {
    const { albumId } = req.params;

    
    const album = await Album.findById(albumId).populate("media");

    if (!album) {
      return res.status(404).json({ message: "No album found" });
    }

    return res.status(200).json({
      status: true,
      message: "image fetch successfully",
      album,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching images",
      error: error.message,
    });
  }
};
export const deleteImageById = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await Media.findByIdAndDelete(imageId);

    if (!image) {
      return res.status(404).json({ message: "No images found" });
    }

    return res.status(200).json({
      status: true,
      message: "image deleted successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching images",
      error: error.message,
    });
  }
};

export const updatedImageById = async (req, res) => {
  try {
    const { title } = req.body;
    const { imageId } = req.params;
    if (!title) {
      return res.status(400).json({ message: "Title field is required" });
    }

    const image = await Media.findByIdAndUpdate(
      imageId,
      {
        $set: {
          title,
        },
      },
      {
        new: true,
      }
    );

    if (!image) {
      return res.status(404).json({ message: "No images found" });
    }

    return res.status(200).json({
      status: true,
      message: "image update successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching images",
      error: error.message,
    });
  }
};
