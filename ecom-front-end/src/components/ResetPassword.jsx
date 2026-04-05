import React, { useState } from "react";
import { publicApi } from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 get email from previous page
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email || !otp || !password) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      await publicApi.post("reset-password", {
        email,
        otp: otp.toString().trim(),
        password,
      });

      alert("Password updated successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-sm w-96 border">

        <h2 className="text-xl text-center mb-6">Reset Password</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="OTP"
          className="w-full mb-4 p-3 border rounded text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}