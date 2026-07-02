import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

function ReportItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "lost",
    itemName: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: "",
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      const response = await api.post("/items/create", data);

      toast.success(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to report item"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-3xl mx-auto py-10">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-blue-700 mb-8">
            Report Item
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="font-semibold">Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Item Name</label>

              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
                placeholder="Wallet"
              />
            </div>

            <div>
              <label className="font-semibold">Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
                placeholder="Accessories"
              />
            </div>

            <div>
              <label className="font-semibold">Description</label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">📷 Upload Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border rounded-xl p-3 mt-2"
              />

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-4 h-48 w-full object-cover rounded-xl border"
                />
              )}
            </div>

            <div>
              <label className="font-semibold">Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
                placeholder="Hall 3"
              />
            </div>

            <div>
              <label className="font-semibold">Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Contact Number</label>

              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
                placeholder="9876543210"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-lg font-semibold transition"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ReportItem;