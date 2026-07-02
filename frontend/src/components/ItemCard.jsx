function ItemCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between">

        <div className="flex-1">

          <h2 className="text-2xl font-bold">
            {item.itemName}
          </h2>

          <p className="text-gray-600 mt-2">
            {item.description}
          </p>

          <div className="mt-4 space-y-1 text-gray-700">

            <p>
              📍 <span className="font-medium">{item.location}</span>
            </p>

            <p>
              📅 {item.date}
            </p>

            <p>
              📞 {item.contact}
            </p>

            <p>
              🏷 Category: {item.category}
            </p>

          </div>

        </div>

        <div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              item.type === "lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.type.toUpperCase()}
          </span>

        </div>

      </div>

    </div>
  );
}

export default ItemCard;