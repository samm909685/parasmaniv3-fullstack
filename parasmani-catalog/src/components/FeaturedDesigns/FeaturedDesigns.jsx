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
  const [visibleCount, setVisibleCount] = useState(4);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const carouselRef = useRef(null);

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
     RESPONSIVE CARD COUNT

     Desktop  >= 1024px  = 4 cards
     Tablet   768-1023px = 3 cards
     Mobile   < 768px    = 2 cards
  ========================================================= */

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setVisibleCount(2);
      } else if (width < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();

    window.addEventListener(
      "resize",
      updateVisibleCount
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCount
      );
    };
  }, []);

  /* =========================================================
     MEASURE CAROUSEL WIDTH

     IMPORTANT:
     This runs AFTER products have loaded.

     This fixes the previous 0px card problem.
  ========================================================= */

  useEffect(() => {
    if (
      loading ||
      !featuredProducts.length ||
      !carouselRef.current
    ) {
      return;
    }

    const element = carouselRef.current;

    const updateCarouselWidth = () => {
      const width = element.clientWidth;

      if (width > 0) {
        setCarouselWidth(width);
      }
    };

    // Measure immediately
    updateCarouselWidth();

    // Keep it accurate if the browser/container changes size
    const resizeObserver = new ResizeObserver(() => {
      updateCarouselWidth();
    });

    resizeObserver.observe(element);

    window.addEventListener(
      "resize",
      updateCarouselWidth
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        updateCarouselWidth
      );
    };
  }, [
    loading,
    featuredProducts.length,
    visibleCount,
  ]);

  /* =========================================================
     CARD GAP

     Desktop  = 18px
     Tablet   = 14px
     Mobile   = 10px
  ========================================================= */

  const gap =
    visibleCount === 2
      ? 10
      : visibleCount === 3
      ? 14
      : 18;

  /* =========================================================
     EXACT CARD WIDTH

     Example desktop:

       Available width = 1520px
       4 cards
       3 gaps × 18px

       (1520 - 54) / 4
       = 366.5px

     Every card gets EXACTLY the same width.
  ========================================================= */

  const cardWidth =
    carouselWidth > 0
      ? (
          carouselWidth -
          gap * (visibleCount - 1)
        ) / visibleCount
      : 0;

  /* =========================================================
     MAX SLIDE INDEX
  ========================================================= */

  const maxIndex = Math.max(
    0,
    featuredProducts.length - visibleCount
  );

  /* =========================================================
     KEEP ACTIVE INDEX VALID
  ========================================================= */

  useEffect(() => {
    if (!featuredProducts.length) {
      return;
    }

    const currentMaxIndex = Math.max(
      0,
      featuredProducts.length - visibleCount
    );

    if (activeIndex > currentMaxIndex) {
      setActiveIndex(currentMaxIndex);
    }
  }, [
    featuredProducts.length,
    visibleCount,
    activeIndex,
  ]);

  /* =========================================================
     NEXT SLIDE
  ========================================================= */

  const nextSlide = () => {
    if (
      featuredProducts.length <=
      visibleCount
    ) {
      return;
    }

    setActiveIndex((current) => {
      if (current >= maxIndex) {
        return 0;
      }

      return current + 1;
    });
  };

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */

  const previousSlide = () => {
    if (
      featuredProducts.length <=
      visibleCount
    ) {
      return;
    }

    setActiveIndex((current) => {
      if (current <= 0) {
        return maxIndex;
      }

      return current - 1;
    });
  };

  /* =========================================================
     GO TO SLIDE
  ========================================================= */

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  /* =========================================================
     AUTO SCROLL

     Moves exactly ONE CARD at a time.

     3.5 seconds between movements.
  ========================================================= */

  useEffect(() => {
    if (
      loading ||
      featuredProducts.length <=
        visibleCount
    ) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        if (current >= maxIndex) {
          return 0;
        }

        return current + 1;
      });
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [
    loading,
    featuredProducts.length,
    visibleCount,
    maxIndex,
    activeIndex,
  ]);

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

    if (
      Math.abs(distance) <
      minimumSwipe
    ) {
      return;
    }

    if (distance > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  /* =========================================================
     TRACK POSITION

     One movement =

       CARD WIDTH + GAP
  ========================================================= */

  const moveDistance =
    cardWidth + gap;

  const trackStyle =
    cardWidth > 0
      ? {
          transform: `translate3d(-${
            activeIndex *
            moveDistance
          }px, 0, 0)`,
        }
      : {
          transform:
            "translate3d(0, 0, 0)",
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
     RENDER
  ========================================================= */

  return (
    <section
      className="
        bg-[#FAF8F2]
        py-8
        sm:py-9
        md:py-10
        lg:py-12
        overflow-hidden
      "
    >
      <div
        className="
          max-w-[1560px]
          mx-auto
          px-4
          sm:px-6
          md:px-7
          lg:px-8
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

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
              tracking-[0.30em]
              text-[8px]
              sm:text-[9px]
              md:text-[10px]
              font-medium
            "
          >
            Parasmani Jewellers
          </p>

          <h2
            className="
              mt-1.5
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              text-[#18322F]
              leading-none
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
              gap-2
              mt-3
            "
          >
            <span
              className="
                w-7
                sm:w-9
                md:w-11
                h-px
                bg-[#D9B566]
              "
            />

            <Flower2
              size={14}
              strokeWidth={1.2}
              className="text-[#C8A044]"
            />

            <span
              className="
                w-7
                sm:w-9
                md:w-11
                h-px
                bg-[#D9B566]
              "
            />
          </div>

          <p
            className="
              mt-2
              text-[10px]
              sm:text-xs
              md:text-sm
              text-[#6E7471]
              leading-5
            "
          >
            Discover our latest creations,
            crafted with tradition and
            timeless elegance.
          </p>
        </div>

        {/* ===================================================
            CAROUSEL
        ==================================================== */}

        <div
          className="
            relative
            mt-6
            sm:mt-7
            md:mt-8
          "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* =================================================
              VIEWPORT
          ================================================= */}

          <div
            ref={carouselRef}
            className="
              relative
              overflow-hidden
              w-full
              touch-pan-y
            "
          >
            {/* ===============================================
                TRACK
            ================================================ */}

            <div
              className="
                flex
                items-start
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                will-change-transform
              "
              style={{
                ...trackStyle,
                gap: `${gap}px`,
              }}
            >
              {featuredProducts.map(
                (product, index) => (
                  <div
                    key={product.id}
                    className="
                      shrink-0
                      min-w-0
                    "
                    style={{
                      width: `${cardWidth}px`,
                      flex: `0 0 ${cardWidth}px`,
                    }}
                  >
                    {/* =====================================
                        IMAGE CARD

                        EXACT PORTRAIT SHAPE:
                        4 : 5
                    ====================================== */}

                    <Link
                      to={`/products/${
                        product.slug ||
                        product.id
                      }`}
                      aria-label={`View ${product.name}`}
                      className="block"
                    >
                      <div
                        className="
                          relative
                          w-full
                          aspect-[4/5]
                          overflow-hidden
                          rounded-[6px]
                          sm:rounded-[8px]
                          md:rounded-[10px]
                          bg-white
                          border
                          border-[#DCC895]
                          shadow-[0_8px_25px_rgba(123,92,36,0.07)]
                          group
                        "
                      >
                        <img
                          src={
                            product.featured_image
                          }
                          alt={product.name}
                          draggable="false"
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-[1.03]
                          "
                        />

                        {/* SOFT OVERLAY */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-[#18322F]/25
                            via-transparent
                            to-transparent
                            pointer-events-none
                          "
                        />

                        {/* CATEGORY */}

                        <div
                          className="
                            absolute
                            top-1.5
                            left-1/2
                            -translate-x-1/2
                            max-w-[90%]
                            px-2
                            sm:px-2.5
                            md:px-3
                            py-0.5
                            sm:py-1
                            rounded-full
                            bg-[#18322F]/90
                            backdrop-blur-sm
                            border
                            border-[#D9B566]
                            text-white
                            text-[6px]
                            sm:text-[7px]
                            md:text-[8px]
                            uppercase
                            tracking-[0.15em]
                            whitespace-nowrap
                            overflow-hidden
                            text-ellipsis
                          "
                        >
                          {product.category_name ||
                            "Jewellery"}
                        </div>

                        {/* PRODUCT NUMBER */}

                        <div
                          className="
                            absolute
                            bottom-1.5
                            left-1.5
                            sm:bottom-2
                            sm:left-2
                            md:bottom-2.5
                            md:left-2.5
                            w-6
                            h-6
                            sm:w-7
                            sm:h-7
                            md:w-8
                            md:h-8
                            rounded-full
                            bg-[#FAF8F2]/95
                            border
                            border-[#D9B566]
                            flex
                            items-center
                            justify-center
                            text-[#8B6827]
                            text-[7px]
                            sm:text-[8px]
                            md:text-[9px]
                            font-medium
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>
                      </div>
                    </Link>

                    {/* =====================================
                        PRODUCT INFORMATION
                    ====================================== */}

                    <div
                      className="
                        text-center
                        mt-2
                        sm:mt-2.5
                        md:mt-3
                        min-h-[34px]
                        sm:min-h-[40px]
                        md:min-h-[44px]
                      "
                    >
                      <h3
                        className="
                          text-[10px]
                          sm:text-xs
                          md:text-sm
                          lg:text-base
                          text-[#18322F]
                          truncate
                          px-1
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
                            mt-0.5
                            text-[7px]
                            sm:text-[8px]
                            md:text-[9px]
                            text-[#777D79]
                            truncate
                          "
                        >
                          Design No.{" "}
                          {product.product_code}
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* =================================================
              PREVIOUS ARROW
          ================================================== */}

          {featuredProducts.length >
            visibleCount && (
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous design"
              className="
                absolute
                left-1
                sm:left-2
                md:left-3
                top-[40%]
                -translate-y-1/2
                w-8
                h-8
                sm:w-9
                sm:h-9
                md:w-10
                md:h-10
                rounded-full
                bg-[#FAF8F2]/95
                border
                border-[#D9B566]
                flex
                items-center
                justify-center
                text-[#8B6827]
                shadow-md
                z-30
                hover:bg-white
                transition-all
              "
            >
              <ArrowLeft size={15} />
            </button>
          )}

          {/* =================================================
              NEXT ARROW
          ================================================== */}

          {featuredProducts.length >
            visibleCount && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next design"
              className="
                absolute
                right-1
                sm:right-2
                md:right-3
                top-[40%]
                -translate-y-1/2
                w-8
                h-8
                sm:w-9
                sm:h-9
                md:w-10
                md:h-10
                rounded-full
                bg-[#FAF8F2]/95
                border
                border-[#D9B566]
                flex
                items-center
                justify-center
                text-[#8B6827]
                shadow-md
                z-30
                hover:bg-white
                transition-all
              "
            >
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* =====================================================
            DOTS
        ====================================================== */}

        {featuredProducts.length >
          visibleCount && (
          <div
            className="
              flex
              justify-center
              items-center
              gap-1.5
              sm:gap-2
              mt-5
              sm:mt-6
            "
          >
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  goToSlide(index)
                }
                aria-label={`Go to slide ${
                  index + 1
                }`}
                className={`
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index === activeIndex
                      ? "w-7 sm:w-8 h-1.5 bg-[#C8A044]"
                      : "w-1.5 h-1.5 bg-[#D9B566]"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedDesigns;