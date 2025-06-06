import { createSlice } from "@reduxjs/toolkit";
import {
  deleteMedia,
  getAllMediaApi,
  uploadFileApi,
} from "../apiMiddleware/mediaApiMiddleware";

const initialState = {
  media: null,

  status: "idle" | "loading" | "succeeded" | "failed",
  error: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadFileApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.media = action.payload;
      })
      .addCase(uploadFileApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Upload failed";
      })
      .addCase(getAllMediaApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllMediaApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.media = action.payload;
      })
      .addCase(getAllMediaApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Upload failed";
      })
      .addCase(deleteMedia.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.media = action.payload;
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Upload failed";
      });
  },
});

export const mediaReducer = mediaSlice.reducer;
