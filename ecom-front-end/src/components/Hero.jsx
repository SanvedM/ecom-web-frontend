import React from "react";
import img1 from "../assets/img1.jpg";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">

      {/* BACKGROUND IMAGE */}
      <img
        src={img1}
        alt="hero"
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* TEXT RIGHT SIDE */}
      <div className="absolute inset-0 flex items-center justify-end px-10 md:px-20">
        <div className="max-w-xl text-white text-right">
          
          <p className="text-xs tracking-[0.3em] mb-4 opacity-80">
            THE INAUGURAL COLLECTION
          </p>

          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
            The Modern <br />
            <span className="italic">Heirloom</span>
          </h1>

          <p className="mb-6 text-sm opacity-90">
            Sculpted forms designed to transcend seasons.
          </p>

          <button className="bg-white text-black px-6 py-3 text-xs tracking-wider">
            SHOP COLLECTION
          </button>

        </div>
      </div>
    </div>
  );
}