import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Profile() {

  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    lost: 0,
    found: 0,
    returned: 0,
  });

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    hostel: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {

      const res = await api.get("/profile");

      setProfile(res.data.profile);

      setFormData({
        name: res.data.profile.name || "",
        rollNo: res.data.profile.rollNo || "",
        hostel: res.data.profile.hostel || "",
        phone: res.data.profile.phone || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {

    try {

      const res = await api.get("/items/myposts");

      const items = res.data.items;

      setStats({
        total: items.length,
        lost: items.filter(i => i.type === "lost").length,
        found: items.filter(i => i.type === "found").length,
        returned: items.filter(i => i.status === "returned").length,
      });

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    try {

      await api.put("/profile", formData);

      alert("Profile Updated!");

      setEditing(false);

      fetchProfile();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="flex items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl">

              👤

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                {profile.name}

              </h1>

              <p className="text-gray-500">

                {profile.email}

              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div>

              <p className="font-semibold">Roll Number</p>

              <p>{profile.rollNo}</p>

            </div>

            <div>

              <p className="font-semibold">Hostel</p>

              <p>{profile.hostel}</p>

            </div>

            <div>

              <p className="font-semibold">Phone</p>

              <p>{profile.phone}</p>

            </div>

          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-10">

            <div className="bg-blue-100 rounded-xl p-5 text-center">

              <h2 className="text-3xl font-bold">

                {stats.total}

              </h2>

              <p>Total Posts</p>

            </div>

            <div className="bg-red-100 rounded-xl p-5 text-center">

              <h2 className="text-3xl font-bold">

                {stats.lost}

              </h2>

              <p>Lost</p>

            </div>

            <div className="bg-green-100 rounded-xl p-5 text-center">

              <h2 className="text-3xl font-bold">

                {stats.found}

              </h2>

              <p>Found</p>

            </div>

            <div className="bg-purple-100 rounded-xl p-5 text-center">

              <h2 className="text-3xl font-bold">

                {stats.returned}

              </h2>

              <p>Returned</p>

            </div>

          </div>

          {!editing ? (

            <button

              onClick={() => setEditing(true)}

              className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"

            >

              ✏ Edit Profile

            </button>

          ) : (

            <div className="mt-10 border-t pt-8">

              <h2 className="text-2xl font-bold mb-6">

                Edit Profile

              </h2>

              <div className="space-y-5">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border rounded-lg p-3"
                />

                <input
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="Roll Number"
                  className="w-full border rounded-lg p-3"
                />

                <input
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                  placeholder="Hostel"
                  className="w-full border rounded-lg p-3"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full border rounded-lg p-3"
                />

                <div className="flex gap-4">

                  <button

                    onClick={handleSave}

                    className="bg-green-600 text-white px-8 py-3 rounded-xl"

                  >

                    Save

                  </button>

                  <button

                    onClick={() => setEditing(false)}

                    className="bg-gray-500 text-white px-8 py-3 rounded-xl"

                  >

                    Cancel

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Profile;