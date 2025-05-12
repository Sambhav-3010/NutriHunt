import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  name,
  category,
  barcode,
} from "../api";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function HomePage() {
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("chocolate");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();

  const fetchData = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      let result;
      if (searchType === "name") {
        result = await name(query, page);
      } else if (searchType === "category") {
        result = await category(query, page);
      } else if (searchType === "barcode") {
        result = await barcode(query);
        setProducts(result.product ? [result.product] : []);
        setHasMore(false);
        setLoading(false);
        return;
      }
      const newProducts = result.products || [];
      setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));
      setHasMore(newProducts.length >= 15);
    } catch (error) {
      if (reset) setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    if (query.trim()) fetchData(true);
  }, [query, searchType]);

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
    if (page > 1) fetchData();
  }, [page]);

  const handleReadMore = (code) => {
    navigate(`/product/${code}`);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center sm:text-left">
            Food Product Explorer
          </h1>
        </header>

        <section className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={`Search by ${searchType}...`}
            className="
              flex-grow
              bg-gray-900 text-white border border-gray-700
              rounded-lg px-4 py-3 shadow-md
              focus:outline-none focus:ring-2 focus:ring-white
            "
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-5 py-3 rounded-lg bg-gray-900 text-white font-semibold border border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-white transition"
            aria-label="Select search type"
          >
            <option value="name">Search by Name</option>
            <option value="category">Search by Category</option>
            <option value="barcode">Search by Barcode</option>
          </select>
        </section>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 && !loading && (
            <p className="col-span-full text-center text-gray-400">
              No products found. Try a different search.
            </p>
          )}
          {products.map((p, index) => {
            const Card = (
              <ProductCard
                product={p}
                key={p.code}
                onReadMore={() => handleReadMore(p.code)}
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
