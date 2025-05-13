import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (code) => {
    const updatedCart = cart.filter((item) => item.code !== code);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 py-10">
      <h2 className="text-4xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div
              key={item.code}
              className="dark:border-gray-700 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg p-8 shadow-xl shadow-[#027af23b] border border-white/20 rounded-4xl flex flex-col h-[80vh]"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={item.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={item.product_name || "Product image"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 overflow-hidden">
                <h2 className="font-extrabold text-xl mb-2 text-gray-100 truncate">
                  {item.product_name || "Unnamed Product"}
                </h2>

                <p className="text-gray-300 text-sm mb-1 truncate">
                  <span className="font-semibold">Brand:</span> {item.brands || "Unknown"}
                </p>

                <p className="text-gray-300 text-sm mb-1 truncate">
                  <span className="font-semibold">Category:</span> {item.categories || "Unknown"}
                </p>

                <p className="text-gray-300 text-sm mb-1 truncate">
                  <span className="font-semibold">Quantity:</span> {item.quantity || "N/A"}
                </p>

                <p className="text-gray-300 text-sm mb-1 line-clamp-2">
                  <span className="font-semibold">Ingredients:</span> {item.ingredients_text || "Not specified"}
                </p>

                <p className="text-gray-300 text-sm mb-1 truncate">
                  <span className="font-semibold">Countries:</span> {item.countries || "N/A"}
                </p>

                <p className="text-gray-300 text-sm mb-4">
                  <span className="font-semibold">Nutrition Grade:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md font-semibold uppercase text-xs ${
                      {
                        A: "bg-green-600 text-white",
                        B: "bg-green-500 text-white",
                        C: "bg-yellow-400 text-white",
                        D: "bg-orange-500 text-white",
                        E: "bg-red-600 text-white",
                      }[item.nutrition_grade_fr?.toUpperCase()] || "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {item.nutrition_grade_fr?.toUpperCase() || "?"}
                  </span>
                </p>

                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.code);
                    }}
                    className="w-full bg-red-600 hover:bg-red-800 text-white font-semibold py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/search")}
        className="mt-10 inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
      >
        Back to Search
      </button>
    </div>
  );
}
