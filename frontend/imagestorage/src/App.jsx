import { useEffect, useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import GoogleWrapper from "./utils/GoogleWrapper";
import SignUp from "./pages/SignUp";
import HeaderLayout from "./compound/HeaderLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadImage from "./pages/UploadImage";

function App() {
  const navigate = useNavigate();

  

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const googleAuthToken = JSON.parse(localStorage.getItem("googleToken"));
    if (authToken || googleAuthToken) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<GoogleWrapper />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<HeaderLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="upload/:albumId" element={<UploadImage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
