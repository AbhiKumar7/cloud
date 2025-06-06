import { GoogleOAuthProvider } from "@react-oauth/google";

import GoogleLogin from "../pages/GoogleLogin";
import Login from "../pages/Login";
import CustomCursor from "./CustomCursor";
import GridLayout from "../constant/GridLayout";

function GoogleWrapper() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
        <GridLayout />

        <CustomCursor />

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 animate-typing z-10">
          Welcome To Image Cloud
        </h1>

        <div className="w-full max-w-md bg-gray-100 border border-white p-6 rounded-lg shadow-lg text-center z-10">
          <Login />
          <GoogleLogin />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleWrapper;
