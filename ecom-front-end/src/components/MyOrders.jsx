import React, { useState, useEffect } from "react";
import { privateApi } from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await privateApi.get("my-orders");
      console.log("ORDERS:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ✅ CLICK HANDLER
  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };




  // ❌ Cancel Order
  const cancelOrder = (id) => {
    setOrders(orders.map(order =>
      order.id === id
        ? { ...order, status: "Cancelled" }
        : order
    ));
  };



  
  return (
    <div className="pt-24 px-10 pb-10 bg-white min-h-[100dvh] max-w-6xl mx-auto font-semibold text-[#0f3d33]">

      <h2 className="text-3xl font-serif mb-8">My Orders</h2>

      {/* EMPTY STATE */}
      {loading ? (
        <div className="text-center py-20">
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl mb-4">📦 No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">

{orders.map((order) => {
  const firstItem = order.items?.[0];

  return (
    <div
      key={order.id}
      className="flex gap-6 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => handleOrderClick(order.id)}   // 👈 CLICK
    >

      {/* IMAGE */}
<img
  src={firstItem?.image || "https://via.placeholder.com/150"}
  className="w-28 h-28 object-cover rounded-lg"
/>

      {/* DETAILS */}
      <div className="flex-1">
        <p className="font-medium text-lg">
          {firstItem?.variant?.product?.name}
        </p>

        <p className="text-gray-500 mt-1">
          ₹{firstItem?.price}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Qty: {firstItem?.quantity}
        </p>

        <p className="mt-2 text-sm font-semibold">
          {order.status}
        </p>
      </div>

      {/* RIGHT */}
      <div className="text-right flex flex-col justify-between">
        <p className="text-sm text-gray-500">
          Order ID: #{order.id}
        </p>

        <p className="font-semibold text-lg">
          ₹{order.total_amount}
        </p>
      </div>

    </div>
  );
})}

        </div>
      )}
    </div>
  );
}