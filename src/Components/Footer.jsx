import React from "react";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-[#ff6011] text-white ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + وصف */}
        <div>
          <a href="/" className="flex items-center gap-2 mb-4">
            <img
              src={"https://prebuiltui.com/logo.svg?p=white&s=white&t=white"}
              alt="logo"
              className="h-10"
            />
            <span className="font-semibold text-lg">Evo Recipes</span>
          </a>
          <p className="text-sm opacity-90 leading-6">
            Discover, share and save your favorite recipes with Evo.  
            Cook with love, share with passion.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <HashLink to="/#Home" className="hover:underline">
                Home
              </HashLink>
            </li>
            <li>
              <HashLink to="/MyRecipes" className="hover:underline">
                My Recipes
              </HashLink>
            </li>
            <li>
              <HashLink to="/AddRecipe" className="hover:underline">
                Add Recipe
              </HashLink>
            </li>
            <li>
              <HashLink to="/#about" className="hover:underline">
                About
              </HashLink>
            </li>
          </ul>
        </div>

        {/* سوشيال ميديا */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-black">
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 5.02 3.657 9.166 8.438 9.878v-6.99H8.078v-2.888h2.36V9.845c0-2.335 1.397-3.625 3.533-3.625 1.024 0 2.094.183 2.094.183v2.305h-1.18c-1.164 0-1.528.723-1.528 1.464v1.757h2.6l-.416 2.888h-2.184v6.99C18.343 21.166 22 17.02 22 12" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-black">
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.633 7.997c.013.176.013.352.013.529 0 5.39-4.103 11.604-11.604 11.604-2.305 0-4.45-.676-6.258-1.844.33.04.648.066.99.066a8.179 8.179 0 0 0 5.077-1.75 4.097 4.097 0 0 1-3.827-2.842c.25.04.501.066.764.066.363 0 .727-.05 1.066-.139A4.092 4.092 0 0 1 3.2 9.615v-.05c.539.303 1.166.49 1.828.514A4.084 4.084 0 0 1 3.66 6.37c0-.764.204-1.48.559-2.096a11.61 11.61 0 0 0 8.425 4.274 4.617 4.617 0 0 1-.102-.937 4.084 4.084 0 0 1 7.072-2.79 8.1 8.1 0 0 0 2.598-.99 4.083 4.083 0 0 1-1.797 2.252 8.166 8.166 0 0 0 2.355-.64 8.799 8.799 0 0 1-2.059 2.127z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-black">
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3a3 3 0 1 1 0-6zm4.5-.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* خط سفلي */}
      <div className="border-t border-white/30 py-4 text-center text-sm">
        © {new Date().getFullYear()} Evo Recipes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
