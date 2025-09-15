"use client";

import { useState, useEffect } from 'react';
import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import ProductCard from "./components/ProductCard";
import AboutSection from "./components/AboutSection";
import { getProducts } from "./services/products";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getProducts();
        const fetchedProducts = response.data;
        
        // Transform API response to match expected format
        const transformedProducts = fetchedProducts.map(product => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          inStock: product.stock > 0
        }));
        
        setTrendingProducts(transformedProducts);
      } catch (err) {
        // Handle error silently
        setError('Failed to load trending products. Please try again later.');
        // Fallback to sample data if API fails
        const sampleProducts = [
          {
            id: "689f69d0411d2fdeaf4fa46e",
            name: "Frog the Green",
            price: 65,
            image: "https://i.imgur.com/JwpCqoo.jpeg",
            description: "A whimsical green frog that hops into your heart",
            inStock: true
          },
          {
            id: "689f6a05411d2fdeaf4fa46f",
            name: "Pig the Pink",
            price: 16.75,
            image: "https://i.imgur.com/2Z6H6xD.jpeg",
            description: "A sweet pink pig that's perfect for cuddling",
            inStock: true
          },
          {
            id: "689f6a39411d2fdeaf4fa470",
            name: "Snoopy the Dog",
            price: 22,
            image: "https://i.imgur.com/xYKkYQM.jpeg",
            description: "A loyal companion made with love and care",
            inStock: true
          },
          {
            id: "689f6d00411d2fdeaf4fa471",
            name: "Sunny the Plushie",
            price: 18,
            image: "https://i.imgur.com/PPprfWm.jpeg",
            description: "A cheerful yellow plushie that brings sunshine to your day",
            inStock: true
          }
        ];
        
        setTrendingProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Mobile-optimized spacing */}
      <div className="pt-16 sm:pt-20">
        <Carousel />
      </div>
      
      {/* Trending Section - Mobile First */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-custom-lightBlue mb-3 sm:mb-4 font-dancing-script leading-tight">
            Trending Treasures
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-custom-darkBlue font-semibold font-quicksand px-4">
            Discover our most popular items
          </h2>
        </div>

        {/* Error Display - Mobile Optimized */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 mx-4 sm:mx-0">
            <div className="flex items-center justify-center sm:justify-start">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-inter text-sm sm:text-base">{error}</span>
            </div>
          </div>
        )}

        {/* Products Section - Mobile First Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mx-4 sm:mx-0">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mediumBlue mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-custom-darkBlue mb-2 font-quicksand">Loading Trending Products</h3>
                <p className="text-custom-mediumBlue font-inter text-sm sm:text-base">Please wait while we load your favorite items...</p>
              </div>
            </div>
          ) : trendingProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
                {trendingProducts.filter((_, index) => [1, 3, 4, 8].includes(index)).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* View All Products Button */}
              {trendingProducts.length > 4 && (
                <div className="text-center mt-8 sm:mt-12">
                  <a 
                    href="/shop"
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-custom-mediumBlue hover:bg-custom-darkBlue text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-quicksand text-sm sm:text-base"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Discover More Treasures
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mx-4 sm:mx-0">
                <svg className="mx-auto h-12 w-12 text-custom-mediumBlue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-custom-darkBlue mb-2 font-quicksand">No trending products found</h3>
                <p className="text-custom-mediumBlue font-inter text-sm sm:text-base">
                  We couldn&apos;t load the trending products at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <AboutSection />
    </div>
  );
}
