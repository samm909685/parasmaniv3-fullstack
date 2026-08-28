import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flower2 } from "lucide-react";
import { getProducts } from "../../services/productService";

function FeaturedDesigns() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await getProducts();

      const products = response.data
        .filter(
          (product) =>
            Boolean(product.featured) &&
            Boolean(product.status) &&
            product.featured_image
        )
        .sort(
          (a, b) =>
            Number(a.display_order || 0) -
            Number(b.display_order || 0)
        )
        .slice(0, 5);

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

  if (loading) {
    return null;
  }

  if (!featuredProducts.length) {
    return null;
  }

  const centerProduct = featuredProducts[0];
  const sideProducts = featuredProducts.slice(1, 5);

  return (
    <section className="bg-[#FAF8F2] py-14 sm:py-16 md:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="text-center max-w-2xl mx-auto">

          <p
            className="
              text-[#C8A044]
              uppercase
              tracking-[0.35em]
              text-[10px]
              sm:text-xs
            "
          >
            Featured Designs
          </p>

          <h2
            className="
              mt-2
              text-3xl
              sm:text-4xl
              md:text-5xl
              text-[#18322F]
              leading-tight
            "
            style={{ fontFamily: "Cinzel, serif" }}
          >
            The Art of Jewellery
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4">

            <span className="w-10 sm:w-16 h-px bg-[#D9B566]" />

            <Flower2
              size={20}
              strokeWidth={1.2}
              className="text-[#C8A044]"
            />

            <span className="w-10 sm:w-16 h-px bg-[#D9B566]" />

          </div>

          <p className="
            mt-4
            text-xs
            sm:text-sm
            md:text-base
            text-gray-500
            leading-6
          ">
            Timeless designs crafted with care, tradition and
            an eye for detail.
          </p>

        </div>


        {/* =====================================================
            DESKTOP SHOWCASE
        ====================================================== */}

        <div
          className="
            hidden
            lg:grid
            grid-cols-[1fr_1.35fr_1fr]
            items-end
            gap-5
            xl:gap-8
            max-w-6xl
            mx-auto
            mt-12
          "
        >

          {/* LEFT PRODUCTS */}

          <div className="flex items-end justify-end gap-4">

            {sideProducts.slice(0, 2).map((product) => (

              <ProductSmallCard
                key={product.id}
                product={product}
              />

            ))}

          </div>


          {/* CENTER PRODUCT */}

          <ProductHeroCard product={centerProduct} />


          {/* RIGHT PRODUCTS */}

          <div className="flex items-end justify-start gap-4">

            {sideProducts.slice(2, 4).map((product) => (

              <ProductSmallCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        </div>


        {/* =====================================================
            TABLET
        ====================================================== */}

        <div
          className="
            hidden
            sm:grid
            lg:hidden
            grid-cols-3
            items-end
            gap-4
            max-w-4xl
            mx-auto
            mt-10
          "
        >

          {/* LEFT */}

          <div className="flex flex-col items-end gap-4">

            {sideProducts.slice(0, 2).map((product) => (

              <ProductTabletCard
                key={product.id}
                product={product}
              />

            ))}

          </div>


          {/* CENTER */}

          <ProductHeroCard
            product={centerProduct}
            tablet
          />


          {/* RIGHT */}

          <div className="flex flex-col items-start gap-4">

            {sideProducts.slice(2, 4).map((product) => (

              <ProductTabletCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        </div>


        {/* =====================================================
            MOBILE
        ====================================================== */}

        <div
          className="
            sm:hidden
            mt-9
          "
        >

          <div
            className="
              flex
              gap-4
              overflow-x-auto
              snap-x
              snap-mandatory
              pb-4
              scrollbar-hide
              -mx-4
              px-4
            "
          >

            {featuredProducts.map((product, index) => (

              <Link
                key={product.id}
                to={`/products/${product.slug || product.id}`}
                className="
                  flex-shrink-0
                  w-[78vw]
                  max-w-[300px]
                  snap-center
                  group
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    rounded-[45%_45%_8%_8%]
                    bg-white
                    border
                    border-[#DDBB70]
                  "
                >

                  <img
                    src={product.featured_image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-active:scale-105
                    "
                  />

                  {/* NUMBER */}

                  <div
                    className="
                      absolute
                      top-3
                      left-3
                      w-8
                      h-8
                      rounded-full
                      bg-white/90
                      backdrop-blur-sm
                      border
                      border-[#DDBB70]
                      flex
                      items-center
                      justify-center
                      text-[#A77A24]
                      text-[10px]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                </div>


                {/* PRODUCT INFO */}

                <div className="text-center mt-4">

                  <p
                    className="
                      text-[#A77A24]
                      uppercase
                      tracking-[0.18em]
                      text-[8px]
                    "
                  >
                    {product.category_name || "Jewellery"}
                  </p>

                  <h3
                    className="
                      mt-1
                      text-lg
                      text-[#18322F]
                    "
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {product.name}
                  </h3>

                  {product.product_code && (
                    <p className="
                      mt-1
                      text-[10px]
                      text-gray-500
                    ">
                      Design No. {product.product_code}
                    </p>
                  )}

                </div>

              </Link>

            ))}

          </div>


          {/* MOBILE SWIPE INDICATOR */}

          <div className="flex justify-center items-center gap-2 mt-3">

            <span className="w-8 h-px bg-[#D9B566]" />

            <span className="text-[#A77A24] text-[9px] tracking-wider">
              SWIPE TO EXPLORE
            </span>

            <span className="w-8 h-px bg-[#D9B566]" />

          </div>

        </div>


        {/* =====================================================
            VIEW ALL
        ====================================================== */}

        <div className="flex justify-center mt-9 sm:mt-11">

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
              transition-all
              duration-300
              hover:bg-[#D9A94A]
              hover:text-white
              hover:border-[#D9A94A]
            "
          >

            <span>
              View All Designs
            </span>

            <ArrowRight
              size={16}
              strokeWidth={1.4}
            />

          </Link>

        </div>

      </div>

    </section>
  );
}


/* =============================================================
   SMALL DESKTOP PRODUCT
============================================================= */

function ProductSmallCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug || product.id}`}
      className="
        group
        w-[105px]
        xl:w-[120px]
        text-center
      "
    >

      <div
        className="
          relative
          w-full
          aspect-[4/5]
          overflow-hidden
          rounded-[48%_48%_8%_8%]
          bg-white
          border
          border-[#DDBB70]
        "
      >

        <img
          src={product.featured_image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

      </div>

      <h3
        className="
          mt-3
          text-sm
          xl:text-base
          text-[#18322F]
          truncate
        "
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {product.name}
      </h3>

      {product.product_code && (
        <p className="text-[9px] text-gray-500 mt-1">
          {product.product_code}
        </p>
      )}

    </Link>
  );
}


/* =============================================================
   TABLET PRODUCT
============================================================= */

function ProductTabletCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug || product.id}`}
      className="group w-[115px] text-center"
    >

      <div
        className="
          w-full
          aspect-[4/5]
          overflow-hidden
          rounded-[48%_48%_8%_8%]
          bg-white
          border
          border-[#DDBB70]
        "
      >

        <img
          src={product.featured_image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

      </div>

      <h3
        className="
          mt-2
          text-sm
          text-[#18322F]
          truncate
        "
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {product.name}
      </h3>

    </Link>
  );
}


/* =============================================================
   HERO PRODUCT
============================================================= */

function ProductHeroCard({ product, tablet = false }) {
  return (
    <Link
      to={`/products/${product.slug || product.id}`}
      className={`
        group
        text-center
        ${tablet ? "w-full" : "w-full"}
      `}
    >

      {/* HERO IMAGE */}

      <div
        className={`
          relative
          mx-auto
          overflow-hidden
          rounded-[48%_48%_7%_7%]
          bg-[#0F302C]
          border-2
          border-[#D9B566]
          shadow-[0_12px_35px_rgba(180,140,50,0.15)]

          ${
            tablet
              ? "w-[190px] aspect-[4/5]"
              : "w-[245px] xl:w-[270px] aspect-[4/5]"
          }
        `}
      >

        <img
          src={product.featured_image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* FEATURED BADGE */}

        <div
          className="
            absolute
            top-3
            left-1/2
            -translate-x-1/2
            px-3
            py-1
            rounded-full
            bg-[#D9A94A]
            text-white
            text-[8px]
            uppercase
            tracking-[0.18em]
            whitespace-nowrap
          "
        >
          Featured
        </div>

      </div>


      {/* INFO */}

      <div className="mt-5">

        <div className="flex items-center justify-center gap-2 mb-2">

          <span className="w-5 h-px bg-[#D9B566]" />

          <Flower2
            size={13}
            strokeWidth={1.2}
            className="text-[#C8A044]"
          />

          <span className="w-5 h-px bg-[#D9B566]" />

        </div>

        <h3
          className="
            text-xl
            md:text-2xl
            text-[#18322F]
          "
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {product.name}
        </h3>

        {product.product_code && (
          <p className="
            mt-1
            text-[10px]
            sm:text-xs
            text-gray-500
          ">
            Design No. {product.product_code}
          </p>
        )}

      </div>

    </Link>
  );
}

export default FeaturedDesigns;