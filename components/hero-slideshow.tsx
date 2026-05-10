"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { src: "/images/hero-1.jpg", alt: "Venarium dashboard view 1" },
  { src: "/images/hero-2.jpg", alt: "Venarium dashboard view 2" },
  { src: "/images/hero-3.jpg", alt: "Venarium dashboard view 3" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="sr-only">{`Go to slide ${i + 1}`}</span>
          </button>
        ))}
      </div>
    </div>
  );
}