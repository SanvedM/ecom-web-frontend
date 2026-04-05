import React, { useState } from "react";
import { publicApi } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 SEND OTP
  const handleRegister = async () => {
    if (!email) {
      alert("email number required");
      return;
    }

    try {
      setLoading(true);

      await publicApi.post("register", {
        username,
        password,
        email,
      });

      setIsOtpStep(true);
      alert("OTP sent successfully");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 VERIFY OTP + CREATE USER
  const handleVerifyOtp = async () => {
    if (!username || !password || !email || !otp) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await publicApi.post("verify-otp", {
        username,
        password,
        email,
        otp,
      });

      // 🔥 If you later return token
      if (res.data.access) {
        localStorage.setItem("token", res.data.access);
        navigate("/");
      } else {
        alert("Registration successful");
        navigate("/login");
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-sm w-96 border">

        <h2 className="text-2xl font-medium text-center mb-6 tracking-wide">
          {isOtpStep ? "Verify OTP" : "Create Account"}
        </h2>

        {/* 🔹 STEP 1: ENTER DETAILS */}
        {!isOtpStep && (
          <>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 p-3 border rounded focus:border-black outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border rounded focus:border-black outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="text"
              placeholder="email Number"
              className="w-full mb-6 p-3 border rounded focus:border-black outline-none"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* 🔹 STEP 2: VERIFY OTP */}
        {isOtpStep && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full mb-6 p-3 border rounded text-center tracking-widest focus:border-black outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* 🔙 Edit details option */}
            <p
              className="text-center mt-4 text-sm text-gray-500 cursor-pointer"
              onClick={() => setIsOtpStep(false)}
            >
              Edit Details
            </p>
          </>
        )}

        {/* 🔁 LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}