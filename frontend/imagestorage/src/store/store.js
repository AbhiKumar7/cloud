import { configureStore } from "@reduxjs/toolkit";
import { authreducer } from "../slices/authSlice";
import { albumReducer } from "../slices/AlbumSlice";
import { mediaReducer } from "../slices/mediaSlice";
export const store = configureStore({
    reducer:{
        auth:authreducer,
        album: albumReducer,
        media:mediaReducer,
    }
})

