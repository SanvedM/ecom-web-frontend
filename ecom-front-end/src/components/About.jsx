import React from "react";

export default function About() {
  return (
<div className="bg-[#f5f3ef] py-10 px-6 md:px-12">

  <div className="max-w-6xl mx-auto">

    {/* HEADING */}
    <p className="text-xs tracking-[0.3em] text-gray-700 mb-1">
      INQUIRIES
    </p>

    <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
      Get in Touch
    </h2>

    <div className="grid md:grid-cols-2 gap-8">

      {/* LEFT FORM */}
      <form className="space-y-3">

        <div>
          <label className="text-xs text-gray-700">NAME</label>
          <input
            type="text"
            placeholder="Elisa Thorne"
            className="w-full border-b border-gray-600 bg-transparent py-1.5 outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">EMAIL</label>
          <input
            type="email"
            placeholder="elisa@example.com"
            className="w-full border-b border-gray-600 bg-transparent py-1.5 outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">SUBJECT</label>
          <input
            type="text"
            placeholder="General Inquiry"
            className="w-full border-b border-gray-600 bg-transparent py-1.5 outline-none text-gray-900"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">MESSAGE</label>
          <textarea
            rows="3"
            placeholder="How may we assist you today?"
            className="w-full border-b border-gray-600 bg-transparent py-1.5 outline-none text-gray-900"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 text-xs tracking-widest mt-3 hover:bg-gray-800 transition"
        >
          SEND MESSAGE
        </button>

      </form>

      {/* RIGHT SIDE */}
      <div className="space-y-4">

        <div>
          <h4 className="font-medium mb-1">The Atelier</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            458 Stonegate Lane, Suite 201 <br />
            London, W1X 7TU <br />
            United Kingdom
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-1">Direct Lines</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            concierge@aura.com <br />
            +44 (0) 20 7946 0123
          </p>
        </div>

        <div className="mt-4 h-44 bg-gray-300 rounded-md flex items-center justify-center placeholder-gray-400">
          Map Placeholder
        </div>

      </div>

    </div>

  </div>
</div>
  );
}