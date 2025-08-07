"use client";

import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Carousel />
      </div>
      <div className="pt-10">
        <h3 className="text-2xl font-semibold text-center text-custom-navyBlue">Trending Treasures</h3>
        <h4 className="text-xl text-center text-custom-lightBlue">Discover our most popular items</h4>
      </div>


      <div className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            name="Sunny the Plushie"
            price={29.99}
            image="/Sunny.jpeg"
            description="A cheerful yellow plushie that brings sunshine to your day"
            onAddToCart={(product) => console.log('Added to cart:', product)}
          />
          <ProductCard 
            name="Snoopy the Dog"
            price={34.99}
            image="/Snoopy.jpeg"
            description="A loyal companion made with love and care"
            onAddToCart={(product) => console.log('Added to cart:', product)}
          />
          <ProductCard 
            name="Frog the Green"
            price={24.99}
            image="/Frog.jpeg"
            description="A whimsical green frog that hops into your heart"
            onAddToCart={(product) => console.log('Added to cart:', product)}
          />
          <ProductCard 
            name="Pig the Pink"
            price={27.99}
            image="/Pig.jpeg"
            description="A sweet pink pig that's perfect for cuddling"
            onAddToCart={(product) => console.log('Added to cart:', product)}
          />
        </div>
      </div>
    </div>
    
  );
}
