import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { barcode } from "../api";

export default function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await barcode(code);
        setProduct(result.product);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-center text-red-600 text-xl font-semibold">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 px-4 sm:px-6 md:px-10 pb-10 lg:px-20 bg-black text-gray-900 dark:text-gray-100">
      <div className="bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-16 items-center md:items-start">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="rounded-2xl shadow-lg border border-gray-700 max-h-[60vh] sm:max-h-[70vh] w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        ) : (
          <div className="w-full sm:w-64 h-64 bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400 text-center text-lg font-medium px-4">
            No Image Available
          </div>
        )}

        <div className="flex-1 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-center md:text-left">
            {product.product_name}
          </h2>
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Brand:
              </span>{" "}
              {product.brands || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Categories:
              </span>{" "}
              {product.categories || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Ingredients:
              </span>{" "}
              {product.ingredients_text || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Nutriscore:
              </span>{" "}
              <span
                className={`inline-block px-3 py-1 rounded-full font-bold uppercase text-white ${
                  product.nutriscore_grade
                    ? {
                        a: "bg-green-600",
                        b: "bg-green-500",
                        c: "bg-yellow-500",
                        d: "bg-orange-500",
                        e: "bg-red-600",
                      }[product.nutriscore_grade.toLowerCase()] || "bg-gray-500"
                    : "bg-gray-400"
                }`}
              >
                {product.nutriscore_grade || "N/A"}
              </span>
            </p>
            <p>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Barcode:
              </span>{" "}
              {product.code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}