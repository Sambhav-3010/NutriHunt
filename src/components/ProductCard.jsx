export default function ProductCard({ product, onReadMore }) {
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
          src={product.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={product.product_name || "Product image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-extrabold text-xl mb-2 text-gray-900 dark:text-gray-100 truncate">
          {product.product_name || "Unnamed Product"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
          <span className="font-semibold">Category:</span>{" "}
          {product.categories || "Unknown"}
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
              }[product.nutrition_grade_fr?.toUpperCase()] || "bg-gray-300 text-gray-800"
            }`}
          >
            {product.nutrition_grade_fr?.toUpperCase() || "?"}
          </span>
        </p>
        <button
          className="
            mt-auto
            w-full bg-white hover:bg-blue-700 text-black font-semibold py-2 rounded-lg
            transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400
          "
          onClick={(e) => {
            e.stopPropagation();
            onReadMore();
          }}
          aria-label={`Read more about ${product.product_name || "product"}`}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
