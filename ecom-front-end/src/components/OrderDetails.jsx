import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { privateApi } from "../api/axios";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await privateApi.get(`order-detail/${id}`); // ✅ slash
      console.log("DETAIL:", res.data);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="pt-24 px-10 pb-10 bg-white min-h-[100dvh] max-w-6xl mx-auto font-semibold text-[#0f3d33]">

      <h2 className="text-2xl mb-4 font-semibold">
        Order #{order.id}
      </h2>

      <p className="mb-2">
        <b>Status:</b> {order.status}
      </p>

      <p className="mb-6">
        <b>Total:</b> ₹{order.total_amount}
      </p>

      <div className="space-y-4">
        {order.items?.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border p-4 rounded-lg items-center"
          >

            {/* IMAGE */}
            <img
              src={item.image || "https://via.placeholder.com/100"}
              className="w-20 h-20 object-cover rounded"
            />

            {/* DETAILS */}
            <div>
              <p className="font-medium">
                {item.product_name}
              </p>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>

              <p className="text-sm">
                ₹{item.price}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}