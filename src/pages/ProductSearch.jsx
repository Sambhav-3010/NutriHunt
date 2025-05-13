import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { name, category, barcode } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function HomePage() {
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("chocolate");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("name-asc");
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState([]);
  const observer = useRef();
  const navigate = useNavigate();

  const predefinedCategories = [
    "beverage", "snacks", "breakfast-cereals", "dairies",
    "pizzas", "plant-based-foods", "biscuits", "soft-drinks",
    "frozen-foods", "baby-foods",
  ];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const applySortAndFilter = (items) => {
    let sorted = [...items];
    if (filter) {
      sorted = sorted.filter((p) =>
        p.categories_tags?.some((cat) =>
          cat.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    if (sortBy === "name-asc") {
      sorted.sort((a, b) =>
        (a.product_name || "").localeCompare(b.product_name || "")
      );
    } else if (sortBy === "name-desc") {
      sorted.sort((a, b) =>
        (b.product_name || "").localeCompare(a.product_name || "")
      );
    } else if (sortBy === "grade-asc") {
      sorted.sort((a, b) =>
        (a.nutrition_grades || "").localeCompare(b.nutrition_grades || "")
      );
    } else if (sortBy === "grade-desc") {
      sorted.sort((a, b) =>
        (b.nutrition_grades || "").localeCompare(a.nutrition_grades || "")
      );
    }
    return sorted;
  };

  const fetchData = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let result;
      if (searchType === "name") {
        result = await name(query, reset ? 1 : page);
      } else if (searchType === "category") {
        result = await category(query, reset ? 1 : page);
      } else if (searchType === "barcode") {
        result = await barcode(query);
        setProducts(result.product ? [result.product] : []);
        setHasMore(false);
        setLoading(false);
        return;
      }
      const newProducts = result.products || [];
      const updatedProducts = reset
        ? newProducts
        : [...products, ...newProducts];
      setProducts(applySortAndFilter(updatedProducts));
      setHasMore(newProducts.length >= 15);
    } catch (error) {
      if (reset) setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    if (query.trim()) {
      setLoading(true);
      fetchData(true);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query, searchType]);

  useEffect(() => {
    setProducts((prev) => applySortAndFilter(prev));
  }, [sortBy, filter]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (page > 1 && query.trim()) fetchData();
  }, [page]);

  const handleReadMore = (code) => {
    navigate(`/product/${code}`);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productCode) => {
    const updatedCart = cart.filter((item) => item.code !== productCode);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="w-full min-h-screen bg-black text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <Link to= "/" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center sm:text-left">
            NutriHunt
          </Link>
          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-black cursor-pointer font-bold py-2 px-4 rounded"
          >
            View Cart ({cart.length})
          </button>
        </header>

        <section className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center">
          <SearchBar
            value={query}
            onChange={(val) => setQuery(val)}
            placeholder={`Search by ${searchType}...`}
            className="flex-grow bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-5 py-3 rounded-lg bg-gray-900 text-white font-semibold border border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            <option value="name">Search by Name</option>
            <option value="category">Search by Category</option>
            <option value="barcode">Search by Barcode</option>
          </select>
        </section>

        <section className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <select
            value=""
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setSearchType("name");
            }}
            className="px-5 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 shadow-md"
          >
            <option value="">Choose a Category</option>
            {predefinedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/-/g, " ")}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 shadow-md"
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="grade-asc">Sort by Nutrition Grade (A-E)</option>
            <option value="grade-desc">Sort by Nutrition Grade (E-A)</option>
          </select>
        </section>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 && !loading && query.trim() !== "" && (
            <p className="col-span-full text-center text-red-400 text-lg font-semibold">
              No products found.
            </p>
          )}
          {products.map((p, index) => {
            const Card = (
              <ProductCard
                product={p}
                key={p.code}
                cart={cart}
                onReadMore={() => handleReadMore(p.code)}
                onAddToCart={() => addToCart(p)}
                onRemoveFromCart={() => removeFromCart(p.code)}
              />
            );
            if (products.length === index + 1) {
              return (
                <div ref={lastProductRef} key={p.code}>
                  {Card}
                </div>
              );
            } else {
              return <div key={p.code}>{Card}</div>;
            }
          })}
        </main>

        {loading && (
          <div className="flex justify-center items-center mt-12">
            <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
