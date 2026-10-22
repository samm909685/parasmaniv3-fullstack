import { useState, useEffect, useRef } from "react";
import { getFavorites } from "../../utils/favorites";
import { getCategories } from "../../services/categoryService";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiInfo,
  FiMail,
  FiEdit3,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

/* Same 4 pages as before. Written once, used by desktop AND mobile. */
const NAV_LINKS = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/collections", label: "Collections", icon: FiGrid },
  { to: "/about", label: "About", icon: FiInfo },
  { to: "/contact", label: "Contact", icon: FiMail },
];

/* Remembers the collection names after the first load.
   Every page has its own Header, so without this we would call the
   backend again on every page change. */
let categoriesCache = null;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [scrolled, setScrolled] = useState(false); // NEW: has the user scrolled down?
  const [collectionsOpen, setCollectionsOpen] = useState(false); // NEW: Collections open/close in mobile menu
  const [categories, setCategories] = useState(categoriesCache || []); // NEW: names from backend
  // idle = not asked yet | loading | done | error
  const [categoryStatus, setCategoryStatus] = useState(
    categoriesCache ? "done" : "idle"
  );

  const progressRef = useRef(null); // NEW: the thin gold line under the header
  const { pathname } = useLocation(); // NEW: which page are we on?

  /* Is this link the page we are on right now? */
  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const subTab = menuOpen && collectionsOpen ? 0 : -1;

  /* ---------- 1. Favorites count (same as your old code) ---------- */
  useEffect(() => {
    const updateFavoriteCount = () => {
      setFavoriteCount(getFavorites().length);
    };

    updateFavoriteCount();

    window.addEventListener("favoritesChanged", updateFavoriteCount);

    return () => {
      window.removeEventListener("favoritesChanged", updateFavoriteCount);
    };
  }, []);

  /* ---------- 2. NEW: watch scrolling ---------- */
  useEffect(() => {
    let waiting = false;

    const onScroll = () => {
      if (waiting) return; // do the work once per screen frame only
      waiting = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 10); // only re-renders when true/false changes

        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const percent = maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0;

        // Move the gold line directly (no re-render = smooth on phones)
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${percent})`;
        }
        waiting = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ---------- 3. NEW: close the mobile menu when page changes ---------- */
  useEffect(() => {
    setMenuOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  /* ---------- NEW: load collection names (same call as Collections page) ---------- */
  const loadCategories = async () => {
    setCategoryStatus("loading");

    try {
      const response = await getCategories();

      const activeCategories = response.data.filter((item) => item.status);

      categoriesCache = activeCategories;
      setCategories(activeCategories);
      setCategoryStatus("done");
    } catch (error) {
      console.error("Failed to load categories for menu:", error);
      setCategoryStatus("error");
    }
  };

  // Ask the backend only when the user opens "Collections" the first time
  useEffect(() => {
    if (
      collectionsOpen &&
      (categoryStatus === "idle" || categoryStatus === "error")
    ) {
      loadCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionsOpen]);

  /* ---------- 4. NEW: menu open = lock page scroll + Esc key closes ---------- */
  useEffect(() => {
    if (!menuOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* ---------- 5. NEW: if phone turns sideways / screen gets big, close menu ---------- */
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <style>{`
        /* ---------- Desktop link underline ---------- */
        .header-nav-link {
          position: relative;
          transition: color 220ms ease;
        }

        .header-nav-link::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: -7px;
          left: 0;
          height: 1px;
          background: #c8a044;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 260ms ease;
        }

        .header-nav-link:hover::after,
        .header-nav-link:focus-visible::after,
        .header-nav-link.is-active::after {
          transform: scaleX(1);
        }

        .header-nav-link.is-active {
          color: #8b6b2d;
          font-weight: 500;
        }

        /* ---------- Logo ---------- */
        .header-logo-image {
          transition: transform 350ms ease, box-shadow 350ms ease, width 300ms ease, height 300ms ease;
        }

        .header-logo:hover .header-logo-image {
          transform: scale(1.05) rotate(-2deg);
          box-shadow: 0 4px 14px rgb(31 51 50 / 16%);
        }

        /* ---------- Icon buttons (big tap area for fingers) ---------- */
        .header-icon-button,
        .header-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: color 200ms ease, transform 200ms ease;
        }

        .header-icon-button:hover,
        .header-icon-link:hover {
          transform: translateY(-2px);
        }

        /* Phones have no hover, so give a "press" feeling instead */
        .header-icon-button:active,
        .header-icon-link:active {
          transform: scale(0.88);
        }

        /* ---------- Heart number pops when it changes ---------- */
        .header-badge-pop {
          animation: headerBadgePop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        /* ---------- Desktop "Request Design" button ---------- */
        .header-cta {
          background: #1f3332;
          color: #fff;
          transition: background-color 220ms ease, color 220ms ease, transform 220ms ease;
        }

        .header-cta:hover {
          background: #c8a044;
          color: #1f3332;
          transform: translateY(-1px);
        }

        /* ---------- Gold scroll line ---------- */
        .header-progress {
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, #8b6b2d, #e0bd68, #c8a044);
          will-change: transform;
        }

        /* ---------- Dark background behind the mobile menu ---------- */
        .header-backdrop {
          background: rgb(24 50 47 / 45%);
          opacity: 0;
          visibility: hidden;
          transition: opacity 280ms ease, visibility 0s linear 280ms;
        }

        .header-backdrop[data-open="true"] {
          opacity: 1;
          visibility: visible;
          transition: opacity 280ms ease, visibility 0s;
        }

        /* ---------- Mobile menu panel (always there, slides in/out) ---------- */
        .header-mobile-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-12px);
          transition: opacity 260ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 320ms;
          max-height: calc(100vh - 72px);
          max-height: calc(100dvh - 72px);
          overflow-y: auto;
          overscroll-behavior: contain;
          box-shadow: 0 18px 30px rgb(31 51 50 / 14%);
        }

        .header-mobile-menu[data-open="true"] {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          transition: opacity 260ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s;
        }

        /* ---------- Mobile links ---------- */
        .header-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 56px;
          border-radius: 12px;
          opacity: 0;
          transform: translateX(-14px);
          transition: opacity 300ms ease, transform 300ms ease, background-color 200ms ease, color 200ms ease;
        }

        /* The Collections block (button + dropdown) slides in like the links */
        .header-mobile-group {
          opacity: 0;
          transform: translateX(-14px);
          transition: opacity 300ms ease, transform 300ms ease;
        }

        /* Links slide in one after another when the menu opens */
        .header-mobile-menu[data-open="true"] .header-mobile-link,
        .header-mobile-menu[data-open="true"] .header-mobile-group {
          opacity: 1;
          transform: translateX(0);
        }

        .header-mobile-menu[data-open="true"] nav > :nth-child(1) { transition-delay: 60ms, 60ms, 0s, 0s; }
        .header-mobile-menu[data-open="true"] nav > :nth-child(2) { transition-delay: 110ms, 110ms, 0s, 0s; }
        .header-mobile-menu[data-open="true"] nav > :nth-child(3) { transition-delay: 160ms, 160ms, 0s, 0s; }
        .header-mobile-menu[data-open="true"] nav > :nth-child(4) { transition-delay: 210ms, 210ms, 0s, 0s; }
        .header-mobile-menu[data-open="true"] nav > :nth-child(5) { transition-delay: 260ms, 260ms, 0s, 0s; }

        /* ---------- Collections row (the button you tap to open/close) ---------- */
        .header-mobile-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 56px;
          border-radius: 12px;
          text-align: left;
          transition: background-color 200ms ease, color 200ms ease;
        }

        .header-mobile-row:active,
        .header-mobile-row.is-active {
          background-color: #efe2c7;
        }

        .header-mobile-row.is-active {
          color: #6f5420;
          font-weight: 500;
        }

        .header-chevron {
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .header-chevron.is-open {
          transform: rotate(180deg);
        }

        /* ---------- Smooth open/close (grid 0fr -> 1fr trick) ---------- */
        .header-collapse {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease;
        }

        .header-collapse[data-open="true"] {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .header-collapse > div {
          overflow: hidden;
          min-height: 0;
        }

        /* ---------- Inside the dropdown ---------- */
        .header-sub-link {
          display: block;
          padding: 11px 12px;
          font-size: 15px;
          border-radius: 8px;
          transition: background-color 200ms ease, padding-left 200ms ease;
        }

        .header-sub-link:active {
          background-color: #efe2c7;
          padding-left: 18px;
        }

        .header-sub-link.is-current {
          color: #6f5420;
          font-weight: 500;
          background-color: #efe2c7;
        }

        .header-sub-viewall {
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 500;
        }

        @media (hover: hover) {
          .header-mobile-row:hover {
            background-color: #efe2c7;
          }
          .header-sub-link:hover {
            background-color: #efe2c7;
            padding-left: 18px;
          }
        }

        .header-mobile-link:active {
          background-color: #efe2c7;
        }

        .header-mobile-link.is-active {
          background-color: #efe2c7;
          color: #6f5420;
          font-weight: 500;
        }

        .header-mobile-request {
          margin: 8px 16px 0;
          min-height: 52px;
          background: #1f3332;
          color: #fff;
        }

        .header-mobile-request:active {
          background: #294443;
          color: #fff;
        }

        .header-mobile-request .header-mobile-icon {
          color: #e0bd68;
        }

        .header-mobile-icon {
          color: #8b6b2d;
          transition: transform 200ms ease, color 200ms ease;
        }

        .header-mobile-link:active .header-mobile-icon:last-child {
          transform: translateX(4px);
        }

        @media (hover: hover) {
          .header-mobile-link:hover {
            background-color: #efe2c7;
          }
          .header-mobile-request:hover {
            background: #294443;
            color: #fff;
          }
        }

        @keyframes headerBadgePop {
          0%   { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ---------- People who turned animations off ---------- */
        @media (prefers-reduced-motion: reduce) {
          .header-nav-link,
          .header-nav-link::after,
          .header-logo-image,
          .header-icon-button,
          .header-icon-link,
          .header-mobile-menu,
          .header-mobile-link,
          .header-mobile-icon,
          .header-backdrop,
          .header-badge-pop,
          .header-cta,
          .header-mobile-group,
          .header-mobile-row,
          .header-collapse,
          .header-chevron,
          .header-sub-link {
            animation: none;
            transition: none;
          }

          .header-mobile-link,
          .header-mobile-group {
            opacity: 1;
            transform: none;
          }

          .header-logo:hover .header-logo-image,
          .header-icon-button:hover,
          .header-icon-link:hover,
          .header-mobile-link:hover .header-mobile-icon:last-child {
            transform: none;
          }
        }
      `}</style>

      {/* Dark layer behind the menu. Tap it = menu closes. */}
      <div
        className="header-backdrop fixed inset-0 z-40 lg:hidden"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <header
        className={`sticky top-0 z-50 w-full border-b border-[#D6C5A3] transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-[#F8F0E3]/90 backdrop-blur-md shadow-[0_6px_24px_rgba(31,51,50,0.10)]"
            : "bg-[#F8F0E3]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header gets slimmer when you scroll */}
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-out ${
              scrolled ? "h-[60px] md:h-[68px]" : "h-[72px] md:h-[82px]"
            }`}
          >
            {/* Logo */}

            <Link to="/" className="header-logo flex items-center gap-3">
              <img
                src={logo}
                alt="Parasmani Jewellers"
                className={`header-logo-image object-cover rounded-sm ${
                  scrolled
                    ? "w-10 h-10 md:w-[52px] md:h-[52px]"
                    : "w-12 h-12 md:w-[62px] md:h-[62px]"
                }`}
              />

              <div className="leading-none">
                <h1
                  className="text-[20px] md:text-[29px] font-semibold text-[#D4AF37]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  PARASMANI
                </h1>

                <p
                  className="text-[9px] md:text-[14px] tracking-[0.25em] md:tracking-[0.28em]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  JEWELLERS
                </p>
              </div>
            </Link>

            {/* Desktop */}

            <div className="hidden lg:flex items-center gap-9">
              <nav className="flex items-center gap-8 text-[15px]">
                {NAV_LINKS.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    aria-current={isActive(to) ? "page" : undefined}
                    className={`header-nav-link hover:text-[#C8A044] ${
                      isActive(to) ? "is-active" : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                <Link
                  to="/request-design"
                  aria-current={isActive("/request-design") ? "page" : undefined}
                  className="header-cta rounded-full px-5 py-2 text-[14px]"
                >
                  Request Design
                </Link>
              </nav>

              <div className="flex items-center gap-4 text-[20px]">
                <button className="header-icon-button" aria-label="Search">
                  <FiSearch className="hover:text-[#C8A044]" />
                </button>

                <Link
                  to="/favorites"
                  aria-label="Favorites"
                  className="header-icon-link relative hover:text-[#C8A044]"
                >
                  <FiHeart />

                  {favoriteCount > 0 && (
                    <span
                      key={favoriteCount}
                      className="header-badge-pop absolute -top-2 -right-3 bg-[#18322F] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center"
                    >
                      {favoriteCount}
                    </span>
                  )}
                </Link>

                <button className="header-icon-button" aria-label="WhatsApp">
                  <FaWhatsapp className="text-green-600" />
                </button>
              </div>
            </div>

            {/* Mobile Right Side */}

            <div className="flex lg:hidden items-center gap-1">
              <button
                className="header-icon-button w-10 h-10"
                aria-label="Search"
              >
                <FiSearch className="text-xl" />
              </button>

              <Link
                to="/favorites"
                aria-label="Favorites"
                className="header-icon-link relative w-10 h-10"
              >
                <FiHeart className="text-xl" />

                {favoriteCount > 0 && (
                  <span
                    key={favoriteCount}
                    className="header-badge-pop absolute top-0.5 right-0 bg-[#18322F] text-white text-[9px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center"
                  >
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <button
                className="header-icon-button w-10 h-10"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl text-green-600" />
              </button>

              {/* Menu icon turns into X with a smooth spin */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="header-icon-button relative w-10 h-10 text-2xl"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <FiMenu
                  className={`absolute transition-all duration-300 ${
                    menuOpen
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <FiX
                  className={`absolute transition-all duration-300 ${
                    menuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (always in page, shown/hidden with data-open) */}

        <div
          className="header-mobile-menu absolute left-0 right-0 top-full lg:hidden bg-[#F8F0E3] border-t border-[#D6C5A3]"
          data-open={menuOpen}
        >
          <nav className="flex flex-col py-5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) =>
              to === "/collections" ? (
                /* ---- Collections: tap to open / close ---- */
                <div key={to} className="header-mobile-group">
                  <button
                    type="button"
                    onClick={() => setCollectionsOpen(!collectionsOpen)}
                    aria-expanded={collectionsOpen}
                    tabIndex={menuOpen ? 0 : -1}
                    className={`header-mobile-row px-6 py-4 ${
                      isActive(to) ? "is-active" : ""
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="header-mobile-icon text-lg" />
                      <span>{label}</span>
                    </span>
                    <FiChevronDown
                      className={`header-mobile-icon header-chevron ${
                        collectionsOpen ? "is-open" : ""
                      }`}
                    />
                  </button>

                  <div className="header-collapse" data-open={collectionsOpen}>
                    <div>
                      <div className="px-6 pb-3">
                        {/* Goes to your normal Collections page (same route as before) */}
                        <Link
                          to="/collections"
                          onClick={() => setMenuOpen(false)}
                          tabIndex={subTab}
                          className="header-sub-link header-sub-viewall"
                        >
                          All Collections
                        </Link>

                        {/* Loading: grey lines that softly blink */}
                        {categoryStatus === "loading" && (
                          <div className="py-2" aria-hidden="true">
                            {[70, 55, 80, 60].map((w, i) => (
                              <div
                                key={i}
                                className="h-4 my-4 mx-3 rounded bg-[#E7D9B9] animate-pulse motion-reduce:animate-none"
                                style={{ width: `${w}%` }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Backend failed: tell the user and let them try again */}
                        {categoryStatus === "error" && (
                          <div className="px-3 py-3 text-sm text-gray-600">
                            <p>Could not load the collections.</p>
                            <button
                              type="button"
                              onClick={loadCategories}
                              tabIndex={subTab}
                              className="mt-2 underline underline-offset-4 font-medium"
                            >
                              Try again
                            </button>
                          </div>
                        )}

                        {/* Names from backend: tap = open that collection */}
                        {categoryStatus === "done" &&
                          categories.map((item) => (
                            <Link
                              key={item.id}
                              to={`/collections/${item.slug}`}
                              onClick={() => setMenuOpen(false)}
                              tabIndex={subTab}
                              aria-current={
                                pathname === `/collections/${item.slug}`
                                  ? "page"
                                  : undefined
                              }
                              className={`header-sub-link ${
                                pathname === `/collections/${item.slug}`
                                  ? "is-current"
                                  : ""
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(to) ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                className={`header-mobile-link px-6 py-4 ${
                  isActive(to) ? "is-active" : ""
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="header-mobile-icon text-lg" />
                  <span>{label}</span>
                </span>
                <FiChevronRight className="header-mobile-icon" />
              </Link>
              )
            )}

            <Link
              to="/request-design"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className="header-mobile-link header-mobile-request px-4 py-3"
            >
              <span className="flex items-center gap-3">
                <FiEdit3 className="header-mobile-icon text-lg" />
                <span>Request Design</span>
              </span>
              <FiChevronRight className="header-mobile-icon" />
            </Link>
          </nav>
        </div>

        {/* Thin gold line = how far down the page you are */}
        <div
          ref={progressRef}
          className="header-progress absolute -bottom-px left-0 h-[2px] w-full pointer-events-none"
          aria-hidden="true"
        />
      </header>
    </>
  );
}

export default Header;