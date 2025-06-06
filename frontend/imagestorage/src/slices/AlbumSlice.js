import { createSlice } from "@reduxjs/toolkit";
import {
  createAlbumApi,
  deleteAlbumApi,
  getAlbumAPi,
  getAlbumByIdAPi,
  updateAlbumApi,
  
} from "../apiMiddleware/albumApiMiddleware";

const initialState = {
  albums: [],
  isLoading: false,
  curentAlbum: null,
  error: false,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAlbumApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAlbumApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload.albums;
      })
      .addCase(createAlbumApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getAlbumAPi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlbumAPi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload.albums || [];
      })
      .addCase(getAlbumAPi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(updateAlbumApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAlbumApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload;
      })
      .addCase(updateAlbumApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteAlbumApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAlbumApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload;
      })
      .addCase(deleteAlbumApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getAlbumByIdAPi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlbumByIdAPi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.curentAlbum = action.payload;
      })
      .addCase(getAlbumByIdAPi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
export const { findAlbumById } = albumSlice.actions;
export const albumReducer = albumSlice.reducer;
