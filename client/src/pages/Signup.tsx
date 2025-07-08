import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { email });
      localStorage.setItem("userEmail", email);
      navigate("/verify-otp");
    } catch (err) {
      setMsg("Signup failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const decoded: any = jwt_decode(credentialResponse.credential!);
          const res = await axios.post(
            "http://localhost:5000/api/auth/google-login",
            {
              email: decoded.email,
              googleId: decoded.sub,
            }
          );
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      {msg && <p>{msg}</p>}
    </div>
  );
}
