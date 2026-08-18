import { useState, useEffect } from "react";
import { getFavorites } from "../../utils/favorites";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const updateFavoriteCount = () => {
      setFavoriteCount(getFavorites().length);
    };

    updateFavoriteCount();

    window.addEventListener(
      "favoritesChanged",
      updateFavoriteCount
    );

    return () => {
      window.removeEventListener(
        "favoritesChanged",
        updateFavoriteCount
      );
    };
  }, []);;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F0E3] border-b border-[#D6C5A3]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-[80px] md:h-[95px] flex items-center justify-between">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">

            <img
              src={logo}
              alt="Parasmani Jewellers"
              className="w-14 h-14 md:w-[72px] md:h-[72px] object-cover rounded-sm"
            />

            <div className="leading-none">

              <h1
                className="text-[22px] md:text-[34px] font-semibold text-[#D4AF37]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                PARASMANI
              </h1>

              <p
                className="text-[10px] md:text-[17px] tracking-[0.25em] md:tracking-[0.30em]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                JEWELLERS
              </p>

            </div>

          </Link>

          {/* Desktop */}

          <div className="hidden lg:flex items-center gap-12">

            <nav className="flex items-center gap-10 text-[15px]">

              <Link to="/" className="hover:text-[#C8A044] transition">
                Home
              </Link>

              <Link
                to="/collections"
                className="hover:text-[#C8A044] transition"
              >
                Collections
              </Link>

              <Link
                to="/about"
                className="hover:text-[#C8A044] transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-[#C8A044] transition"
              >
                Contact
              </Link>

            </nav>

            <div className="flex items-center gap-5 text-[22px]">

              <button>
                <FiSearch className="hover:text-[#C8A044]" />
              </button>

              <Link
  to="/favorites"
  className="relative hover:text-[#C8A044] transition"
>
  <FiHeart />

  {favoriteCount > 0 && (
    <span className="absolute -top-2 -right-3 bg-[#18322F] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
      {favoriteCount}
    </span>
  )}
</Link>

              <button>
                <FaWhatsapp className="text-green-600" />
              </button>

            </div>

          </div>

          {/* Mobile Right Side */}

          <div className="flex lg:hidden items-center gap-4">

            <button>
              <FiSearch className="text-xl" />
            </button>

          <Link
  to="/favorites"
  className="relative"
>
  <FiHeart className="text-xl" />

  {favoriteCount > 0 && (
    <span className="absolute -top-2 -right-3 bg-[#18322F] text-white text-[9px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center">
      {favoriteCount}
    </span>
  )}
</Link>

            <button>
              <FaWhatsapp className="text-xl text-green-600" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Navigation */}

      {menuOpen && (

        <div className="lg:hidden bg-[#F8F0E3] border-t border-[#D6C5A3]">

          <nav className="flex flex-col py-5">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-[#EFE2C7]"
            >
              Home
            </Link>

            <Link
              to="/collections"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-[#EFE2C7]"
            >
              Collections
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-[#EFE2C7]"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-[#EFE2C7]"
            >
              Contact
            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}

export default Header;