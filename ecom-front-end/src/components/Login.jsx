import React, { useState } from "react"; 
import { publicApi } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "" // "success" | "error"
});

const handleLogin = async () => {
  try {
    const res = await publicApi.post("login", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.access);

    localStorage.setItem("user", JSON.stringify({
      name: username
    }));

    // ✅ SUCCESS TOAST
    setToast({
      show: true,
      message: "Login successful",
      type: "success"
    });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
      navigate("/");
    }, 1500);

  } catch (err) {
    // ❌ ERROR TOAST
    setToast({
      show: true,
      message: "Login failed",
      type: "error"
    });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 2000);
  }
};
return (
  <div className="flex justify-center items-center h-screen bg-gray-50">

    {/* ✅ TOAST UI (MOVE HERE) */}
{toast.show && (
  <div className="fixed inset-0 flex items-start justify-center pt-24 bg-black/10 z-50">

    <div className="bg-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[240px] animate-fadeIn">

      {/* ICON */}
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm
        ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}
      >
        {toast.type === "success" ? "✔" : "✖"}
      </div>

      {/* TEXT */}
      <p className="text-gray-800 text-sm font-medium">
        {toast.message}
      </p>

    </div>
  </div>
)}

    {/* LOGIN BOX */}
    <div className="bg-white p-10 rounded-lg shadow-sm w-96 border">

      <h2 className="text-2xl font-medium text-center mb-6 tracking-wide">
        Login
      </h2>

      <input
        type="text"
        placeholder="Username"
        className="w-full mb-4 p-3 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-3 rounded"
      >
        Login
      </button>

      <p className="text-center mt-4 text-sm">
        <Link to="/register">Register</Link>
      </p>

    </div>
  </div>
);
}