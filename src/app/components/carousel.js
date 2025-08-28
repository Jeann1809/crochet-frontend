"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTextAnimating, setIsTextAnimating] = useState(false);
    const router = useRouter();

    const slides = [
        {
          color: '#f4d58d',
          bigText: 'Cozy Creations ☀️',
          smallText: 'Wrap yourself in handmade love',
          image: '/Sunny.jpeg',
        },
        {
          color: '#ffb3c6',
          bigText: 'Crafted with Care ❤️',
          smallText: 'Every stitch tells a story',
          image: '/Snoopy.jpeg',
        },
        {
          color: '#b5ead7',
          bigText: 'Whimsy & Warmth 🐸',
          smallText: 'Find your new favorite plushie',
          image: '/Frog.jpeg',
        },
        {
          color: '#ffc8dd',
          bigText: 'Snuggly & Sweet 🐷',
          smallText: 'Perfect gifts for every heart',
          image: '/Pig.jpeg',
        },
      ];
      

    const nextSlide = () => {
        setIsTextAnimating(true);
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => setIsTextAnimating(false), 300);
    };

    const prevSlide = () => {
        setIsTextAnimating(true);
        setCurrentSlide(prev => Math.max(0, prev - 1));
        setTimeout(() => setIsTextAnimating(false), 300);
    };

    return (
        <div className="relative w-full h-[calc(100vh-5rem)] sm:h-[calc(100vh-5rem)] overflow-hidden">
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {/* Duplicate slides for infinite effect */}
                {[...slides, ...slides, ...slides, ...slides, ...slides].map((slide, index) => (
                    <div key={index} className="flex flex-col md:flex-row w-full flex-shrink-0 h-full">
                        {/* Mobile: Stack vertically, Desktop: Side by side */}
                        {index % 2 === 0 ? (
                            <>
                                {/* Text side - Mobile: top, Desktop: left */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ backgroundColor: slide.color }}>
                                    <div className={`text-center text-white transition-all duration-300 ${isTextAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 font-dancing-script leading-tight">
                                        {slide.bigText}
                                    </h1>
                                    <p className="text-lg sm:text-xl md:text-3xl text-custom-darkBlue font-semibold font-quicksand mb-4 sm:mb-6 px-2 sm:px-0">
                                        {slide.smallText}
                                    </p>
                                        <button 
                                            onClick={() => router.push('/shop')}
                                            className="mt-3 sm:mt-4 md:mt-6 bg-white text-gray-800 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-md hover:scale-95 active:scale-90 transition-all duration-200 ease-in-out text-sm sm:text-base md:text-lg font-quicksand border border-gray-200 shadow-sm active:shadow-md"
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                                {/* Image side - Mobile: bottom, Desktop: right */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-200 flex items-center justify-center">
                                    <img src={slide.image} alt="Product Image" className="w-full h-full object-cover" />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Image side - Mobile: top, Desktop: left */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-200 flex items-center justify-center">
                                    <img src={slide.image} alt="Product Image" className="w-full h-full object-cover" />
                                </div>
                                {/* Text side - Mobile: bottom, Desktop: right */}
                                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ backgroundColor: slide.color }}>
                                    <div className={`text-center text-white transition-all duration-300 ${isTextAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 font-dancing-script leading-tight">
                                        {slide.bigText}
                                    </h1>
                                    <p className="text-lg sm:text-xl md:text-3xl text-custom-darkBlue font-semibold font-quicksand mb-4 sm:mb-6 px-2 sm:px-0">
                                        {slide.smallText}
                                    </p>
                                        <button 
                                            onClick={() => router.push('/shop')}
                                            className="mt-3 sm:mt-4 md:mt-6 bg-white text-gray-800 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-md hover:scale-95 active:scale-90 transition-all duration-200 ease-in-out text-sm sm:text-base md:text-lg font-quicksand border border-gray-200 shadow-sm active:shadow-md"
                                        >
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Arrows - Mobile Optimized */}
            <button 
                onClick={prevSlide} 
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 active:bg-opacity-100 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all active:scale-95"
                aria-label="Previous slide"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 active:bg-opacity-100 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all active:scale-95"
                aria-label="Next slide"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
