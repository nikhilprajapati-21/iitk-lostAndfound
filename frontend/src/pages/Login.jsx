import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your IITK email");
      return;
    }

    if (!email.endsWith("@iitk.ac.in")) {
      toast.error("Only IITK email is allowed");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/send-otp", {
        email,
      });

      toast.success(response.data.message);

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-700">
            IITK Lost & Found
          </h1>

          <p className="text-gray-500 mt-3">
            Find what matters. Help others.
          </p>

        </div>

        <div className="mt-8">

          <label className="block mb-2 text-gray-700 font-medium">
            IITK Email
          </label>

          <input
            type="email"
            placeholder="nikhilr24@iitk.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Only <span className="font-semibold">@iitk.ac.in</span> email
          addresses are allowed.
        </p>

      </div>

    </div>
  );
}

export default Login;