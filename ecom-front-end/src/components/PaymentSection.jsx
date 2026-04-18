import React from "react";

export default function PaymentSection({ onCOD, onOnline }) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-6 text-[#0f3d33]">
        Payment Method
      </h2>

      <div className="space-y-4">

        <div className="bg-[#eef0ed] p-5 rounded flex justify-between items-center">
          <span>💳 Pay Online</span>
          <button
            onClick={onOnline}
            disabled
            className="bg-[#0f3d33] text-white px-4 py-2 rounded"
          >
            Pay Online (Not Available)
          </button>
        </div>

        <div className="bg-[#eef0ed] p-5 rounded flex justify-between items-center">
          <span>🚚 Cash on Delivery</span>
          <button
            onClick={onCOD}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>

      </div>

    </div>
  );
}