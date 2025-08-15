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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image / Placeholder */}
          <div className="relative">
            <div className="aspect-square w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-md">
              <img
                src="/mari.jpeg"
                alt="Mariana Reyes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text + Socials */}
          <div>
          <h4 className="text-4xl font-bold text-white mb-4" style={{
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive",
          textShadow: '2px 2px 0px #1e40af, 4px 4px 0px #1e3a8a',
          display: 'inline-block'
            }}>
            Handmade With Love
            </h4>
            <p className="text-gray-100 leading-relaxed mb-6" style={{
                                        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive"
                                    }}>
              Hi! My name is <span className="font-semibold">Mariana Reyes</span> and this is my little side business, where every stitch tells a story. All the products you see here are 100% handmade by me, crafted with love, patience, and a sprinkle of joy. Every piece is the result of countless hours of hard work, from choosing the softest yarn to giving each creation its own personality. My hope is that my work can bring a smile to your face, a bit of warmth to your home, and a touch of handmade magic to your life.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/marimar.crochet?igsh=MjA1ajczOGZqdzR2"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center bg-white justify-center px-3 py-1 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue transition-colors"
                aria-label="Instagram"
              >
                <img src="/instagram.svg" alt="Instagram" className="w-8 h-8" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=marimarcrochet@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white justify-center px-3 py-1 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue transition-colors"
                aria-label="Email"
              >
                  <img src="/gmail.svg" alt="Gmail" className="w-8 h-8" />
              </a>

              <button
                onClick={handlePhoneClick}
                className={`inline-flex items-center justify-center px-3 py-1 rounded-lg transition-all duration-200 ${
                  phoneCopied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white hover:bg-custom-mediumBlue text-custom-lightBlue'
                }`}
                aria-label="Copy phone number"
              >
                <img src="/phone.svg" alt="Phone" className="w-8 h-8" />
                {phoneCopied && (
                  <span className="ml-2 text-sm font-medium">
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


