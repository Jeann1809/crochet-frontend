"use client";

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/navbar';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load sample products data
  useEffect(() => {
    setLoading(true);
    
    // Sample products data
    const sampleProducts = [
      {
        id: "frog-001",
        name: "Crochet Frog",
        category: "animals",
        price: 25.99,
        image: "/Frog.jpeg",
        description: "Adorable handmade crochet frog with green yarn",
        inStock: true
      },
      {
        id: "pig-001",
        name: "Crochet Pig",
        category: "animals",
        price: 22.99,
        image: "/Pig.jpeg",
        description: "Cute pink crochet pig perfect for decoration",
        inStock: true
      },
      {
        id: "snoopy-001",
        name: "Crochet Snoopy",
        category: "characters",
        price: 28.99,
        image: "/Snoopy.jpeg",
        description: "Classic Snoopy character in crochet form",
        inStock: false
      },
      {
        id: "sunny-001",
        name: "Crochet Sunny",
        category: "characters",
        price: 24.99,
        image: "/Sunny.jpeg",
        description: "Bright and cheerful crochet sun character",
        inStock: true
      }
    ];
    
    setProducts(sampleProducts);
    
    // Set categories
    setCategories([
      { value: 'all', label: 'All Products' },
      { value: 'animals', label: 'Animals' },
      { value: 'characters', label: 'Characters' }
    ]);
    
    setLoading(false);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-md pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-custom-darkBlue text-center mb-4">
            Shop Our Handmade Creations
          </h1>
          <p className="text-custom-mediumBlue text-lg text-center">
            Discover unique crochet pieces made with love and care
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-custom-darkBlue mb-2">
                Search Products
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-custom-darkBlue mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-custom-darkBlue mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          {loading ? (
            <p className="text-white text-lg">Loading products...</p>
          ) : (
            <p className="text-white text-lg">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-white hover:text-custom-darkBlue transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mediumBlue mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-custom-darkBlue mb-2">Loading Products</h3>
              <p className="text-custom-mediumBlue">Please wait while we load your products...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <svg className="mx-auto h-12 w-12 text-custom-mediumBlue mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-custom-darkBlue mb-2">No products found</h3>
              <p className="text-custom-mediumBlue">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
