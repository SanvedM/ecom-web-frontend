import React, { useState } from "react";
import { useEffect } from "react";
import { privateApi } from "../api/axios";

export default function Cart() {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Gold Ring",
  //     price: 2499,
  //     qty: 2,
  //     img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  //   },
  //   {
  //     id: 2,
  //     name: "Pearl Necklace",
  //     price: 3299,
  //     qty: 1,
  //     img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  //   }
  // ]);

  const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(false);



const fetchCart = async () => {
  setLoading(true);
  try {
    const res = await privateApi.get("my-cart");

    console.log(res.data);

    setCartItems(res.data.data);   // 👈 IMPORTANT

  } catch (err) {
    console.log(err);
  }
  setLoading(false);
};

useEffect(() => {
  fetchCart();
}, []);


  // ➕ Increase qty
  // const increaseQty = (id) => {
  //   setCartItems(cartItems.map(item =>
  //     item.id === id ? { ...item, qty: item.quantity + 1 } : item
  //   ));
  // };

  // // ➖ Decrease qty
  // const decreaseQty = (id) => {
  //   setCartItems(cartItems.map(item =>
  //     item.id === id
  //       ? { ...item, qty: item.quantity > 1 ? item.quantity - 1 : 1 }
  //       : item
  //   ));
  // };

  const increaseQty = async (item) => {
  const newQty = item.quantity + 1;

  try {
    await privateApi.post("update-cart", {
      item_id: item.id,
      quantity: newQty
    });

    fetchCart(); // 🔥 refresh cart

  } catch (err) {
    alert("Stock limit reached ❌");
  }
};



const decreaseQty = async (item) => {
  if (item.quantity <= 1) return;

  const newQty = item.quantity - 1;

  await privateApi.post("update-cart", {
    item_id: item.id,
    quantity: newQty
  });

  fetchCart();
};
  // ❌ Remove item
  const removeItem = async(item) => {
    console.log(item.id,"lsuus")
    try {

    setCartItems(cartItems.filter(item => item.id !== item.id));
    await privateApi.delete("delete-cart", {
      data: {
        item_id: item.id
      }
    });

    fetchCart(); // 🔥 refresh cart

  } catch (err) {
    alert("error while deleteing the cart❌",err);
  }
};

  // 💰 Total
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="py-20 px-10 min-h-[100dvh] max-w-6xl mx-auto">

      <h2 className="text-3xl font-serif mb-8">Shopping Cart</h2>

      {/* 🛑 EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl mb-4">🛒 Your cart is empty</p>
          <button className="bg-black text-white px-6 py-2 rounded">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">

          {/* 🧾 LEFT: ITEMS */}
          <div className="md:col-span-2 space-y-6">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium text-lg">{item.product_name}</p>

                  <p className="text-gray-500 mt-1">
                    ₹{Number(item.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Stock: {item.product_stock || "N/A"}
                  </p>

                  {/* QUANTITY CONTROL */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQty(item)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item)}
                    className="text-red-500 text-sm mt-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* PRICE */}
                <p className="font-semibold text-lg">
                  ₹{(Number(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

          {/* 💳 RIGHT: SUMMARY */}
          <div className="border rounded-lg p-6 shadow-md h-fit">

            <h3 className="text-xl font-semibold mb-4">
              Price Details
            </h3>

            <div className="flex justify-between mb-2">
              <span>Price</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount</span>
              <span>- ₹0</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* CHECKOUT BUTTON */}
            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg 
            hover:bg-blue-700 hover:scale-105 active:scale-95 transition">
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  );
}