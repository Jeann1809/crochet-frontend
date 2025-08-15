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
        <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden">
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
                                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: slide.color }}>
                                    <div className={`text-center text-white transition-all duration-300 ${isTextAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                    <h1 className="text-6xl font-bold text-white mb-4" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
                                        textShadow: '3px 3px 0px #1e40af, 6px 6px 0px #1e3a8a',
                                        transform: 'rotate(1deg)',
                                        display: 'inline-block'
                                    }}>
                                        {slide.bigText}
                                    </h1>
                                    <p className="text-2xl text-custom-darkBlue font-semibold" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive"
                                    }}>
                                        {slide.smallText}
                                    </p>
                                        <button 
                                            onClick={() => router.push('/shop')}
                                            className="mt-4 md:mt-6 bg-white text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
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
                                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4 md:p-8" style={{ backgroundColor: slide.color }}>
                                    <div className={`text-center text-white transition-all duration-300 ${isTextAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                    <h1 className="text-6xl font-bold text-white mb-4" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
                                        textShadow: '3px 3px 0px #1e40af, 6px 6px 0px #1e3a8a',
                                        transform: 'rotate(1deg)',
                                        display: 'inline-block'
                                    }}>
                                        {slide.bigText}
                                    </h1>
                                    <p className="text-2xl text-custom-darkBlue font-semibold" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive"
                                    }}>
                                        {slide.smallText}
                                    </p>
                                        <button 
                                            onClick={() => router.push('/shop')}
                                            className="mt-4 md:mt-6 bg-white text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
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

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
