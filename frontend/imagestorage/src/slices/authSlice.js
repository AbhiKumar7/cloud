import { createSlice } from "@reduxjs/toolkit";
import {
  getuserApi,
  userLoginApi,
  userLogoutApi,
  userRegisterApi,
} from "../apiMiddleware/authApiMiddleware";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(userRegisterApi.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(userRegisterApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userRegisterApi.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = true;
      })

      // LOGIN
      .addCase(userLoginApi.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(userLoginApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(action.payload.loggedUser.name));
        localStorage.setItem("loginTime", Date.now().toString());
      })
      .addCase(userLoginApi.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = true;
      })

      // LOGOUT
      .addCase(userLogoutApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogoutApi.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(userLogoutApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      // GET CURRENT USER
      .addCase(getuserApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuserApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getuserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = true;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authreducer = authSlice.reducer;
