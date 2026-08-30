import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Flower2,
} from "lucide-react";
import { getProducts } from "../../services/productService";

function FeaturedDesigns() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* =========================================================
     LOAD FEATURED PRODUCTS
  ========================================================= */

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await getProducts();

      const products = (response.data || [])
        .filter(
          (product) =>
            Number(product.featured) === 1 &&
            Number(product.status) === 1 &&
            product.featured_image
        )
        .sort(
          (a, b) =>
            Number(a.display_order || 0) -
            Number(b.display_order || 0)
        );

      setFeaturedProducts(products);
    } catch (error) {
      console.error(
        "Failed to load featured products:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESPONSIVE CHECK
  ========================================================= */

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /* =========================================================
     KEEP ACTIVE INDEX VALID
  ========================================================= */

  useEffect(() => {
    if (
      featuredProducts.length > 0 &&
      activeIndex >= featuredProducts.length
    ) {
      setActiveIndex(0);
    }
  }, [featuredProducts, activeIndex]);

  /* =========================================================
     NEXT SLIDE
  ========================================================= */

  const nextSlide = () => {
    if (featuredProducts.length <= 1) return;

    setActiveIndex((current) =>
      current >= featuredProducts.length - 1
        ? 0
        : current + 1
    );
  };

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */

  const previousSlide = () => {
    if (featuredProducts.length <= 1) return;

    setActiveIndex((current) =>
      current <= 0
        ? featuredProducts.length - 1
        : current - 1
    );
  };

  /* =========================================================
     GO TO SLIDE
  ========================================================= */

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  /* =========================================================
     TOUCH / SWIPE
  ========================================================= */

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.touches[0].clientX;

    touchEndX.current =
      event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current =
      event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current -
      touchEndX.current;

    const minimumSwipe = 45;

    if (Math.abs(distance) < minimumSwipe) {
      return;
    }

    if (distance > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  /* =========================================================
     LOADING / EMPTY
  ========================================================= */

  if (loading) {
    return null;
  }

  if (!featuredProducts.length) {
    return null;
  }

  /* =========================================================
     GET RELATIVE POSITION
  ========================================================= */

  const getRelativePosition = (index) => {
    const total = featuredProducts.length;

    let difference =
      index - activeIndex;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  };

  /* =========================================================
     GET CARD STYLE
  ========================================================= */

  const getCardStyle = (index) => {
    const position =
      getRelativePosition(index);

    /* =======================================================
       MOBILE
    ======================================================= */

    if (isMobile) {
      if (position === 0) {
        return {
          transform:
            "translateX(-50%) scale(1)",
          opacity: 1,
          zIndex: 30,
        };
      }

      if (position === -1) {
        return {
          transform:
            "translateX(-132%) scale(0.80)",
          opacity: 0.48,
          zIndex: 20,
        };
      }

      if (position === 1) {
        return {
          transform:
            "translateX(32%) scale(0.80)",
          opacity: 0.48,
          zIndex: 20,
        };
      }

      return {
        transform:
          "translateX(-50%) scale(0.70)",
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      };
    }

    /* =======================================================
       DESKTOP
    ======================================================= */

    const desktopPositions = {
      "-2": {
        x: -450,
        scale: 0.70,
        opacity: 0.68,
        zIndex: 10,
      },

      "-1": {
        x: -245,
        scale: 0.84,
        opacity: 0.90,
        zIndex: 20,
      },

      "0": {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
      },

      "1": {
        x: 245,
        scale: 0.84,
        opacity: 0.90,
        zIndex: 20,
      },

      "2": {
        x: 450,
        scale: 0.70,
        opacity: 0.68,
        zIndex: 10,
      },
    };

    const positionData =
      desktopPositions[position];

    if (!positionData) {
      return {
        transform:
          "translateX(-50%) scale(0.60)",
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      };
    }

    return {
      transform: `
        translateX(
          calc(-50% + ${positionData.x}px)
        )
        scale(${positionData.scale})
      `,
      opacity: positionData.opacity,
      zIndex: positionData.zIndex,
    };
  };

  return (
    <section
      className="
        bg-[#FAF8F2]
        py-10
        sm:py-12
        md:py-14
        lg:py-16
        overflow-hidden
      "
    >

      <div
        className="
          max-w-[1320px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
          "
        >

          <p
            className="
              text-[#A77A24]
              uppercase
              tracking-[0.32em]
              text-[9px]
              sm:text-[10px]
              font-medium
            "
          >
            Parasmani Jewellers
          </p>

          <h2
            className="
              mt-2
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              text-[#18322F]
              leading-[0.95]
            "
            style={{
              fontFamily: "Cinzel, serif",
            }}
          >
            Our Creations
          </h2>

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-4
            "
          >

            <span
              className="
                w-8
                sm:w-12
                h-px
                bg-[#D9B566]
              "
            />

            <Flower2
              size={16}
              strokeWidth={1.2}
              className="text-[#C8A044]"
            />

            <span
              className="
                w-8
                sm:w-12
                h-px
                bg-[#D9B566]
              "
            />

          </div>

          <p
            className="
              mt-3
              text-xs
              sm:text-sm
              md:text-base
              text-[#6E7471]
              leading-6
            "
          >
            Discover our latest creations,
            crafted with tradition and
            timeless elegance.
          </p>

        </div>


        {/* =====================================================
            CAROUSEL
        ====================================================== */}

        <div
          className="
            relative
            mt-8
            sm:mt-10
            md:mt-12
          "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* ===================================================
              CAROUSEL STAGE
          ==================================================== */}

          <div
            className="
              relative
              h-[430px]
              sm:h-[470px]
              md:h-[500px]
              lg:h-[550px]
            "
          >

            {featuredProducts.map(
              (product, index) => {

                const position =
                  getRelativePosition(index);

                const isActive =
                  position === 0;

                return (
                  <div
                    key={product.id}
                    className="
                      absolute
                      left-1/2
                      top-0
                      w-[70vw]
                      max-w-[290px]
                      sm:w-[245px]
                      md:w-[255px]
                      lg:w-[275px]
                      xl:w-[290px]
                      transition-all
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      select-none
                    "
                    style={getCardStyle(index)}
                  >

                    {/* =========================================
                        IMAGE CARD
                    ========================================== */}

                    <div
                      className={`
                        relative
                        w-full
                        aspect-[4/5]
                        overflow-hidden
                        rounded-t-[46%]
                        rounded-b-[22px]
                        bg-white
                        border
                        ${
                          isActive
                            ? "border-[#C8A044] shadow-[0_15px_40px_rgba(123,92,36,0.14)]"
                            : "border-[#DCC895] shadow-[0_8px_25px_rgba(123,92,36,0.07)]"
                        }
                      `}
                    >

                      <img
                        src={product.featured_image}
                        alt={product.name}
                        draggable="false"
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                      {/* SOFT OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-[#18322F]/20
                          via-transparent
                          to-transparent
                          pointer-events-none
                        "
                      />

                      {/* CATEGORY */}

                      {isActive && (
                        <div
                          className="
                            absolute
                            top-3
                            left-1/2
                            -translate-x-1/2
                            px-3
                            py-1
                            rounded-full
                            bg-[#18322F]/90
                            backdrop-blur-sm
                            border
                            border-[#D9B566]
                            text-white
                            text-[7px]
                            sm:text-[8px]
                            uppercase
                            tracking-[0.18em]
                            whitespace-nowrap
                          "
                        >
                          {product.category_name ||
                            "Jewellery"}
                        </div>
                      )}

                      {/* PRODUCT NUMBER */}

                      <div
                        className="
                          absolute
                          bottom-3
                          left-3
                          w-8
                          h-8
                          rounded-full
                          bg-[#FAF8F2]/95
                          border
                          border-[#D9B566]
                          flex
                          items-center
                          justify-center
                          text-[#8B6827]
                          text-[9px]
                          font-medium
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                    </div>


                    {/* =========================================
                        PRODUCT INFORMATION
                    ========================================== */}

                    <div
                      className="
                        text-center
                        mt-4
                      "
                    >

                      {isActive && (
                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            mb-1.5
                          "
                        >

                          <span
                            className="
                              w-4
                              h-px
                              bg-[#D9B566]
                            "
                          />

                          <Flower2
                            size={12}
                            strokeWidth={1.2}
                            className="text-[#C8A044]"
                          />

                          <span
                            className="
                              w-4
                              h-px
                              bg-[#D9B566]
                            "
                          />

                        </div>
                      )}

                      <h3
                        className="
                          text-base
                          sm:text-lg
                          md:text-xl
                          text-[#18322F]
                          truncate
                          px-2
                        "
                        style={{
                          fontFamily:
                            "Cinzel, serif",
                        }}
                      >
                        {product.name}
                      </h3>

                      {product.product_code && (
                        <p
                          className="
                            mt-1
                            text-[9px]
                            sm:text-[10px]
                            text-[#777D79]
                          "
                        >
                          Design No.{" "}
                          {product.product_code}
                        </p>
                      )}

                    </div>


                    {/* =========================================
                        SIDE CARD CLICK
                    ========================================== */}

                    {!isActive && (
                      <button
                        type="button"
                        aria-label={`Show ${product.name}`}
                        onClick={() =>
                          goToSlide(index)
                        }
                        className="
                          absolute
                          inset-0
                          w-full
                          h-[calc(100%-65px)]
                          cursor-pointer
                          bg-transparent
                        "
                      />
                    )}


                    {/* =========================================
                        ACTIVE CARD LINK
                    ========================================== */}

                    {isActive && (
                      <Link
                        to={`/products/${
                          product.slug ||
                          product.id
                        }`}
                        aria-label={`View ${product.name}`}
                        className="
                          absolute
                          inset-0
                          h-[calc(100%-65px)]
                        "
                      />
                    )}

                  </div>
                );
              }
            )}

          </div>


          {/* ===================================================
              DESKTOP ARROWS
          ==================================================== */}

          {featuredProducts.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous design"
                className="
                  hidden
                  md:flex
                  absolute
                  left-0
                  lg:left-5
                  top-[40%]
                  -translate-y-1/2
                  w-11
                  h-11
                  lg:w-12
                  lg:h-12
                  rounded-full
                  items-center
                  justify-center
                  bg-[#FAF8F2]
                  border
                  border-[#D9B566]
                  text-[#765C28]
                  shadow-[0_6px_20px_rgba(123,92,36,0.10)]
                  transition-all
                  duration-300
                  hover:bg-[#18322F]
                  hover:text-white
                  hover:border-[#18322F]
                  z-50
                "
              >
                <ArrowLeft
                  size={18}
                  strokeWidth={1.4}
                />
              </button>


              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next design"
                className="
                  hidden
                  md:flex
                  absolute
                  right-0
                  lg:right-5
                  top-[40%]
                  -translate-y-1/2
                  w-11
                  h-11
                  lg:w-12
                  lg:h-12
                  rounded-full
                  items-center
                  justify-center
                  bg-[#FAF8F2]
                  border
                  border-[#D9B566]
                  text-[#765C28]
                  shadow-[0_6px_20px_rgba(123,92,36,0.10)]
                  transition-all
                  duration-300
                  hover:bg-[#18322F]
                  hover:text-white
                  hover:border-[#18322F]
                  z-50
                "
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.4}
                />
              </button>
            </>
          )}


          {/* ===================================================
              MOBILE ARROWS
          ==================================================== */}

          {featuredProducts.length > 1 && (
            <div
              className="
                flex
                md:hidden
                items-center
                justify-center
                gap-4
                mt-1
              "
            >

              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous design"
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border
                  border-[#D9B566]
                  bg-[#FAF8F2]
                  text-[#765C28]
                  active:scale-95
                  transition-transform
                "
              >
                <ArrowLeft
                  size={17}
                  strokeWidth={1.4}
                />
              </button>


              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next design"
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border
                  border-[#D9B566]
                  bg-[#FAF8F2]
                  text-[#765C28]
                  active:scale-95
                  transition-transform
                "
              >
                <ArrowRight
                  size={17}
                  strokeWidth={1.4}
                />
              </button>

            </div>
          )}

        </div>


        {/* =====================================================
            DOTS
        ====================================================== */}

        {featuredProducts.length > 1 && (
          <div
            className="
              flex
              items-center
              justify-center
              gap-1
              mt-2
            "
          >

            {featuredProducts.map(
              (product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    goToSlide(index)
                  }
                  aria-label={`Go to design ${
                    index + 1
                  }`}
                  className="p-1"
                >

                  <span
                    className={`
                      block
                      h-1.5
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        index === activeIndex
                          ? "w-7 bg-[#C8A044]"
                          : "w-1.5 bg-[#D9B566]"
                      }
                    `}
                  />

                </button>
              )
            )}

          </div>
        )}


        {/* =====================================================
            MOBILE SWIPE
        ====================================================== */}

        <p
          className="
            md:hidden
            text-center
            mt-2
            text-[8px]
            uppercase
            tracking-[0.22em]
            text-[#9A8A68]
          "
        >
          Swipe to explore
        </p>


        {/* =====================================================
            VIEW ALL
        ====================================================== */}

        <div
          className="
            flex
            justify-center
            mt-6
            sm:mt-8
          "
        >

          <Link
            to="/collections"
            className="
              inline-flex
              items-center
              gap-2.5
              px-6
              sm:px-7
              py-2.5
              sm:py-3
              rounded-full
              border
              border-[#D9B566]
              text-[#765C28]
              text-xs
              sm:text-sm
              tracking-wide
              transition-all
              duration-300
              hover:bg-[#18322F]
              hover:text-white
              hover:border-[#18322F]
            "
          >

            <span>
              View All Designs
            </span>

            <ArrowRight
              size={15}
              strokeWidth={1.4}
            />

          </Link>

        </div>

      </div>

    </section>
  );
}

export default FeaturedDesigns;