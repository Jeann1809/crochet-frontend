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
        console.error('Error fetching trending products:', err);
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
    <div>
      <Navbar />
      <div className="pt-20">
        <Carousel />
      </div>
      <div className="pt-10 text-center">
      <h4 className="text-4xl font-bold text-custom-lightBlue mb-4" style={{
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
          textShadow: '2px 2px 0px #1e40af, 4px 4px 0px #1e3a8a',
          display: 'inline-block'
      }}>
            Trending Treasures
      </h4>
      <h4 className="text-xl text-custom-darkBlue font-semibold" style={{
      fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive"
      }}>
           Discover our most popular items
      </h4>
      </div>


      <div className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mediumBlue mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-custom-darkBlue mb-2">Loading Trending Products</h3>
              <p className="text-custom-mediumBlue">Please wait while we load your favorite items...</p>
            </div>
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <svg className="mx-auto h-12 w-12 text-custom-mediumBlue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-custom-darkBlue mb-2">No trending products found</h3>
              <p className="text-custom-mediumBlue">
                We couldn't load the trending products at the moment.
              </p>
            </div>
          </div>
        )}
      </div>
      <AboutSection />
    </div>
    
  );
}
