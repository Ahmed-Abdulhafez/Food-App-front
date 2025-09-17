import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import Modals from "./Modals";
import InputForm from "./inputForm";
import { Link } from "react-router-dom";

const NavBar = () => {
  let token = localStorage.getItem("token"); // جلب التوكن من LocalStorage

  const [isLogin, setIsLogin] = useState(token ? true : false); // حالة تسجيل الدخول
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // فتح/إغلاق المودال

  // تحديث حالة تسجيل الدخول لو فيه أو مفيش توكن
  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);

  // عند الضغط على زر Login/Logout
  const checkLogin = () => {
    if (token) {
      // لو فيه توكن → يعمل Logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
    } else {
      // لو مفيش توكن → يفتح مودال تسجيل الدخول
      setIsOpen(true);
    }
  };

  // إغلاق المودال
  const closeeModel = () => {
    setIsOpen(false);
  };

  // دالة حماية الروابط
  const handleProtectedRoute = (e) => {
    if (!isLogin) {
      e.preventDefault(); // منع الانتقال للرابط
      setIsOpen(true); // يفتح المودال بدل ما يدخل الصفحة
    }
  };

  // تغير شكل النافبار عند النزول (Scroll)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // روابط التنقل
  const navLinks = [
    { name: "Home", path: "/#Home" },
    { name: "MyRecipes", path: "/MyRecipes", onClick: handleProtectedRoute },
    { name: "AddRecipe", path: "/AddRecipe", onClick: handleProtectedRoute },
    { name: "About", path: "/#about" },
  ];


  return (
    <>
      {/* شريط التنقل (Navbar) */}
      <nav
        className={`fixed top-0 left-0 bg-[#ff6011] w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        }`}
      >
        {/* الشعار (Logo) */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={"https://prebuiltui.com/logo.svg?p=white&s=white&t=white"}
            alt="logo"
            className={`h-9 ${isScrolled && "invert opacity-80"}`}
          />
        </a>

        {/* روابط الديسكتوب */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <HashLink
              key={i}
              to={link.path}
              onClick={link.onClick}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              {/* خط متحرك تحت الرابط عند الـ hover */}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </HashLink>
          ))}
          {/* زر إضافي "New Launch" */}

          <Link
            to="/addRecipe"
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
          >
            New Launch
          </Link>
        </div>

        {/* أزرار الديسكتوب (بحث + تسجيل الدخول) */}
        <div className="hidden md:flex items-center gap-4">
          <svg
            className={`h-6 w-6 text-white transition-all duration-500 ${
              isScrolled ? "invert" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <button
            onClick={checkLogin}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer ${
              isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            {isLogin ? "Logout" : "Login"}
          </button>
        </div>

        {/* زر القائمة للموبايل */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* القائمة في الموبايل */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* زر إغلاق القائمة */}
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* روابط الموبايل */}
          {navLinks.map((link, i) => (
            <HashLink
              key={i}
              to={link.path}
              onClick={(e) => {
                if (link.onClick) link.onClick(e);
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </HashLink>
          ))}

          {/* زر إضافي */}
          <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
            New Launch
          </button>

          {/* زر تسجيل الدخول/الخروج في الموبايل */}
          <button
            onClick={checkLogin}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer"
          >
            {isLogin ? "Logout" : "Login"}
          </button>
        </div>
      </nav>

      {/* المودال يظهر عند الضغط على Login */}
      {isOpen && (
        <Modals onClose={closeeModel}>
          <InputForm />
        </Modals>
      )}
    </>
  );
};

export default NavBar;
