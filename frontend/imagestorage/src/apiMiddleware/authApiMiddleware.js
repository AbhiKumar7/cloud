import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegisterApi = createAsyncThunk(
  "auth/userRegisterApi",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/auth/registeruser", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userLoginApi = createAsyncThunk(
  "auth/userLoginApi",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/auth/userLogin", userData, {
        withCredentials: true,
      });
       console.log(response);
       
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const userLogoutApi = createAsyncThunk(
  "auth/userLogoutApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/auth/userlogout", {}, {
        withCredentials: true,
      });
    
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getuserApi = createAsyncThunk(
  "auth/getuserApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "api/auth/getuser",
        {},
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
