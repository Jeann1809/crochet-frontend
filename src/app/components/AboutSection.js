"use client";

export default function AboutSection() {
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
            <h2 className="text-3xl font-semibold text-custom-navyBlue mb-4">Handmade With Love</h2>
            <p className="text-gray-100 leading-relaxed mb-6">
              Hi! My name is <span className="font-semibold">Mariana Reyes</span> and this is my little side business, where every stitch tells a story. All the products you see here are 100% handmade by me, crafted with love, patience, and a sprinkle of joy. Every piece is the result of countless hours of hard work, from choosing the softest yarn to giving each creation its own personality. My hope is that my work can bring a smile to your face, a bit of warmth to your home, and a touch of handmade magic to your life.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center bg-white justify-center px-3 py-1 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue transition-colors"
                aria-label="Instagram"
              >
                <img src="/instagram.svg" alt="Instagram" className="w-8 h-8" />
              </a>
              <a
                href="https://gmail.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center bg-white justify-center px-3 py-1 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue transition-colors"
                aria-label="Facebook"
              >
                <img src="/gmail.svg" alt="Gmail" className="w-8 h-8" />
              </a>
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-custom-lightBlue text-white font-semibold hover:bg-custom-mediumBlue transition-colors"
                aria-label="TikTok"
              >
                <img src="/phone.svg" alt="Phone" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


