import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  validatePassword,
  validateEmail,
  validateFields,
} from "../constant/validation";
import { useSelector, useDispatch } from "react-redux";
import { userLoginApi } from "../apiMiddleware/authApiMiddleware";
import { setUser } from "../slices/authSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.isLoading);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [message, setmessage] = useState("");
  useEffect(() => {
    setemailError(validateEmail(email));
    setpasswordError(validatePassword(password));
  }, [, email, password]);

  const handleSubmit = () => {
    const validationMessage = validateFields({ email, password });
    setmessage(validationMessage);
    if (!validationMessage) {
      const userData = {
        email,
        password,
      };
      dispatch(userLoginApi(userData)).then((data) => {
        console.log(data);
        if (data.payload?.status) {
          
          dispatch(setUser(data.payload.loggedUser));
          navigate("/home");
        }
      });
    }
  };
  return (
    <>
      <div className="">
        <div className=" flex flex-col gap-5 p-2">
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className="w-sm outline-none"
            />
          </div>
          {emailError && (
            <p className="text-center text-red-800">{emailError}</p>
          )}
          <div>
            <input
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className="w-sm outline-none"
            />
          </div>
          {passwordError && (
            <p className="text-center text-red-800">{passwordError}</p>
          )}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-green-500 cursor-pointer px-10 rounded-md ring inset-ring-2 inset-ring-green-200 hover:ring-offset-2 hover:ring-green-700 py-2"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          <p
            className="cursor-pointer text-blue-600"
            onClick={() => navigate("/signup")}
          >
            create new account
          </p>
          {message && <p className="text-center text-red-800">{message}</p>}
          <small className="text-lg">or</small>
          <div className="w-90 h-0.5 mb-2 bg-blue-500 mx-auto"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
