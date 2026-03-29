// import React, { useState } from "react";
// import { Menu, X, Search, ShoppingCart, ShoppingBag } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const navigate = useNavigate();

//   // ✅ AUTH CHECK
//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!token;

//   // ✅ LOGOUT
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     window.location.reload(); // refresh navbar
//   };

//   // 🔽 SCROLL FUNCTIONS
//   const scrollToCategories = () => {
//     if (window.location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         document.getElementById("categories")?.scrollIntoView({
//           behavior: "smooth"
//         });
//       }, 100);
//     } else {
//       document.getElementById("categories")?.scrollIntoView({
//         behavior: "smooth"
//       });
//     }
//   };

//   const scrollToContact = () => {
//     if (window.location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         document.getElementById("contact")?.scrollIntoView({
//           behavior: "smooth"
//         });
//       }, 100);
//     } else {
//       document.getElementById("contact")?.scrollIntoView({
//         behavior: "smooth"
//       });
//     }
//   };

//   return (
//     <div className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">

//       {/* MAIN NAVBAR */}
//       <div className="flex justify-between items-center px-4 md:px-12 py-5">

//         {/* MOBILE MENU BUTTON */}
//         <div className="md:hidden">
//           <button onClick={() => setOpen(!open)}>
//             {open ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* LEFT SIDE */}
//         <div className="hidden md:flex items-center gap-8">

//           <div className="flex gap-8 text-base font-medium text-gray-800">

//             <Link className="hover:text-gray-900" to="/">
//               Collections
//             </Link>

//             <span onClick={scrollToCategories} className="cursor-pointer">
//               Categories
//             </span>

//             <span onClick={scrollToContact} className="cursor-pointer">
//               Contact
//             </span>
//           </div>

//           {/* SEARCH */}
//           <div className="flex items-center border rounded-full px-4 py-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="outline-none text-sm bg-transparent w-32 focus:w-48 transition-all"
//             />
//             <Search size={18} className="ml-2" />
//           </div>
//         </div>

//         {/* LOGO */}
//         <div className="text-xl md:text-3xl font-serif font-semibold tracking-[0.35em]">
//           AURA
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-5 md:gap-7">

//           {/* MOBILE SEARCH */}
//           <button
//             className="md:hidden"
//             onClick={() => setSearchOpen(!searchOpen)}
//           >
//             {searchOpen ? <X size={22} /> : <Search size={22} />}
//           </button>

//           {/* 🔐 NOT LOGGED IN */}
//           {!isLoggedIn && (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-black text-white px-4 py-1 rounded-lg text-sm"
//             >
//               Login
//             </button>
//           )}

//           {/* ✅ LOGGED IN */}
//           {isLoggedIn && (
//             <>
//               {/* ORDERS */}
//               <div
//                 className="cursor-pointer"
//                 onClick={() => navigate("/orders")}
//               >
//                 <ShoppingBag size={26} />
//               </div>

//               {/* CART */}
//               <div
//                 className="cursor-pointer"
//                 onClick={() => navigate("/cart")}
//               >
//                 <ShoppingCart size={28} />
//               </div>

//               {/* PROFILE */}
//               <div className="relative group cursor-pointer">

//                 <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
//                   👤
//                 </div>

//                 {/* DROPDOWN */}
//                 <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg 
//                 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">

//                   <button
//                     onClick={() => navigate("/orders")}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     My Orders
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>

//                 </div>

//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* MOBILE SEARCH */}
//       {searchOpen && (
//         <div className="md:hidden px-4 pb-4">
//           <div className="flex items-center border rounded-full px-4 py-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="outline-none text-sm bg-transparent w-full"
//             />
//             <Search size={18} className="ml-2" />
//           </div>
//         </div>
//       )}

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden px-6 pb-6 space-y-5 border-t">

//           <div className="flex flex-col gap-5 text-base font-medium text-gray-800">

//             <span onClick={() => navigate("/")}>Collections</span>

//             <span onClick={scrollToCategories}>Categories</span>

//             <span onClick={scrollToContact}>Contact</span>

//             {!isLoggedIn ? (
//               <span onClick={() => navigate("/login")}>
//                 Login
//               </span>
//             ) : (
//               <>
//                 <span onClick={() => navigate("/orders")}>
//                   My Orders
//                 </span>

//                 <span onClick={() => navigate("/cart")}>
//                   Cart
//                 </span>

//                 <span
//                   onClick={handleLogout}
//                   className="text-red-500"
//                 >
//                   Logout
//                 </span>
//               </>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



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
    navigate("/login");
    window.location.reload();
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

  return (
    <div className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-4 md:px-12 py-5">

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* LEFT */}
        <div className="hidden md:flex items-center gap-8">

          <div className="flex gap-8 text-base font-medium text-gray-800">
            <Link to="/">Collections</Link>

            <span onClick={scrollToCategories} className="cursor-pointer">
              Categories
            </span>

            <span onClick={scrollToContact} className="cursor-pointer">
              Contact
            </span>
          </div>

          {/* SEARCH */}
          <div className="flex items-center border rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm bg-transparent w-32 focus:w-48 transition"
            />
            <Search size={18} className="ml-2" />
          </div>
        </div>

        {/* LOGO */}
        <div className="text-xl md:text-3xl font-serif tracking-[0.35em]">
          AURA
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5 md:gap-7">

          {/* MOBILE SEARCH */}
          <button
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* NOT LOGGED IN */}
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-4 py-1 rounded-lg text-sm"
            >
              Login
            </button>
          )}

          {/* LOGGED IN */}
          {isLoggedIn && (
            <>
              {/* 🛒 CART ONLY */}
              <div
                className="cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart size={28} />
              </div>

              {/* 👤 PROFILE */}
              <div className="relative">

                {/* PROFILE ICON */}
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                >
                  👤
                </div>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">

                    <button
                      onClick={() => {
                        navigate("/orders");
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* MOBILE SEARCH INPUT */}
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
              <span onClick={() => navigate("/login")}>
                Login
              </span>
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