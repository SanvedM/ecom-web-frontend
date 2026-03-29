import React, { useState } from "react";

export default function MyOrders() {

  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Gold Ring",
      price: 2499,
      qty: 1,
      status: "Delivered",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
    },
    {
      id: 2,
      name: "Pearl Necklace",
      price: 3299,
      qty: 2,
      status: "Processing",
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
    }
  ]);

  // ❌ Cancel Order
  const cancelOrder = (id) => {
    setOrders(orders.map(order =>
      order.id === id
        ? { ...order, status: "Cancelled" }
        : order
    ));
  };

  return (
    <div className="pt-24 px-10 pb-10 bg-white min-h-[100dvh] max-w-6xl mx-auto">

      <h2 className="text-3xl font-serif mb-8">My Orders</h2>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl mb-4">📦 No orders yet</p>
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:scale-105 transition">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="flex gap-6 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >

              {/* IMAGE */}
              <img
                src={order.img}
                className="w-28 h-28 object-cover rounded-lg"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <p className="font-medium text-lg">{order.name}</p>

                <p className="text-gray-500 mt-1">
                  ₹{order.price.toLocaleString()}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Qty: {order.qty}
                </p>

                {/* STATUS */}
                <p
                  className={`mt-2 text-sm font-semibold
                  ${order.status === "Delivered" && "text-green-600"}
                  ${order.status === "Processing" && "text-yellow-600"}
                  ${order.status === "Cancelled" && "text-red-500"}
                `}
                >
                  {order.status}
                </p>

                {/* CANCEL BUTTON */}
                {order.status === "Processing" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="mt-3 text-red-500 text-sm hover:underline"
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right flex flex-col justify-between">
                <p className="text-sm text-gray-500">
                  Order ID: #{order.id}
                </p>

                <p className="font-semibold text-lg">
                  ₹{(order.price * order.qty).toLocaleString()}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}