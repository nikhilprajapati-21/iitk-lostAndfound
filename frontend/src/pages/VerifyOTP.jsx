import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.needsProfile) {
        navigate("/complete-profile", {
          state: { email },
        });
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-3">
          OTP sent to
        </p>

        <p className="text-center font-semibold text-blue-600 mb-8">
          {email}
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-xl p-4 text-center text-2xl tracking-[10px] outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </div>

    </div>
  );
}

export default VerifyOTP;