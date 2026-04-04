import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { publicApi } from "../api/axios";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await publicApi.get("cate-list");
      setCategories(res.data.data);

      console.log(res.data, "this is  the data============")

    }
    catch (error) {
      console.log("error feching categories", error)
    }
    setLoading(false);

  };

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const prod = await publicApi.get(`prod-cate/${categoryId}`);
      setProducts(prod.data.data);
      console.log(prod.data)
    }
    catch (error) {
      console.log("error feching categories", error)
    }
    setLoading(false);
  }

  // 🔥 Restore category when coming back
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);
  // ✅ Get selected category object
  const selectedCategoryObj = categories.find(
    (c) => c.id === selectedCategory
  );


  
  return (
    <div className="pt-14 p-10 bg-gray-100">

      {/* BACK */}
      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-2 flex items-center gap-2 text-sm text-gray-600 hover:text-black bg-white px-4 py-2 rounded shadow font-serif"
        >
          ← Back to Categories
        </button>
      )}

      {/* CATEGORIES */}
      {!selectedCategory && (
        <>
          <h2 className="text-3xl font-serif mb-6">
  Categories
</h2>

          <div className="grid md:grid-cols-4 gap-6">

            {categories.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className="bg-white p-4 rounded shadow cursor-pointer"
              >
                <img
                  src={item.images} // temporary image
                  className="h-48 w-full object-cover"
                />
                <p className="mt-3 font-medium text-gray-800 line-clamp-2">
  {item.name}
</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PRODUCTS */}
      {/* {selectedCategory && (
      <div>
        <h3 className="text-2xl mb-6">{selectedCategory}</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((p, i) => (
            <div
              key={i}
              onClick={() =>
                navigate(`/product/${p.id}`, {
                  state: { ...p, category: selectedCategory }
                })
              }
              className="bg-white rounded shadow cursor-pointer"
            >
              <img src={p.img} className="h-48 w-full object-cover" />

              <div className="p-4">
                <p>{p.name}</p>
                <p className="mt-2 font-serif">
                  ₹{p.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
);
} */}

      {/* 📦 PRODUCT LIST */}
      {selectedCategory && (
        <div>
          <h3 className="text-2xl mb-6">
            {selectedCategoryObj?.name}
          </h3>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((p) => {
                const variant = p.variants?.[0]; // first variant
                const images = p.images?.[0]
                console.log(images,"sanved")

                return (
                  <div
                    key={p.id}
                    onClick={() =>
                      navigate(`/product/${p.id}`, {
                        state: {
                          product: p,
                        category: selectedCategory,
                        products: products 
                        }
                      })
                    }
                    className="bg-white rounded shadow cursor-pointer"
                  >
                    <img
                      src={images?.image || "https://via.placeholder.com/300"}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-4">
 <p className="font-medium text-gray-800 line-clamp-2">
  {p.name}
</p>

<p className="mt-2 text-gray-500 text-sm">₹
                        {variant
                          ? Number(variant.price).toLocaleString()
                          : "N/A"}
                      </p>

                      <p className="text-sm text-gray-500">
                        Stock: {variant?.stock || 0}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}