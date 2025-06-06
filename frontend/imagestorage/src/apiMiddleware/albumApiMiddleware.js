import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createAlbumApi = createAsyncThunk(
  "album/createAlbumApi",
  async (albumDetail, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/album/createalbum", albumDetail, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAlbumAPi = createAsyncThunk(
  "album/getAlbumAPi",
  async (inputValue, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `api/album/getAllalbum?search=${inputValue}`,
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
export const getAlbumByIdAPi = createAsyncThunk(
  "album/getAlbumByIdAPi",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/album/getalbumById/${albumId}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAlbumApi = createAsyncThunk(
  "album/updateAlbumApi",
  async ({ id, name, description }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/album/updateAlbum/${id}`,
        { name, description },
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
export const deleteAlbumApi = createAsyncThunk(
  "album/deleteAlbumApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/album/deletealbum/${id}`,

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
