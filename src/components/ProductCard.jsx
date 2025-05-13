export default function ProductCard({ product, onReadMore, onAddToCart, cart }) {
  const isInCart = cart?.some(item => item.code === product.code);
  return (
    <div
      className="
        dark:border-gray-700
        overflow-hidden
        transition-transform duration-300 hover:scale-105 hover:shadow-2xl
        cursor-pointer bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg p-8 shadow-xl shadow-[#027af23b] border border-white/20 rounded-4xl flex flex-col h-[80vh]
      "
      onClick={onReadMore}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onReadMore();
      }}
      aria-label={`Read more about ${product.product_name || "product"}`}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <img
          src={
            product.image_url ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.product_name || "Product image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 overflow-hidden">
        <h2 className="font-extrabold text-xl mb-2 text-gray-900 dark:text-gray-100 truncate">
          {product.product_name || "Unnamed Product"}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 truncate">
          <span className="font-semibold">Brand:</span>{" "}
          {product.brands || "Unknown"}
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 truncate">
          <span className="font-semibold">Category:</span>{" "}
          {product.categories || "Unknown"}
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 truncate">
          <span className="font-semibold">Quantity:</span>{" "}
          {product.quantity || "N/A"}
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 line-clamp-2">
          <span className="font-semibold">Ingredients:</span>{" "}
          {product.ingredients_text || "Not specified"}
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 truncate">
          <span className="font-semibold">Countries:</span>{" "}
          {product.countries || "N/A"}
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
          <span className="font-semibold">Nutrition Grade:</span>{" "}
          <span
            className={`inline-block px-2 py-0.5 rounded-md font-semibold uppercase text-xs ${
              {
                A: "bg-green-600 text-white",
                B: "bg-green-500 text-white",
                C: "bg-yellow-400 text-white",
                D: "bg-orange-500 text-white",
                E: "bg-red-600 text-white",
              }[product.nutrition_grade_fr?.toUpperCase()] ||
              "bg-gray-300 text-gray-800"
            }`}
          >
            {product.nutrition_grade_fr?.toUpperCase() || "?"}
          </span>
        </p>

        <div className="mt-auto flex gap-2">
          <button
            className="
              flex-1 bg-white text-black font-semibold py-2 rounded-lg
              transition-colors duration-300 cursor-pointer
            "
            onClick={(e) => {
              e.stopPropagation();
              onReadMore();
            }}
            aria-label={`Read more about ${product.product_name || "product"}`}
          >
            Read More
          </button>

          <div className="mt-auto">
            {isInCart ? (
              <div className="text-white font-semibold text-center py-2 px-2 rounded-lg">
                ✔Added to Cart
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                className="bg-white text-black font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-500 cursor-pointer"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
