import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Search Filter
  const filteredItems = items.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.itemName.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Search, report and recover lost items across IIT Kanpur.
        </p>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search lost & found items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-8 w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <button
            onClick={() => navigate("/report-item")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 transition"
          >
            <div className="text-5xl mb-3">➕</div>

            <h2 className="text-2xl font-bold">
              Report Item
            </h2>

            <p className="mt-2 text-blue-100">
              Report a Lost or Found item
            </p>
          </button>

          <button
            onClick={() => navigate("/myposts")}
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 transition"
          >
            <div className="text-5xl mb-3">📋</div>

            <h2 className="text-2xl font-bold">
              My Posts
            </h2>

            <p className="mt-2 text-green-100">
              View your reported items
            </p>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-8 transition"
          >
            <div className="text-5xl mb-3">👤</div>

            <h2 className="text-2xl font-bold">
              Profile
            </h2>

            <p className="mt-2 text-purple-100">
              View and edit your profile
            </p>
          </button>
        </div>

        {/* Recent Posts */}

        <h2 className="text-2xl font-bold mt-12 mb-2">
          Recent Posts
        </h2>

        <p className="text-gray-500 mb-6">
          {filteredItems.length} item(s) found
        </p>

        {loading ? (
          <p className="text-gray-500">Loading items...</p>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            No matching items found.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-xl">
                      {item.itemName}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {item.type === "lost" ? "Lost" : "Found"} near{" "}
                      {item.location}
                    </p>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                    <p className="text-sm text-gray-400 mt-4">
                      Category: {item.category}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full h-fit font-semibold ${
                      item.type === "lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;