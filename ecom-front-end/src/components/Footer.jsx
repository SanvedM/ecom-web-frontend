import React from "react";

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-[#1a1a1a] via-[#2a1f24] to-[#1a1a1a] border-t border-[#2a2a2a] py-8 px-6 md:px-16">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT LOGO */}
        <div className="text-lg md:text-xl font-serif font-semibold tracking-[0.35em] text-[#ffe4e9]">
          AURA
        </div>

        {/* CENTER LINKS */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base font-medium text-[#e8aeb7] tracking-wide">
          <span className="hover:text-[#f9c6ce] transition cursor-pointer">
            SUSTAINABILITY
          </span>
          <span className="hover:text-[#f9c6ce] transition cursor-pointer">
            SHIPPING & RETURNS
          </span>
          <span className="hover:text-[#f9c6ce] transition cursor-pointer">
            PRIVACY POLICY
          </span>
          <span className="hover:text-[#f9c6ce] transition cursor-pointer">
            STORE LOCATOR
          </span>
        </div>

        {/* RIGHT COPYRIGHT */}
        <div className="text-xs md:text-sm text-[#cfa3ab] text-center md:text-right">
          © 2026 AURA ACCESSORIES. ALL RIGHTS RESERVED.
        </div>

      </div>

    </div>
  );
}