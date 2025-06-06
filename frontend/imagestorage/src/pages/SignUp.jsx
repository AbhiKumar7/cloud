import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomCursor from "../utils/CustomCursor";
import { useSelector, useDispatch } from "react-redux";
import { userRegisterApi } from "../apiMiddleware/authApiMiddleware";
import {
  validateEmail,
  validateFields,
  validateName,
  validatePassword,
} from "../constant/validation";
function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.isLoading);

  const navigate = useNavigate();
  useEffect(() => {
    setnameError(validateName(name));
    setemailError(validateEmail(email));
    setpasswordError(validatePassword(password));
  }, [name, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationMessage = validateFields({ name, email, password });
    setmessage(validationMessage);
    if (!validationMessage) {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(userRegisterApi(userData)).then((data) => {
        console.log(data);
        if(data.payload?.status){
          navigate("/login")
        }
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
      <CustomCursor />
      <div className="absolute bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {nameError && <p className="text-center text-red-800">{nameError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {emailError && <p className="text-center text-red-800">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 "
            />
            {passwordError && <p className="text-center text-red-800">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-center text-red-800">{message}</p>}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
