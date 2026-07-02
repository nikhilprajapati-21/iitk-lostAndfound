import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyPosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await api.get("/items/myposts");

      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/items/${id}`);

      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      alert("Item deleted successfully!");
    } catch (error) {
      console.log(error);

      alert("Failed to delete item.");
    }
  };

  const handleMarkReturned = async (id) => {
    const confirmReturn = window.confirm(
      "Mark this item as returned?"
    );

    if (!confirmReturn) return;

    try {
      await api.patch(`/items/${id}/return`);

      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      alert("Item marked as returned!");
    } catch (error) {
      console.log(error);

      alert("Failed to update item.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          My Posts
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            No Posts Yet
          </div>
        ) : (
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.itemName}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                    <p className="mt-2">
                      📍 {item.location}
                    </p>

                    <p>
                      📞 {item.contact}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      Category: {item.category}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full h-fit text-white ${
                      item.type === "lost"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg">
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    🗑 Delete
                  </button>

                  <button
                    onClick={() => handleMarkReturned(item.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    ✅ Mark Returned
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPosts;