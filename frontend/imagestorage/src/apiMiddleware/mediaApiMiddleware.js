import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadFileApi = createAsyncThunk(
  "media/uploadFileApi",
  async ({ albumId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/media/uploadImage/${albumId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllMediaApi = createAsyncThunk(
  "media/getAllMediaApi",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/media/getimagebyid/${albumId}`,

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteMedia = createAsyncThunk(
  "media/deleteMedia",
  async (mediaId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/media/deleteimagebyid/${mediaId}`,

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
