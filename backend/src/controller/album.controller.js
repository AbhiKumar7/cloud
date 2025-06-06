import { Album } from "../model/album.model.js";
import { Media } from "../model/media.model.js";

export const createAlbum = async (req, res) => {
  try {
    const { name, description } = req.body;

    let missingField = [];
    if (!name) missingField.push("name");
    if (!description) missingField.push("description");

    if (missingField.length > 0) {
      return res.status(404).json({
        message: `${missingField.join(", ")} is required`,
      });
    }

    const albumExits = await Album.findOne({
      $or: [{ name }],
    });
    if (albumExits) {
      return res.status(404).json({ message: "album already exits" });
    }
    const newAlbum = await Album.create({
      name,
      description,
      createdBy: req.user?._id,
    });

    if (!newAlbum) {
      return res.status(404).json({ message: "to able to create album" });
    }
    return res.status(200).json({
      status: true,
      message: "album created successfully",
      newAlbum,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

export const getAllAlbum = async (req, res) => {
  try {
    const search = req.query.search;

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const albums = await Album.find(filter).populate("media");

    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found" });
    }

    return res.status(200).json({
      status: true,
      message: "Albums fetched successfully",
      count: albums.length,
      albums,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("media");
    if (!album) {
      return res.status(400).json({ message: "album not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Album fetched successfully",
      album,
    });
  } catch (error) {
       return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const updateAlbum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { albumId } = req.params;

    let missingField = [];
    if (!name) missingField.push("name");
    if (!description) missingField.push("description");

    if (missingField.length > 0) {
      return res.status(404).json({
        message: `${missingField.join(", ")} is required`,
      });
    }

    const album = await Album.findByIdAndUpdate(
      albumId,
      {
        $set: {
          name,
          description,
        },
      },
      {
        new: true,
      }
    );
    if (!album) {
      return res.status(404).json({ message: "No albums found or update" });
    }
    return res.status(200).json({
      status: true,
      message: "Albums fetched successfully",
      album,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    await Media.updateMany(
      { albums: album._id },
      { $pull: { albums: album._id } }
    );

    await Album.findByIdAndDelete(albumId);

    return res.status(200).json({
      status: true,
      message: "Album and references in media removed successfully",
      album,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
