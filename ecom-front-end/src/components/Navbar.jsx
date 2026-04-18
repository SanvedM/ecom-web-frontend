import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const scrollToCategories = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("categories")?.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    } else {
      document.getElementById("categories")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  const scrollToContact = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    } else {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 font-semibold text-[#0f3d33]">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-4 md:px-12 py-5">

        {/* LEFT → LOGO + SEARCH */}
        <div className="flex items-center gap-6">

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* LOGO */}
          <div
            className="text-xl md:text-3xl font-serif tracking-[0.35em] cursor-pointer"
            onClick={() => navigate("/")}
          >
            AURA
          </div>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:flex items-center border rounded-full px-4 py-2 ml-6 w-64">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm bg-transparent flex-1 min-w-[120px]"
            />
            <Search size={18} className="ml-2" />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center w-full px-4 justify-end">

          {/* NAV LINKS */}
          <div className="flex gap-8 text-base font-medium text-gray-800">
            <Link to="/">Collections</Link>

            <span onClick={scrollToCategories} className="cursor-pointer">
              Categories
            </span>

            <span onClick={scrollToContact} className="cursor-pointer">
              Contact
            </span>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5 ml-auto">

            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white px-4 py-1 rounded-lg text-sm"
              >
                Login
              </button>
            ) : (
              <>
                {/* CART */}
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart size={28} />
                </div>

                {/* PROFILE */}
                <div className="relative">

                  {/* ICON */}
                  <div
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    👤
                  </div>

                  {/* DROPDOWN */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl z-50 overflow-hidden border">

                      {/* USER INFO */}
                      <div className="flex items-center gap-3 px-4 py-4 border-b bg-gray-50">
                        👤
                        <div>
                          <p className="font-semibold text-sm">
                            {user?.name || "User"}
                          </p>
                        </div>
                      </div>

                      {/* MENU */}
                      <div className="py-2 text-sm">

                        <button
                          onClick={() => {
                            navigate("/orders");
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                        >
                          🧾 <span>Order History</span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/address");
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                        >
                          🚚 <span>Shipping Addresses</span>
                        </button>

                      </div>

                      {/* LOGOUT */}
                      <div className="border-t">
                        <button
                          onClick={() => {
                            handleLogout();
                            setProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 font-medium"
                        >
                          🚪 <span>Log Out</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* MOBILE RIGHT */}
        <div className="flex items-center gap-5 md:hidden">

          <button onClick={() => setSearchOpen(!searchOpen)}>
            {searchOpen ? <X size={22} /> : <Search size={22} />}
          </button>

{isLoggedIn ? (
  <>
    {/* CART */}
    <div onClick={() => navigate("/cart")}>
      <ShoppingCart size={26} />
    </div>

    {/* PROFILE */}
    <div className="relative">

      <div
        onClick={() => setProfileOpen(!profileOpen)}
        className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
      >
        👤
      </div>

      {/* DROPDOWN */}
      {profileOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl z-50 border">

          <div className="px-4 py-3 border-b bg-gray-50 text-sm font-semibold">
            {user?.name || "User"}
          </div>

          <button
            onClick={() => {
              navigate("/orders");
              setProfileOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            🧾 Order History
          </button>

          <button
            onClick={() => {
              navigate("/address");
              setProfileOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            🚚 Addresses
          </button>

          <button
            onClick={() => {
              handleLogout();
              setProfileOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 text-sm"
          >
            🚪 Logout
          </button>

        </div>
      )}
    </div>
  </>
) : (
            <div onClick={() => navigate("/cart")}>
              <ShoppingCart size={26} />
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center border rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm bg-transparent w-full"
            />
            <Search size={18} className="ml-2" />
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-6 border-t">
          <div className="flex flex-col gap-5 text-gray-800">

            <span onClick={() => navigate("/")}>Collections</span>
            <span onClick={scrollToCategories}>Categories</span>
            <span onClick={scrollToContact}>Contact</span>

            {!isLoggedIn ? (
              <span onClick={() => navigate("/login")}>Login</span>
            ) : (
              <>
                <span onClick={() => navigate("/cart")}>Cart</span>
                <span onClick={() => navigate("/orders")}>My Orders</span>
                <span onClick={handleLogout} className="text-red-500">
                  Logout
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}