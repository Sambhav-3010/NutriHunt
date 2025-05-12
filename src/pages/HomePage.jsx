import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RollingGallery from '../components/Gallery.jsx';
export default function HomePage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const faqItems = [
    {
      question: "What is NutriHunt?",
      answer:
        "NutriHunt is a web application that allows users to search, filter, and explore detailed nutritional information about food products using the OpenFoodFacts API. Whether you're health-conscious, a curious foodie, or just looking for transparent food data - NutriHunt has you covered.",
    },
    {
      question: "How do I search for products?",
      answer:
        "Simply enter the product name in the search bar. You'll get instant results that you can further filter by category or sort by name, ingredients count, or nutritional score.",
    },
    {
      question: "What kind of information can I find about products?",
      answer:
        "NutriHunt provides comprehensive details including ingredients, nutritional values, allergens, additives, nutriscores, and more. You can see everything from calorie content to specific ingredients and potential allergens.",
    },
    {
      question: "Is NutriHunt available on mobile devices?",
      answer:
        "Yes! NutriHunt is designed with a responsive interface that works seamlessly on all screen sizes, from smartphones to desktop computers.",
    },
    {
      question: "Where does the product data come from?",
      answer:
        "NutriHunt sources its data from the OpenFoodFacts API, which is a free, open and collaborative database of food products from around the world, with ingredients, allergens, nutrition facts and all the information found on product labels.",
    },
  ];

  const toggleFaq = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="pt-20 flex items-center justify-center">
        <div className="h-5 text-7xl font-extrabold">NutriHunt</div>
      </div>
      <section className="relative min-h-screen overflow-hidden pt-40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover What's{" "}
              <span className="text-white underline decoration-gray-400">
                Really
              </span>{" "}
              in your food
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-xl">
              Search, filter, and explore detailed nutritional information about
              thousands of food products with NutriHunt.
            </p>
            <button
              onClick={() => navigate("/search")}
              className="bg-white hover:bg-gray-200 text-black text-lg font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Start Exploring
            </button>
          </div>
          <div className="w-full md:w-[40vw] flex justify-center z-10">
            <RollingGallery autoplay={true} pauseOnHover={true} />
          </div>
        </div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-black text-white rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-black text-white rounded-full filter blur-3xl opacity-20"></div>
      </section>

      <section className="py-16 px-6 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 bg-opacity-5 backdrop-filter backdrop-blur-md p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-white text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">Search Food Products</h3>
              <p className="text-gray-300">
                Find any product instantly by name with our powerful search
                capability.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-5 backdrop-filter backdrop-blur-md p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-white text-3xl mb-4">📁</div>
              <h3 className="text-xl font-bold mb-3">Filter by Category</h3>
              <p className="text-gray-300">
                Narrow your search by snacks, beverages, dairy, and many other
                categories.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-5 backdrop-filter backdrop-blur-md p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-white text-3xl mb-4">⬆️</div>
              <h3 className="text-xl font-bold mb-3">Sort Products</h3>
              <p className="text-gray-300">
                Arrange results by name, ingredients count, or nutritional
                score.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-5 backdrop-filter backdrop-blur-md p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="text-white text-3xl mb-4">🧊</div>
              <h3 className="text-xl font-bold mb-3">View Detailed Info</h3>
              <p className="text-gray-300">
                Access comprehensive data including ingredients, labels,
                allergens, and nutrients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="bg-black bg-opacity-5 backdrop-filter backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
              >
                <button
                  className="w-full p-5 text-left font-medium text-xl flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      expanded === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expanded === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-5 pt-0 text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to discover what's in your food?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey to better nutrition awareness today. NutriHunt
            helps you make informed decisions about the food you consume.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="bg-white hover:bg-gray-200 text-black text-lg font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400 mb-2">
            Powered by{" "}
            <a
              href="https://openfoodfacts.org/"
              className="underline hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              OpenFoodFacts API
            </a>
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NutriHunt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
