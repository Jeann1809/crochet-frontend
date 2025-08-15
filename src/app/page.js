"use client";

import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import ProductCard from "./components/ProductCard";
import AboutSection from "./components/AboutSection";



export default function Home() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            product={{
              name: "Sunny the Plushie",
              price: 29.99,
              image: "/Sunny.jpeg",
              description: "A cheerful yellow plushie that brings sunshine to your day"
            }}
          />
          <ProductCard 
            product={{
              name: "Snoopy the Dog",
              price: 34.99,
              image: "/Snoopy.jpeg",
              description: "A loyal companion made with love and care"
            }}
          />
          <ProductCard 
            product={{
              name: "Frog the Green",
              price: 24.99,
              image: "/Frog.jpeg",
              description: "A whimsical green frog that hops into your heart"
            }}
          />
          <ProductCard 
            product={{
              name: "Pig the Pink",
              price: 27.99,
              image: "/Pig.jpeg",
              description: "A sweet pink pig that's perfect for cuddling"
            }}
          />
        </div>
      </div>
      <AboutSection />
    </div>
    
  );
}
