import React, { useState, useEffect } from "react";
import { privateApi } from "../api/axios";
import PaymentSection from "./PaymentSection";
import AddressForm from "./AddressForm";

export default function Cart() {

  const [showAddress, setShowAddress] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [address, setAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    first_name: "",
    last_name: ""
  });
  const [toast, setToast] = useState({
  show: false,
  message: ""
});
// ================= INCREASE =================
const increaseQty = async (item) => {
  try {
    // UI update
    setCartItems(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );

    // OPTIONAL API
    await privateApi.post("update-cart", {
      item_id: item.id,
      quantity: item.quantity + 1
    });

  } catch (err) {
    console.log(err);
  }
};

// ================= DECREASE =================
const decreaseQty = async (item) => {
  if (item.quantity <= 1) return; // prevent 0

  try {
    setCartItems(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );

    await privateApi.post("update-cart", {
      item_id: item.id,
      quantity: item.quantity - 1
    });

  } catch (err) {
    console.log(err);
  }
};

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
    fetchAddress();
  }, []);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const res = await privateApi.get("my-cart");
      setCartItems(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH ADDRESS =================
  const fetchAddress = async () => {
    try {
      const res = await privateApi.get("get-address"); // ✅ FIXED
      setSavedAddress(res.data); // ✅ FIXED
    } catch (err) {
      console.log(err);
    }
  };

  // AUTO SELECT
  useEffect(() => {
    if (savedAddress) {
      setSelectedAddress(savedAddress);
    }
  }, [savedAddress]);

  // ================= REMOVE =================
  const removeItem = async (item) => {
    try {
      setCartItems(cartItems.filter(i => i.id !== item.id));

      await privateApi.delete("delete-cart", {
        data: { item_id: item.id }
      });

    } catch (err) {
      console.log(err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="py-20 px-10 min-h-[100dvh] max-w-6xl mx-auto font-semibold text-[#0f3d33]">

      <h2 className="text-3xl font-serif mb-8">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">🛒 Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 md:gap-6 border p-4 rounded-lg">

                  <img src={item.image} className="w-28 h-28 rounded" />

                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p>₹{item.price}</p>

                    <button
                      onClick={() => removeItem(item)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 w-full md:w-auto">

  {/* QUANTITY CONTROLS */}
  <div className="flex items-center border rounded">

    <button
      onClick={() => decreaseQty(item)}
      className="px-3 py-1 text-lg"
    >
      −
    </button>

    <span className="px-4">{item.quantity}</span>

    <button
      onClick={() => increaseQty(item)}
      className="px-3 py-1 text-lg"
    >
      +
    </button>

  </div>

  {/* PRICE */}
  <p className="font-medium">
    ₹{item.price * item.quantity}
  </p>

</div>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="border p-6 rounded-lg h-fit">

              <h3 className="text-xl mb-4">Price Details</h3>

              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={() => setShowAddress(true)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

          {/* ================= ADDRESS ================= */}
          {showAddress && (
            <div className="mt-10">

              <div className="bg-white p-6 rounded-xl shadow-md">

                <h2 className="text-xl mb-4">Delivery Address</h2>

                {/* ADDRESS EXISTS */}
                {savedAddress && !showNewAddressForm && (
                  <div
                    onClick={() => setSelectedAddress(savedAddress)}
                    className={`p-5 rounded-xl cursor-pointer transition border
                      ${selectedAddress ? "border-green-600 bg-green-50" : "border-gray-200 hover:shadow-md"}
                    `}
                  >

                    <div className="flex justify-between mb-3">
                      <h3 className="font-semibold text-lg">
                        Saved Address
                      </h3>

                      {selectedAddress && (
                        <span className="text-green-600 text-sm font-medium">
                          ✔ Selected
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="text-gray-500">Name:</span> {savedAddress.full_name}</p>
                      <p><span className="text-gray-500">Phone:</span> {savedAddress.phone}</p>
                      <p><span className="text-gray-500">Address:</span> {savedAddress.address_line}</p>
                      <p><span className="text-gray-500">Location:</span> {savedAddress.city}, {savedAddress.state}</p>
                      <p><span className="text-gray-500">Pincode:</span> {savedAddress.pincode}</p>
                    </div>

                    <div className="flex gap-4 mt-4">

                      <button
                        disabled={!selectedAddress}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAddress(false);
                        }}
                        className={`px-4 py-2 rounded text-white
                          ${selectedAddress ? "bg-green-700" : "bg-gray-400 cursor-not-allowed"}
                        `}
                      >
                        Deliver Here
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowNewAddressForm(true);
                        }}
                        className="text-blue-600 underline"
                      >
                        Update Address
                      </button>

                    </div>

                  </div>
                )}

                {/* NO ADDRESS */}
                {!savedAddress && !showNewAddressForm && (
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Add Address
                  </button>
                )}

                {/* FORM */}
                {showNewAddressForm && (
                  <AddressForm
                    address={address}
                    setAddress={setAddress}
                    editData={savedAddress}
                    onSave={(data) => {
                      setSavedAddress(data);
                      setSelectedAddress(data);
                      setShowNewAddressForm(false);
                      setAddress({});
                    }}
                  />
                )}

              </div>

              {/* PAYMENT */}
              {selectedAddress && !showNewAddressForm && (
                <PaymentSection
                  onCOD={async () => {
                    try {
                      console.log("COD CLICKED"); // 👈 DEBUG

                      const res = await privateApi.post("create-order", {
                        address_id: selectedAddress.id,
                        payment_method: "COD"
                      });

                      console.log("ORDER RESPONSE:", res.data);

                     setToast({
                        show: true,
                        message: "Order placed successfully ✅"
                      });
                      // auto hide
                      setTimeout(() => {
                        setToast({ show: false, message: "" });
                      }, 2000);
                                            // OPTIONAL: clear cart UI
                      setCartItems([]);

                    } catch (err) {
                      console.log("ERROR:", err.response?.data || err);
                      alert("Order failed ❌");
                    }
                  }}
                  onOnline={() => alert("Redirect to payment")}
                />
              )}

            </div>
          )}
        </>
      )}
      {toast.show && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
    <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
      <p className="text-lg font-medium">{toast.message}</p>
    </div>
  </div>
)}
    </div>
  );
}