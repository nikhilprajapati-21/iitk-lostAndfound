import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Found() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    try {

      const response = await api.get("/items/found");

      setItems(response.data.items);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-green-600 mb-8">
          Found Items
        </h1>

        {loading ? (

          <p>Loading...</p>

        ) : items.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-8 text-center">
            No Found Items
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

                    <p className="mt-3">
                      📍 {item.location}
                    </p>

                    <p>
                      📞 {item.contact}
                    </p>

                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full h-fit">
                    FOUND
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

export default Found;