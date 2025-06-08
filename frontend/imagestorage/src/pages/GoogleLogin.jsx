import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { setUser } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleResponse = async (authResult) => {
    try {
      if (authResult.code) {
        // Pass the code as a query parameter in the URL
        const result = await axios.post(
          "https://cloud-2-85ac.onrender.com/api/auth/google",
          {
            code: authResult.code,
          },
          {
            withCredentials: true,
          }
        );

        if (result.data.status) {
          const { name } = result.data.user;

          dispatch(setUser(result.data.user));
          localStorage.setItem(
            "googleToken",
            JSON.stringify(result.data.accessToken)
          );
          localStorage.setItem("googleuserdata", JSON.stringify({ name }));
          localStorage.setItem("loginTime", Date.now().toString());
          navigate("/home");
        }
      }
    } catch (error) {
      console.log("Error during Google login:", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
    redirect_uri: "https://cloud-2-85ac.onrender.com",
  });

  return (
    <div>
      <button
        className="bg-blue-500 px-3 py-2 rounded-md text-white"
        onClick={handleGoogleLogin}
      >
        Login With Google
      </button>
    </div>
  );
}

export default GoogleLogin;
