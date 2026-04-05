import React, { useState } from "react";
import { publicApi } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);

      await publicApi.post("forgot-password", { email });

      alert("OTP sent to email");

      // 🔥 redirect to reset page with email
      navigate("/reset-password", { state: { email } });

    } catch (err) {
      alert(err.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-sm w-96 border">

        <h2 className="text-xl text-center mb-6">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </div>
    </div>
  );
}