import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation  } from "react-router-dom";
import { publicApi, privateApi } from "../api/axios";


export default function ProductDetails() {
  const { id } = useParams();   // ✅ get ID from URL
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = location.state || {};  
  // const location = useLocation();
  const {category, products } = location.state || {};
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success"
});
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await publicApi.get(`prod-details/${id}`);
      setProduct(res.data.data[0]);   // 👈 important
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    if (product && variant) {
      checkIfInCart();
    }
  }, [product]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  const variant = product.variants?.[0];
  const image = product.images?.[0]?.image;
  const handleAddToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await privateApi.post("add-to-cart", {
        variant: variant?.id,
        quantity: qty
      });

      console.log(res.data);

      // ✅ mark as in cart
      setInCart(true);

    setToast({
      show: true,
      message: `${product.name} added to cart`,
      type: "success"
    });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2000);


    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };


  const checkIfInCart = async () => {
    try {
      const res = await privateApi.get("my-cart");

      const exists = res.data.data.some(
        (item) => item.product_name === product?.name
      );

      setInCart(exists);

    } catch (err) {
      console.log(err);
    }
  };
// useEffect(() => {
//   if (location.state?.category) {
//     setSelectedCategory(location.state.category);
//   }
// }, [location.state]);


  return (
    <div className="pt-24 px-10 pb-10 bg-gray-100 min-h-screen font-semibold text-[#0f3d33]">

      {/* BACK */}
      {/* <button
        onClick={() => navigate(-1)}
        className="mb-2 flex items-center gap-2 text-sm text-gray-600 hover:text-black bg-white px-4 py-2 rounded shadow"
      >
        ← Back to Products
      </button> */}
<button
  onClick={() =>
    navigate(-1)
  }
  className="mb-4 px-4 py-2 bg-gray-200 rounded"
>
  ← Back to Products
</button>



      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded shadow">

        {/* IMAGE */}
        <img
          src={image}
          className="w-full h-96 object-cover rounded"
        />

        {/* DETAILS */}
        <div>
          <h2 className="text-3xl font-semibold">{product.name}</h2>

          <p className="text-xl mt-2 text-gray-800">
            ₹{variant?.price}
          </p>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{qty}</span>

            <button
              onClick={() => {
                if (qty < variant?.stock) {
                  setQty(qty + 1);
                }
              }}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* TOTAL */}
          <p className="mt-4 font-semibold text-lg">
            Total: ₹{variant?.price * qty}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Available: {variant?.stock}
          </p>
          {qty > variant?.stock && (
            <p className="text-red-500 text-sm mt-2">
              Only {variant?.stock} items available
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">

            {/* <button
              onClick={() => {
                setToast(`${product.name} added (${qty})`);
                setTimeout(() => setToast(null), 2000);
              }}
              className="bg-black text-white px-6 py-2 rounded-xl"
            >
              Add to Cart
            </button> */}
            {/* <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded-xl"
            >
              Add to Cart
            </button> */}

            {variant?.stock === 0 ? (
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-2 rounded-xl cursor-not-allowed"
              >
                Out of Stock
              </button>
            ) : inCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="bg-green-600 text-white px-6 py-2 rounded-xl"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-2 rounded-xl"
              >
                Add to Cart
              </button>
            )}

            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl">
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* TOAST */}
{toast.show && (
  <div className="fixed inset-0 flex items-start justify-center pt-24 bg-black/10 z-50">

    <div className="bg-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[240px] animate-fadeIn">

      {/* ICON */}
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm
        ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}
      >
        ✔
      </div>

      {/* TEXT */}
      <p className="text-gray-800 text-sm font-medium">
        {toast.message}
      </p>

    </div>
  </div>
)}
    </div>
  );
}