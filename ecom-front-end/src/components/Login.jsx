import React, { useState } from "react";
import { publicApi } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await publicApi.post("login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-sm w-96 border">

        <h2 className="text-2xl font-medium text-center mb-6 tracking-wide">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:border-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded focus:outline-none focus:border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
        >
          Login
        </button>
        <p className="text-center mt-3 text-sm text-gray-500">
  <Link to="/forgot-password" className="hover:underline">
    Forgot Password?
  </Link>
</p>

        {/* 🔥 Small subtle register link BELOW button */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black hover:underline font-medium"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}