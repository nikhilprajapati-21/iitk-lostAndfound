import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

function CompleteProfile() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    hostel: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.rollNo ||
      !formData.hostel ||
      !formData.phone
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/complete-profile",
        {
          email,
          ...formData,
        }
      );

      localStorage.setItem("token", response.data.token);

      toast.success("Profile Completed Successfully");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex justify-center items-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Complete Profile
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Complete your profile to continue.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="font-semibold">
              IITK Email
            </label>

            <input
              value={email}
              disabled
              className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nikhil Prajapati"
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold">
              Roll Number
            </label>

            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="240888"
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold">
              Hostel
            </label>

            <input
              type="text"
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              placeholder="Hall 3"
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
          >
            {loading
              ? "Completing..."
              : "Complete Registration"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default CompleteProfile;