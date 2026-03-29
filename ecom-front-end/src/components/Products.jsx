import { publicApi } from "../api/axios";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Products() {
  // const products = [
  //   { name: "Scarf", price: "$185", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" },
  //   { name: "Gold Cuff", price: "$320", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
  //   { name: "Leather Bag", price: "$450", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
  //   { name: "Pearl Bracelet", price: "$210", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
  //   { name: "Scarf", price: "$185", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" },
  //   { name: "Gold Cuff", price: "$320", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
  //   { name: "Leather Bag", price: "$450", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
  //   { name: "Pearl Bracelet", price: "$210", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" }, { name: "Scarf", price: "$185", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" },
  //   { name: "Gold Cuff", price: "$320", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
  //   { name: "Leather Bag", price: "$450", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
  //   { name: "Pearl Bracelet", price: "$210", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638" },
  // ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await publicApi.get("prod-list");
      setProducts(res.data.data)
      console.log(res, "this is resssssssssss")
    }
    catch (error) {
      console.log("the error is", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])



  return (
    // <div className="p-10">
    //   <h2 className="text-3xl font-serif text-center mb-6">
    //     New Arrivals
    //   </h2>

    //   <div className="flex gap-6 overflow-x-auto scrollbar-hide">
    //     {products.map((p) => {
    //       const variant = p.variants?.[0];
    //       const image = p.images?.[0]?.image;

    //       return (
    //         <div
    //           key={p.id}
    //           className="min-w-[50%] sm:min-w-[50%] md:min-w-[25%] 
    //                  max-w-[50%] sm:max-w-[50%] md:max-w-[25%] 
    //                  flex-shrink-0 bg-white rounded-lg shadow"
    //         >
    //           {/* IMAGE */}
    //           <div className="h-56 w-full overflow-hidden rounded-t-lg">
    //             <img
    //               src={image || "https://via.placeholder.com/300"}
    //               className="h-full w-full object-cover"
    //             />
    //           </div>

    //           {/* CONTENT */}
    //           <div className="p-4 flex flex-col justify-between h-[120px]">
    //             <p className="font-medium line-clamp-2">
    //               {p.name}
    //             </p>

    //             <p className="text-gray-500 text-sm">
    //               ₹ {variant?.price || "N/A"}
    //             </p>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>

    <div className="p-10">
      <h2 className="text-3xl font-serif text-center mb-6">
        New Arrivals
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {products.map((p) => {
          const variant = p.variants?.[0];
          const image = p.images?.[0]?.image;

          return (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}   // ✅ CHANGE HERE
              className="cursor-pointer min-w-[50%] sm:min-w-[50%] md:min-w-[25%] 
              max-w-[50%] sm:max-w-[50%] md:max-w-[25%] 
              flex-shrink-0 bg-white rounded-lg shadow"
            >
              <div className="h-56 w-full overflow-hidden rounded-t-lg">
                <img
                  src={image || "https://via.placeholder.com/300"}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-[120px]">
                <p className="font-medium line-clamp-2">
                  {p.name}
                </p>

                <p className="text-gray-500 text-sm">
                  ₹ {variant?.price || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}