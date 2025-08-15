"use client";

export default function ProductBubblesBackground() {
  const productImages = [
    "/Frog.jpeg",
    "/Pig.jpeg",
    "/Snoopy.jpeg",
    "/Sunny.jpeg"
  ];

  const positions = [
    { top: "5%", left: "5%", size: "16rem", img: 0 },   // Bigger
    { top: "8%", right: "6%", size: "14rem", img: 1 },  // Bigger
    { bottom: "6%", left: "8%", size: "15rem", img: 2 }, // Bigger
    { bottom: "4%", right: "4%", size: "17rem", img: 3 } // Biggest
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            width: pos.size,
            height: pos.size
          }}
        >
          <img
            src={productImages[pos.img]}
            alt="Product"
            className="w-full h-full object-cover rounded-full"
            style={{
              filter: "brightness(0.95) contrast(1)"
            }}
          />
        </div>
      ))}
    </div>
  );
}
