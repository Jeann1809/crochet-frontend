"use client";

import { useState } from 'react';

export default function AboutSection() {
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handlePhoneClick = async () => {
    try {
      await navigator.clipboard.writeText('+1 8065598812');
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy phone number:', err);
    }
  };

  return (
    <section id="about" className="bg-custom-lightBlue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Image / Placeholder - Mobile Optimized */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-square w-full max-w-xs sm:max-w-sm mx-auto rounded-xl overflow-hidden shadow-md">
              <img
                src="/mari.jpeg"
                alt="Mariana Reyes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text + Socials - Mobile Optimized */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-dancing-script leading-tight">
              Handmade With Love
            </h2>
            <p className="text-gray-100 leading-relaxed mb-6 sm:mb-8 font-inter text-sm sm:text-base px-2 sm:px-0">
              Hi! My name is <span className="font-semibold font-quicksand">Mariana Reyes</span> and this is my little side business, where every stitch tells a story. All the products you see here are 100% handmade by me, crafted with love, patience, and a sprinkle of joy. Every piece is the result of countless hours of hard work, from choosing the softest yarn to giving each creation its own personality. My hope is that my work can bring a smile to your face, a bit of warmth to your home, and a touch of handmade magic to your life.
            </p>

            {/* Social Links - Mobile Optimized */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/marimar.crochet?igsh=MjA1ajczOGZqdzR2"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center bg-white justify-center p-2 sm:p-3 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue active:bg-custom-mediumBlue transition-colors shadow-sm active:shadow-md"
                aria-label="Instagram"
              >
                <img src="/instagram.svg" alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=marimarcrochet@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white justify-center p-2 sm:p-3 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue active:bg-custom-mediumBlue transition-colors shadow-sm active:shadow-md"
                aria-label="Email"
              >
                  <img src="/gmail.svg" alt="Gmail" className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>

              <button
                onClick={handlePhoneClick}
                className={`inline-flex items-center justify-center p-2 sm:p-3 rounded-lg transition-all duration-200 shadow-sm active:shadow-md ${
                  phoneCopied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white hover:bg-custom-mediumBlue active:bg-custom-mediumBlue text-custom-lightBlue'
                }`}
                aria-label="Copy phone number"
              >
                <img src="/phone.svg" alt="Phone" className="w-6 h-6 sm:w-8 sm:h-8" />
                {phoneCopied && (
                  <span className="ml-2 text-xs sm:text-sm font-medium font-quicksand hidden sm:inline">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


