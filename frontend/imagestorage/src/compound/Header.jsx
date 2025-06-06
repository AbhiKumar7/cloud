import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogoutApi } from "../apiMiddleware/authApiMiddleware";
import { googleLogout } from "@react-oauth/google";
import { eightHours } from "../constant/sessionExpiry";
import logo from "../../logo/logo.png";
function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userad = JSON.parse(localStorage.getItem("googleuserdata"));

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    const checkAutoLogout = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (!loginTime) return;

      const now = Date.now();

      if (now - Number(loginTime) >= eightHours) {
        googleLogout();
        localStorage.removeItem("googleToken");
        localStorage.removeItem("googleuserdata");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");

        dispatch(userLogoutApi()).finally(() => {
          navigate("/login");
        });
      }
    };

    checkAutoLogout();
    const interval = setInterval(checkAutoLogout, 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("googleToken");
    localStorage.removeItem("googleuserdata");
    localStorage.removeItem("loginTime");
    navigate("/login");

    dispatch(userLogoutApi()).then((data) => {
      if (data.payload?.status) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-purple-800 text-white px-4  shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo + Menu Icon */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle Menu"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <img
              src={logo}
              className="w-19 h-19 object-contain"
              alt="App Logo"
            />
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex gap-6 items-center">
            {/* Add nav items here */}
          </nav>

          {/* Profile + Logout (Desktop) */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 overflow-hidden rounded-full border-2 flex justify-center items-center border-white">
              {userad?.name?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:inline px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-purple-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" onClick={toggleSidebar}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleSidebar}>
                About
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleSidebar}>
                Section
              </a>
            </li>
          </ul>

          {/* Logout Button in Sidebar */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Header;
